"use client";

import Link from "next/link";
import { useState } from "react";
import { buscar, ruta } from "@/lib/pantallas";
import {
  ITEMS_EVALUACION,
  MINIMO_ACIERTOS,
  actualizar,
  decisionJustificada,
  useProgreso,
} from "@/lib/progreso";

const ITEMS: { texto: string; verdadero: boolean; razon: string; repaso: number }[] = [
  {
    texto: "Formalizar es dejar un resultado que se pueda revisar paso a paso.",
    verdadero: true,
    razon: "Formalizar es dejar el resultado en un lenguaje donde otra persona puede seguir cada paso y decir si se sostiene.",
    repaso: 4,
  },
  {
    texto: "Isabelle o Coq sirven para comprobar pasos de una prueba, no para buscar artículos.",
    verdadero: true,
    razon: "Isabelle/HOL y Coq son asistentes de prueba: registran pasos. No son buscadores.",
    repaso: 6,
  },
  {
    texto: "Una prueba que nadie revisa ya está aceptada.",
    verdadero: false,
    razon: "La entrega es una propuesta. La aceptación exige una revisión que otra persona pueda repetir.",
    repaso: 5,
  },
  {
    texto: "Jensen y colegas (2018) documentan un demostrador verificado, no el reemplazo de quien investiga.",
    verdadero: true,
    razon: "El artículo formaliza y verifica un demostrador de primer orden en Isabelle/HOL. No anuncia un reemplazo.",
    repaso: 8,
  },
  {
    texto:
      "Una limitación para la universidad pública es la formación y la supervisión, no la inexistencia de la literatura.",
    verdadero: true,
    razon: "Los casos están publicados. El límite es la formación, la herramienta y una persona que lea la prueba.",
    repaso: 10,
  },
  {
    texto: "Lund y Villadsen (2024) unen validación y formación.",
    verdadero: true,
    razon: "En ese caso el estudiante trabaja con una prueba que se puede revisar mientras aprende cálculo de secuentes.",
    repaso: 12,
  },
  {
    texto: "Lo que el estudiante puede apropiar es exigir una prueba revisable, no esperar el cómputo industrial.",
    verdadero: true,
    razon: "Exigir una prueba revisable cabe en una actividad de formación. Esperar el cómputo industrial aplaza el aprendizaje.",
    repaso: 16,
  },
  {
    texto: "Este recurso enseña a hacer una revisión de literatura.",
    verdadero: false,
    razon: "Enseña a analizar sistemas que formalizan conocimiento científico. La revisión de literatura fue un trabajo previo.",
    repaso: 1,
  },
];

function nombrePantalla(n: number): string {
  return `pantalla ${n}: ${buscar(n)?.titulo ?? ""}`;
}

export function Evaluacion() {
  const progreso = useProgreso();
  const respuestas = progreso.evaluacion;
  const [vista, setVista] = useState<number | null>(null);

  const pendiente = respuestas.findIndex((r) => r === null);
  const actual = vista ?? (pendiente === -1 ? ITEMS_EVALUACION : pendiente);
  const aciertos = ITEMS.filter((item, i) => respuestas[i] === item.verdadero).length;
  const justificada = decisionJustificada(progreso);

  function responder(i: number, valor: boolean) {
    actualizar({ evaluacion: respuestas.map((r, j) => (j === i ? valor : r)) });
    setVista(i);
  }

  function repetir() {
    actualizar({ evaluacion: Array(ITEMS_EVALUACION).fill(null) });
    setVista(0);
  }

  if (actual >= ITEMS_EVALUACION) {
    const logrado = aciertos >= MINIMO_ACIERTOS && justificada;
    return (
      <section className="resultado">
        <p className="resultado__puntaje">
          <span className="resultado__numero">{aciertos}</span> de {ITEMS_EVALUACION} aciertos
        </p>
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
                  <Link href={ruta(16)}>Escribirla en la {nombrePantalla(16)}</Link>.
                </>
              )}
            </li>
          </ul>
        </div>

        <h2>Tus respuestas</h2>
        <ol className="repaso">
          {ITEMS.map((item, i) => {
            const bien = respuestas[i] === item.verdadero;
            return (
              <li key={item.texto} className={bien ? "repaso__item repaso__item--bien" : "repaso__item repaso__item--mal"}>
                <p>
                  <strong>{bien ? "Acierto." : "Fallo."}</strong> {item.texto}
                </p>
                <p className="nota">{item.razon}</p>
                {!bien && (
                  <p>
                    <Link href={ruta(item.repaso)}>Repasar en la {nombrePantalla(item.repaso)}</Link>
                  </p>
                )}
              </li>
            );
          })}
        </ol>
        <button type="button" className="boton boton--suave" onClick={repetir}>
          Repetir la evaluación
        </button>
      </section>
    );
  }

  const item = ITEMS[actual];
  const dada = respuestas[actual];
  const bien = dada === item.verdadero;

  return (
    <section className="actividad">
      <p className="entrada">
        Logro: {MINIMO_ACIERTOS} de {ITEMS_EVALUACION}, más la decisión justificada del módulo de apropiación.
      </p>
      <fieldset className="actividad__grupo">
        <legend className="actividad__enunciado">
          <span className="actividad__cuenta">
            Pregunta {actual + 1} de {ITEMS_EVALUACION}
          </span>
          {item.texto}
        </legend>
        <div className="opciones">
          {[true, false].map((valor) => (
            <button
              key={String(valor)}
              type="button"
              className="opcion"
              aria-pressed={dada === valor}
              disabled={dada !== null && dada !== valor}
              onClick={() => dada === null && responder(actual, valor)}
            >
              {valor ? "Verdadero" : "Falso"}
            </button>
          ))}
        </div>
      </fieldset>

      <div role="status">
        {dada !== null && (
          <div className={bien ? "retro retro--bien" : "retro retro--mal"}>
            <p className="retro__titulo">{bien ? "Correcto" : "Incorrecto"}</p>
            <p>{item.razon}</p>
            {!bien && (
              <p>
                <Link href={ruta(item.repaso)}>Repasar en la {nombrePantalla(item.repaso)}</Link>
              </p>
            )}
          </div>
        )}
      </div>

      {dada !== null && (
        <button type="button" className="boton" onClick={() => setVista(actual + 1)}>
          {actual + 1 < ITEMS_EVALUACION ? "Siguiente pregunta" : "Ver el puntaje"}
        </button>
      )}
    </section>
  );
}
