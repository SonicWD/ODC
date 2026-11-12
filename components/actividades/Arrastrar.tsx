"use client";

import Link from "next/link";
import { useState } from "react";
import { ruta } from "@/lib/pantallas";
import { marcarActividad, useProgreso } from "@/lib/progreso";

type Zona = "beneficio" | "limitacion" | "validacion";
type Resultado = "bien" | "cruce" | "mal";

const ZONAS: { clave: Zona; nombre: string }[] = [
  { clave: "beneficio", nombre: "Beneficio" },
  { clave: "limitacion", nombre: "Limitación" },
  { clave: "validacion", nombre: "Validación" },
];

const FRASES: { id: string; texto: string; destino: Zona }[] = [
  { id: "A", texto: "Deja pasos que otro puede abrir.", destino: "beneficio" },
  { id: "B", texto: "Exige formación y supervisión.", destino: "limitacion" },
  { id: "C", texto: "Los pasos quedan en un asistente.", destino: "validacion" },
];

const SIN_COLOCAR: Record<string, Zona | null> = { A: null, B: null, C: null };

const RETRO: Record<Resultado, string> = {
  bien: "Separaste el resultado, el costo y la comprobación.",
  cruce: "La formación es el costo. El asistente es la forma de comprobar. Vuelve a la pantalla 6 y reintenta.",
  mal: "Mira si cada frase habla de un resultado, de un costo o de una comprobación, y reintenta.",
};

// Arrastre con ratón y, para teclado o pantallas táctiles, pulsar la frase y luego la columna.
export function Arrastrar({ clave, repaso }: { clave: string; repaso: number }) {
  const progreso = useProgreso();
  const [lugar, setLugar] = useState(SIN_COLOCAR);
  const [tomada, setTomada] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const sueltas = FRASES.filter((f) => lugar[f.id] === null);
  const completo = sueltas.length === 0;

  function colocar(id: string | null, zona: Zona) {
    if (!id || !(id in lugar) || resultado) return;
    setLugar({ ...lugar, [id]: zona });
    setTomada(null);
  }

  function quitar(id: string) {
    setLugar({ ...lugar, [id]: null });
    setResultado(null);
  }

  function comprobar() {
    const aciertos = FRASES.every((f) => lugar[f.id] === f.destino);
    const cruce = lugar.B === "validacion" && lugar.C === "limitacion";
    setResultado(aciertos ? "bien" : cruce ? "cruce" : "mal");
    if (aciertos) marcarActividad(clave, true);
  }

  function reintentar() {
    setLugar(SIN_COLOCAR);
    setTomada(null);
    setResultado(null);
  }

  return (
    <section className="actividad">
      {progreso.actividades[clave] && !resultado && (
        <p className="actividad__hecha">Ya resolviste esta actividad. Puedes repetirla.</p>
      )}
      <p className="actividad__enunciado">Lleva cada frase a la columna que le corresponde.</p>
      <p className="actividad__ayuda">
        Arrastra la frase. También puedes pulsarla y luego pulsar el botón de la columna.
      </p>

      <ul className="banco" role="list" aria-label="Frases por ubicar">
        {sueltas.map((frase) => (
          <li key={frase.id}>
            <button
              type="button"
              className="frase"
              draggable
              aria-pressed={tomada === frase.id}
              onClick={() => setTomada(tomada === frase.id ? null : frase.id)}
              onDragStart={(evento) => {
                evento.dataTransfer.setData("text/plain", frase.id);
                evento.dataTransfer.effectAllowed = "move";
              }}
            >
              <span className="frase__letra">{frase.id}</span> {frase.texto}
            </button>
          </li>
        ))}
        {completo && <li className="banco__vacio">Todas las frases están ubicadas.</li>}
      </ul>

      <div className="zonas">
        {ZONAS.map((zona) => (
          <div
            key={zona.clave}
            className={`zona columna--${zona.clave}`}
            onDragOver={(evento) => evento.preventDefault()}
            onDrop={(evento) => {
              evento.preventDefault();
              colocar(evento.dataTransfer.getData("text/plain"), zona.clave);
            }}
          >
            <h2 className="zona__nombre">{zona.nombre}</h2>
            <ul className="zona__frases" role="list">
              {FRASES.filter((f) => lugar[f.id] === zona.clave).map((frase) => (
                <li key={frase.id} className="frase frase--puesta">
                  <span>
                    <span className="frase__letra">{frase.id}</span> {frase.texto}
                  </span>
                  {!resultado && (
                    <button type="button" className="frase__quitar" onClick={() => quitar(frase.id)}>
                      Quitar<span className="solo-lector"> la frase {frase.id}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {!resultado && !completo && (
              <button
                type="button"
                className="boton boton--suave boton--chico"
                disabled={!tomada}
                onClick={() => colocar(tomada, zona.clave)}
              >
                Poner en {zona.nombre}
              </button>
            )}
          </div>
        ))}
      </div>

      {!resultado && (
        <button type="button" className="boton" disabled={!completo} onClick={comprobar}>
          Comprobar
        </button>
      )}

      <div role="status">
        {resultado && (
          <div className={resultado === "bien" ? "retro retro--bien" : "retro retro--mal"}>
            <p className="retro__titulo">{resultado === "bien" ? "Correcto" : "Todavía no"}</p>
            <p>{RETRO[resultado]}</p>
            {resultado === "bien" ? (
              <p>Puedes seguir.</p>
            ) : (
              <div className="retro__acciones">
                <button type="button" className="boton" onClick={reintentar}>
                  Reintentar
                </button>
                <Link className="boton boton--suave" href={ruta(repaso)}>
                  Volver a la pantalla {repaso}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
