"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { Repaso } from "@/components/Repaso";
import { RESORTE } from "@/components/Movimiento";
import { itemsDe, nombreForma, opcionesDe } from "@/lib/evaluacion";
import { ruta } from "@/lib/pantallas";
import {
  ITEMS_EVALUACION,
  MINIMO_ACIERTOS,
  actualizar,
  decisionJustificada,
  useProgreso,
} from "@/lib/progreso";

const LETRAS = ["A", "B", "C", "D"];
const VUELTA = 2 * Math.PI * 52;

export function Evaluacion() {
  const progreso = useProgreso();
  const respuestas = progreso.evaluacion;
  const intento = progreso.intento;
  const items = itemsDe(intento);
  const [vista, setVista] = useState<number | null>(null);
  const siguiente = useRef<HTMLButtonElement>(null);
  const cabeza = useRef<HTMLParagraphElement>(null);

  const pendiente = respuestas.findIndex((r) => r === null);
  const actual = vista ?? (pendiente === -1 ? ITEMS_EVALUACION : pendiente);
  const aciertos = items.filter((item, i) => respuestas[i] === item.correcta).length;
  const justificada = decisionJustificada(progreso);

  function responder(i: number, id: string) {
    actualizar({ evaluacion: respuestas.map((r, j) => (j === i ? id : r)) });
    setVista(i);
    requestAnimationFrame(() => siguiente.current?.focus());
  }

  function irA(i: number) {
    setVista(i);
    requestAnimationFrame(() => cabeza.current?.focus());
  }

  function repetir() {
    actualizar({ evaluacion: Array(ITEMS_EVALUACION).fill(null), intento: intento + 1 });
    irA(0);
  }

  if (actual >= ITEMS_EVALUACION) {
    const logrado = aciertos >= MINIMO_ACIERTOS && justificada;
    return (
      <section className="resultado">
        <div className="resultado__cabeza">
          <svg className="resultado__anillo" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" />
            <circle
              className="resultado__trazo"
              cx="60"
              cy="60"
              r="52"
              strokeDasharray={VUELTA}
              strokeDashoffset={VUELTA * (1 - aciertos / ITEMS_EVALUACION)}
              style={{ "--vuelta": VUELTA } as CSSProperties}
            />
          </svg>
          <p ref={cabeza} tabIndex={-1} className="resultado__puntaje">
            <span className="resultado__numero">{aciertos}</span> de {ITEMS_EVALUACION} aciertos
          </p>
          {logrado && (
            <p className="sello" aria-hidden="true">
              Q.E.D.<small>queda demostrado</small>
            </p>
          )}
        </div>
        <div className={logrado ? "retro retro--bien" : "retro retro--mal"} role="status">
          <p className="retro__titulo">{logrado ? "Resultado de aprendizaje logrado" : "Todavía falta"}</p>
          <ul>
            <li>
              Evaluación: {aciertos >= MINIMO_ACIERTOS ? "cumplida" : "pendiente"}. El logro es {MINIMO_ACIERTOS} de{" "}
              {ITEMS_EVALUACION}.
            </li>
            <li>
              Decisión justificada: {justificada ? "cumplida" : "pendiente"}.
              {!justificada && (
                <>
                  {" "}
                  <Link href={ruta("apropiacion")} transitionTypes={["nav-back"]}>
                    Escribirla en Apropiación
                  </Link>
                  .
                </>
              )}
            </li>
          </ul>
        </div>

        <h2>Tus respuestas</h2>
        <ol className="repaso">
          {items.map((item, i) => {
            const bien = respuestas[i] === item.correcta;
            const dada = item.opciones.find((o) => o.id === respuestas[i]);
            const correcta = item.opciones.find((o) => o.id === item.correcta);
            return (
              <li key={item.caso} className={bien ? "repaso__item repaso__item--bien" : "repaso__item repaso__item--mal"}>
                <p className="repaso__criterio">
                  <span className="etiqueta">{item.criterio}</span>
                  <strong>{bien ? "Acierto" : "Fallo"}</strong>
                </p>
                <p>{item.pregunta}</p>
                <p className="nota">
                  Tu respuesta: {dada?.texto} {dada?.retro}
                </p>
                {!bien && (
                  <>
                    <p className="nota">
                      La respuesta era: {correcta?.texto} {correcta?.retro}
                    </p>
                    <p>
                      <Repaso id={item.repaso} />
                    </p>
                  </>
                )}
              </li>
            );
          })}
        </ol>
        <div className="resultado__repetir">
          <button type="button" className="boton boton--suave" onClick={repetir}>
            Repetir la evaluación
          </button>
          <p className="nota">Al repetir cambian los casos y las preguntas.</p>
        </div>
      </section>
    );
  }

  const item = items[actual];
  const opciones = opcionesDe(item, intento, actual);
  const dada = respuestas[actual];
  const elegida = item.opciones.find((o) => o.id === dada);
  const correcta = item.opciones.find((o) => o.id === item.correcta);
  const bien = dada === item.correcta;

  return (
    <section className="actividad">
      <p className="entrada">
        Logro: {MINIMO_ACIERTOS} de {ITEMS_EVALUACION}, más la decisión justificada del módulo de apropiación.
      </p>

      <div className="examen__barra">
        <p ref={cabeza} tabIndex={-1} className="actividad__cuenta">
          Pregunta {actual + 1} de {ITEMS_EVALUACION} · {nombreForma(intento)}
        </p>
        <ol className="puntos" aria-hidden="true">
          {items.map((otro, i) => (
            <li
              key={otro.caso}
              className={
                respuestas[i] === null
                  ? i === actual
                    ? "puntos__punto puntos__punto--actual"
                    : "puntos__punto"
                  : respuestas[i] === otro.correcta
                    ? "puntos__punto puntos__punto--ok"
                    : "puntos__punto puntos__punto--mal"
              }
            />
          ))}
        </ol>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${intento}-${actual}`}
          className="examen__item"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={RESORTE}
        >
          <p className="caso">
            <span className="caso__rotulo">{item.criterio}</span>
            {item.caso}
          </p>
          <fieldset className="actividad__grupo">
            <legend className="actividad__enunciado">{item.pregunta}</legend>
            <div className="opciones">
              {opciones.map((opcion, i) => (
                <button
                  key={opcion.id}
                  type="button"
                  className={dada !== null && opcion.id === item.correcta ? "opcion opcion--correcta" : "opcion"}
                  aria-pressed={dada === opcion.id}
                  disabled={dada !== null && dada !== opcion.id}
                  onClick={() => dada === null && responder(actual, opcion.id)}
                >
                  <span className="opcion__letra" aria-hidden="true">
                    {LETRAS[i]}
                  </span>
                  <span>{opcion.texto}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </motion.div>
      </AnimatePresence>

      <div role="status">
        <AnimatePresence>
          {elegida && (
            <motion.div
              key={elegida.id}
              className={bien ? "retro retro--bien" : "retro retro--mal"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={RESORTE}
            >
              <p className="retro__titulo">{bien ? "Correcto" : "Incorrecto"}</p>
              <p>{elegida.retro}</p>
              {!bien && (
                <>
                  <p>
                    La respuesta era: {correcta?.texto} {correcta?.retro}
                  </p>
                  <p>
                    <Repaso id={item.repaso} />
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {dada !== null && (
        <button ref={siguiente} type="button" className="boton" onClick={() => irA(actual + 1)}>
          {actual + 1 < ITEMS_EVALUACION ? "Siguiente pregunta" : "Ver el puntaje"}
        </button>
      )}
    </section>
  );
}
