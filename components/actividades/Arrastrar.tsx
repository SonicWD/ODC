"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ruta } from "@/lib/pantallas";
import { marcarActividad, useProgreso } from "@/lib/progreso";

export type Zona = { clave: string; nombre: string };
export type FraseSuelta = {
  id: string;
  texto: string;
  /** De dónde sale la frase, por ejemplo «Kaufmann (2022)». */
  fuente?: string;
  /** Clave de la zona correcta. */
  destino: string;
  /** Pista que se muestra si la frase queda en otra zona. */
  pista: string;
};

// Arrastre con ratón y, para teclado o pantallas táctiles, pulsar la frase y luego el botón de la columna.
export function Arrastrar({
  clave,
  repaso,
  enunciado,
  zonas,
  frases,
  retroBien,
}: {
  clave: string;
  repaso: number;
  enunciado: string;
  zonas: Zona[];
  frases: FraseSuelta[];
  retroBien: string;
}) {
  const progreso = useProgreso();
  const [lugar, setLugar] = useState<Record<string, string | null>>({});
  const [tomada, setTomada] = useState<string | null>(null);
  const [comprobado, setComprobado] = useState(false);
  const banco = useRef<HTMLUListElement>(null);
  const botonComprobar = useRef<HTMLButtonElement>(null);

  const zonaDe = (id: string) => lugar[id] ?? null;
  const sueltas = frases.filter((f) => zonaDe(f.id) === null);
  const completo = sueltas.length === 0;
  const erradas = frases.filter((f) => zonaDe(f.id) !== f.destino);
  const bien = erradas.length === 0;

  function colocar(id: string | null, zona: string) {
    if (!id || comprobado || !frases.some((f) => f.id === id)) return;
    setLugar({ ...lugar, [id]: zona });
    setTomada(null);
  }

  // Con teclado: al ubicar una frase el foco pasa a la siguiente frase suelta o, si no quedan, a Comprobar.
  function ponerTomada(zona: string) {
    colocar(tomada, zona);
    requestAnimationFrame(() => {
      const siguiente = banco.current?.querySelector("button") ?? botonComprobar.current;
      siguiente?.focus();
    });
  }

  function quitar(id: string) {
    setLugar({ ...lugar, [id]: null });
  }

  function comprobar() {
    setComprobado(true);
    if (bien) marcarActividad(clave, true);
  }

  // Las frases bien ubicadas se quedan; las demás vuelven a la lista.
  function reintentar() {
    setLugar(Object.fromEntries(frases.map((f) => [f.id, zonaDe(f.id) === f.destino ? f.destino : null])));
    setTomada(null);
    setComprobado(false);
  }

  return (
    <section className="actividad">
      {progreso.actividades[clave] && !comprobado && (
        <p className="actividad__hecha">Ya resolviste esta actividad. Puedes repetirla.</p>
      )}
      <p className="actividad__enunciado">{enunciado}</p>
      <p className="actividad__ayuda">
        Arrastra cada frase a su columna. También puedes pulsarla y elegir la columna con los botones.
      </p>

      <ul ref={banco} className="banco" role="list" aria-label="Frases por ubicar">
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
              <span className="frase__letra">{frase.id}</span>
              <span>
                {frase.texto}
                {frase.fuente && <span className="frase__fuente"> {frase.fuente}</span>}
              </span>
            </button>
          </li>
        ))}
        {completo && <li className="banco__vacio">Todas las frases están ubicadas.</li>}
      </ul>

      {!comprobado && !completo && (
        <div className="destinos" role="group" aria-label="Poner la frase elegida en una columna">
          <span className="destinos__rotulo">{tomada ? `Poner la frase ${tomada} en` : "Elige una frase"}</span>
          {zonas.map((zona) => (
            <button
              key={zona.clave}
              type="button"
              className={`destinos__boton columna--${zona.clave}`}
              disabled={!tomada}
              onClick={() => ponerTomada(zona.clave)}
            >
              {zona.nombre}
            </button>
          ))}
        </div>
      )}

      <div className="zonas">
        {zonas.map((zona) => (
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
              {frases
                .filter((f) => zonaDe(f.id) === zona.clave)
                .map((frase) => {
                  const errada = comprobado && frase.destino !== zona.clave;
                  return (
                    <li key={frase.id} className={errada ? "frase frase--puesta frase--errada" : "frase frase--puesta"}>
                      <span>
                        <span className="frase__letra">{frase.id}</span> {frase.texto}
                      </span>
                      {!comprobado && (
                        <button type="button" className="frase__quitar" onClick={() => quitar(frase.id)}>
                          Quitar<span className="solo-lector"> la frase {frase.id}</span>
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>

      {!comprobado && (
        <button ref={botonComprobar} type="button" className="boton" disabled={!completo} onClick={comprobar}>
          Comprobar
        </button>
      )}

      <div role="status">
        {comprobado && (
          <div className={bien ? "retro retro--bien" : "retro retro--mal"}>
            <p className="retro__titulo">
              {bien ? "Correcto" : `${frases.length - erradas.length} de ${frases.length} en su columna`}
            </p>
            {bien ? (
              <>
                <p>{retroBien}</p>
                <p>Puedes seguir.</p>
              </>
            ) : (
              <>
                <p>Estas frases van en otra columna. Lee la pista y muévelas:</p>
                <ul>
                  {erradas.map((frase) => (
                    <li key={frase.id}>
                      <strong>{frase.id}.</strong> {frase.pista}
                    </li>
                  ))}
                </ul>
                <div className="retro__acciones">
                  <button type="button" className="boton" onClick={reintentar}>
                    Mover las que faltan
                  </button>
                  <Link className="boton boton--suave" href={ruta(repaso)}>
                    Volver a la pantalla {repaso}
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
