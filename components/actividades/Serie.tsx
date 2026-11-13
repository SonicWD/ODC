"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ruta } from "@/lib/pantallas";
import { marcarActividad, useProgreso } from "@/lib/progreso";

export type Tarjeta = { texto: string; fuente?: string; cuenta: boolean; retro: string };

// Serie de situaciones, una por una, con dos respuestas posibles y la razón después de cada una.
// La actividad queda resuelta cuando se aciertan todas.
export function Serie({
  clave,
  repaso,
  enunciado,
  si,
  no,
  tarjetas,
  retroBien,
}: {
  clave: string;
  repaso: number;
  enunciado: string;
  /** Lo que se dice cuando se aciertan todas. */
  retroBien: string;
  /** Texto del botón para las situaciones que sí cumplen. */
  si: string;
  /** Texto del botón para las que no cumplen. */
  no: string;
  tarjetas: Tarjeta[];
}) {
  const progreso = useProgreso();
  const [respuestas, setRespuestas] = useState<boolean[]>([]);
  const [vista, setVista] = useState(0);
  const siguiente = useRef<HTMLButtonElement>(null);
  const cabeza = useRef<HTMLParagraphElement>(null);

  const total = tarjetas.length;
  const aciertos = respuestas.filter((r, i) => r === tarjetas[i].cuenta).length;
  const terminada = vista >= total;

  function responder(valor: boolean) {
    const nuevas = [...respuestas, valor];
    setRespuestas(nuevas);
    if (nuevas.length === total && nuevas.every((r, i) => r === tarjetas[i].cuenta)) marcarActividad(clave, true);
    requestAnimationFrame(() => siguiente.current?.focus());
  }

  // El foco pasa al comienzo de la situación nueva (o del resultado) para no perderse al cambiar de vista.
  function irA(i: number) {
    setVista(i);
    requestAnimationFrame(() => cabeza.current?.focus());
  }

  function repetir() {
    setRespuestas([]);
    irA(0);
  }

  const puntos = (
    <ol className="puntos" aria-hidden="true">
      {tarjetas.map((tarjeta, i) => (
        <li
          key={tarjeta.texto}
          className={
            i >= respuestas.length
              ? i === vista
                ? "puntos__punto puntos__punto--actual"
                : "puntos__punto"
              : respuestas[i] === tarjeta.cuenta
                ? "puntos__punto puntos__punto--ok"
                : "puntos__punto puntos__punto--mal"
          }
        />
      ))}
    </ol>
  );

  if (terminada) {
    const todas = aciertos === total;
    return (
      <section className="actividad">
        <p ref={cabeza} tabIndex={-1} className="actividad__enunciado">
          {enunciado}
        </p>
        {puntos}
        <div role="status">
          <div className={todas ? "retro retro--bien" : "retro retro--mal"}>
            <p className="retro__titulo">
              {aciertos} de {total} aciertos
            </p>
            {todas ? (
              <p>{retroBien} Puedes seguir.</p>
            ) : (
              <>
                <p>Para resolver la actividad necesitas las {total}. Estas son las que fallaste:</p>
                <ul>
                  {tarjetas.map(
                    (tarjeta, i) =>
                      respuestas[i] !== tarjeta.cuenta && (
                        <li key={tarjeta.texto}>
                          {tarjeta.texto} <strong>{tarjeta.cuenta ? si : no}.</strong> {tarjeta.retro}
                        </li>
                      ),
                  )}
                </ul>
                <div className="retro__acciones">
                  <button type="button" className="boton" onClick={repetir}>
                    Repetir la serie
                  </button>
                  <Link className="boton boton--suave" href={ruta(repaso)}>
                    Volver a la pantalla {repaso}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  const tarjeta = tarjetas[vista];
  const dada = respuestas[vista];
  const respondida = dada !== undefined;
  const bien = dada === tarjeta.cuenta;

  return (
    <section className="actividad">
      {progreso.actividades[clave] && respuestas.length === 0 && (
        <p className="actividad__hecha">Ya resolviste esta actividad. Puedes repetirla.</p>
      )}
      <p ref={cabeza} tabIndex={-1} className="actividad__cuenta">
        Situación {vista + 1} de {total}
      </p>
      <fieldset className="actividad__grupo">
        <legend className="actividad__enunciado">{enunciado}</legend>
        {puntos}
        {/* La clave hace que cada situación entre como una tarjeta nueva. */}
        <blockquote key={vista} className="serie__tarjeta">
          <p>{tarjeta.texto}</p>
          {tarjeta.fuente && <footer>{tarjeta.fuente}</footer>}
        </blockquote>
        <div className="serie__botones">
          {[true, false].map((valor) => (
            <button
              key={String(valor)}
              type="button"
              className="opcion"
              aria-pressed={dada === valor}
              disabled={respondida && dada !== valor}
              onClick={() => !respondida && responder(valor)}
            >
              {valor ? si : no}
            </button>
          ))}
        </div>
      </fieldset>

      <div role="status">
        {respondida && (
          <div className={bien ? "retro retro--bien" : "retro retro--mal"}>
            <p className="retro__titulo">{bien ? "Correcto" : `No: la respuesta es «${tarjeta.cuenta ? si : no}»`}</p>
            <p>{tarjeta.retro}</p>
          </div>
        )}
      </div>

      {respondida && (
        <button ref={siguiente} type="button" className="boton" onClick={() => irA(vista + 1)}>
          {vista + 1 < total ? "Siguiente situación" : "Ver el resultado"}
        </button>
      )}
    </section>
  );
}
