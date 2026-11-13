"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Fuente } from "@/components/Piezas";
import { Opciones } from "@/components/actividades/Opciones";
import { RESORTE } from "@/components/Movimiento";

const BARRAS = [
  {
    id: "multi",
    etiqueta: "Sistemas multiagente",
    n: 18,
    detalle: "Dieciocho de los treinta estudios revisados. No son el foco de este recurso.",
  },
  {
    id: "asistentes",
    etiqueta: "Asistentes de demostración",
    n: 10,
    detalle: "Diez estudios con Isabelle, Coq u otras herramientas de verificación formal. Con esos casos trabajas aquí.",
  },
  {
    id: "descubrimiento",
    etiqueta: "IA para descubrimiento",
    n: 2,
    detalle: "Dos estudios. Quedan fuera del recorrido de este objeto.",
  },
] as const;

const MAX = 18;

const PASOS_FORMALES = [
  "Sean a = 2m y b = 2n, con m y n enteros.",
  "Entonces a + b = 2m + 2n = 2(m + n).",
  "2(m + n) es par, porque es múltiplo de 2.",
  "Por tanto, la suma de dos pares es par.",
];

const FRAGMENTOS_PROSA = [
  "Cualquier persona razonable ve que dos pares suman par.",
  "Es evidente y no hace falta dudar.",
  "La inteligencia artificial lo confirma con total seguridad.",
];

export function Problema() {
  const [activa, setActiva] = useState<string | null>("asistentes");

  return (
    <>
      <p className="entrada">
        Hoy un sistema puede escribir un párrafo científico que suena seguro. Eso no quiere decir que el resultado se
        sostenga.
      </p>

      <div className="evidencias">
        <article className="evidencia">
          <p className="evidencia__rotulo">Advertencia publicada</p>
          <p>
            Hartung (2025) describe el paso de sistemas que solo interpretan el conocimiento a sistemas que también
            actúan sobre él. Con esa autonomía crecen las preocupaciones por reproducibilidad, auditoría, seguridad y
            acceso equitativo. <Fuente id="hartung2025">Artículo de Hartung (2025)</Fuente>.
          </p>
        </article>
        <article className="evidencia">
          <p className="evidencia__rotulo">Dato de la revisión</p>
          <p>
            La revisión de literatura que sustenta este recurso cribó treinta estudios. Diez de ellos trabajan con
            asistentes de demostración o verificación formal. Esos diez son el material de este recorrido.
          </p>
        </article>
      </div>

      <h2>Los treinta estudios, por tipo</h2>
      <p className="nota">Pulsa cada barra para ver qué reúne. El recorrido se concentra en la barra del medio.</p>
      <ul className="barras" role="list">
        {BARRAS.map((barra) => {
          const abierta = activa === barra.id;
          return (
            <li key={barra.id}>
              <button
                type="button"
                className={abierta ? "barra barra--activa" : "barra"}
                aria-expanded={abierta}
                onClick={() => setActiva(abierta ? null : barra.id)}
              >
                <span className="barra__etiqueta">{barra.etiqueta}</span>
                <span className="barra__pista" aria-hidden="true">
                  <motion.span
                    className="barra__lleno"
                    initial={false}
                    animate={{ scaleX: barra.n / MAX }}
                    transition={RESORTE}
                  />
                </span>
                <span className="barra__n">{barra.n}</span>
              </button>
              <AnimatePresence initial={false}>
                {abierta && (
                  <motion.p
                    className="barra__detalle"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={RESORTE}
                  >
                    {barra.detalle}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <p>
        La pregunta de este recurso no es si la inteligencia artificial escribe bien. Es si el resultado deja pasos
        que otra persona pueda revisar.
      </p>
    </>
  );
}

export function ProblemaActividad() {
  const [abierta, setAbierta] = useState<"prosa" | "formal" | null>(null);

  return (
    <>
      <p className="entrada">
        Mismo resultado: la suma de dos números pares es par. Dos formas de presentarlo. Pulsa cada fragmento y cada
        paso.
      </p>

      <div className="contraste">
        <section className={abierta === "prosa" ? "contraste__lado contraste__lado--abierto" : "contraste__lado"}>
          <h2>Respuesta que suena bien</h2>
          <ul className="contraste__lista">
            {FRAGMENTOS_PROSA.map((texto) => (
              <li key={texto}>
                <button type="button" className="contraste__pieza" onClick={() => setAbierta("prosa")}>
                  {texto}
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className={abierta === "formal" ? "contraste__lado contraste__lado--abierto" : "contraste__lado"}>
          <h2>Respuesta con pasos</h2>
          <ol className="contraste__lista">
            {PASOS_FORMALES.map((texto, i) => (
              <li key={texto}>
                <button type="button" className="contraste__pieza" onClick={() => setAbierta("formal")}>
                  <span className="contraste__n">{i + 1}</span>
                  {texto}
                </button>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <AnimatePresence mode="wait">
        {abierta && (
          <motion.p
            key={abierta}
            className="aviso"
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={RESORTE}
          >
            {abierta === "prosa"
              ? "Esos fragmentos convencen, pero no dejan una secuencia que otra persona pueda comprobar."
              : "Cada paso declara qué se asume y qué se obtiene. Otra persona puede recorrerlos y decir si se sostienen."}
          </motion.p>
        )}
      </AnimatePresence>

      <Opciones
        clave="a0"
        repaso="problema"
        enunciado="¿Cuál de las dos respuestas puedes aceptar en un trabajo de posgrado?"
        opciones={[
          {
            id: "a",
            etiqueta: "A. La que suena bien, porque es clara y no muestra dudas.",
            correcta: false,
            retro:
              "La claridad no reemplaza los pasos. Sin una secuencia revisable, el resultado sigue siendo una propuesta.",
          },
          {
            id: "b",
            etiqueta: "B. La de los pasos, porque otra persona puede recorrerlos y decir si se sostienen.",
            correcta: true,
            retro:
              "Eso es lo que este recurso llama formalizar: dejar el resultado en una forma que se puede comprobar.",
          },
          {
            id: "c",
            etiqueta: "C. Las dos, porque demuestran el mismo resultado.",
            correcta: false,
            retro:
              "El resultado es el mismo, pero solo una deja pasos para revisar. En posgrado eso marca la diferencia.",
          },
        ]}
      />
    </>
  );
}
