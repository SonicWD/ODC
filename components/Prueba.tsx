"use client";

import { useState, type CSSProperties } from "react";

// Ejemplo ilustrativo, escrito para este recurso en el estilo de Isabelle/Isar.
// No sale de los artículos citados: muestra cómo se ve una prueba formal.
const LINEAS: { texto: string; revisada: boolean }[] = [
  { texto: 'lemma conj_swap: "A ∧ B ⟹ B ∧ A"', revisada: false },
  { texto: "proof -", revisada: false },
  { texto: '  assume ab: "A ∧ B"', revisada: true },
  { texto: '  from ab have b: "B" by (rule conjunct2)', revisada: true },
  { texto: '  from ab have a: "A" by (rule conjunct1)', revisada: true },
  { texto: '  from b a show "B ∧ A" by (rule conjI)', revisada: true },
  { texto: "qed", revisada: false },
];

const PALABRA = /\b(lemma|proof|assume|from|have|show|by|qed)\b/;

// Colorea las palabras clave y las fórmulas entre comillas.
function Coloreada({ texto }: { texto: string }) {
  return texto.split(/("[^"]*")/).map((trozo, i) =>
    trozo.startsWith('"') ? (
      <span key={i} className="prueba__formula">
        {trozo}
      </span>
    ) : (
      trozo.split(PALABRA).map((parte, j) =>
        PALABRA.test(parte) ? (
          <span key={`${i}-${j}`} className="prueba__clave">
            {parte}
          </span>
        ) : (
          parte
        ),
      )
    ),
  );
}

export function Prueba() {
  const [vuelta, setVuelta] = useState(0);
  const revisadas = LINEAS.filter((l) => l.revisada).length;

  return (
    <figure className="prueba">
      <div className="prueba__barra">
        <span className="prueba__luces" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="prueba__archivo">conj_swap.thy</span>
        <button type="button" className="prueba__repetir" onClick={() => setVuelta(vuelta + 1)}>
          Repetir
          <span className="solo-lector"> la animación de la prueba</span>
        </button>
      </div>

      {/* La clave reinicia la animación. Sin animación, todas las líneas se ven desde el inicio. */}
      <ol key={vuelta} className="prueba__lineas">
        {LINEAS.map((linea, i) => (
          <li key={linea.texto} className="prueba__linea" style={{ "--i": i } as CSSProperties}>
            <code>
              <Coloreada texto={linea.texto} />
            </code>
            {linea.revisada && (
              <span className="prueba__marca">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="solo-lector">Paso revisado</span>
              </span>
            )}
          </li>
        ))}
        <li className="prueba__cierre" style={{ "--i": LINEAS.length } as CSSProperties}>
          {revisadas} pasos revisados · prueba cerrada
        </li>
      </ol>

      <figcaption className="prueba__pie">
        Ejemplo ilustrativo en el estilo de Isabelle/Isar: si A y B son ciertas, también lo son B y A. Cada paso queda
        escrito y otra persona puede revisarlo.
      </figcaption>
    </figure>
  );
}
