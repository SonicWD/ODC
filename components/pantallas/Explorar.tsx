"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Fuente } from "@/components/Piezas";
import { RESORTE } from "@/components/Movimiento";
import { marcarActividad, useProgreso } from "@/lib/progreso";

type CasoFicha = {
  id: string;
  cita: string;
  fuente: string;
  herramienta: string;
  beneficio: string;
  limitacion: string;
  validacion: string;
};

// Diez casos de asistentes de demostración tomados de la matriz de la revisión.
const CASOS: CasoFicha[] = [
  {
    id: "jensen",
    cita: "Jensen y colegas (2018)",
    fuente: "jensen2018",
    herramienta: "Isabelle/HOL",
    beneficio: "Queda un demostrador con corrección certificada y código que se puede estudiar.",
    limitacion: "El aporte es pedagógico y sobre un demostrador concreto, no sobre cualquier texto.",
    validacion: "La corrección del demostrador queda dentro del asistente.",
  },
  {
    id: "lund",
    cita: "Lund y Villadsen (2024)",
    fuente: "lund2024",
    herramienta: "Isabelle/HOL",
    beneficio: "El demostrador puede resolver una tarea de razonamiento sin mucho esfuerzo mental.",
    limitacion: "El alcance es lógica proposicional y cálculo de secuentes.",
    validacion: "Las pruebas del estudiante quedan comprobadas por la máquina.",
  },
  {
    id: "schlichtkrull",
    cita: "Schlichtkrull y colegas (2020)",
    fuente: "schlichtkrull2020",
    herramienta: "Isabelle/HOL",
    beneficio: "Formalizar aclaró puntos finos de un capítulo clásico sobre resolución.",
    limitacion: "Cubre la primera mitad del capítulo, no todo el campo.",
    validacion: "La prueba queda dentro del asistente y se puede recorrer.",
  },
  {
    id: "benzmuller",
    cita: "Benzmüller y Scott (2020)",
    fuente: "benzmuller2020",
    herramienta: "HOL / lógica libre",
    beneficio: "De paso salieron a la luz errores menores en un libro de texto reconocido.",
    limitacion: "No buscan resultados nuevos en teoría de categorías; el método opera sobre una lógica precisa.",
    validacion: "El razonamiento queda en un encaje formal dentro de HOL.",
  },
  {
    id: "kaufmann2022",
    cita: "Kaufmann (2022)",
    fuente: "kaufmann2022",
    herramienta: "Álgebra computacional",
    beneficio: "Se obtienen certificados de la verificación de circuitos.",
    limitacion: "Verificar multiplicadores todavía exige mucho trabajo manual.",
    validacion: "Los certificados los revisan comprobadores independientes.",
  },
  {
    id: "kaufmann2024",
    cita: "Kaufmann y colegas (2024)",
    fuente: "kaufmann2024",
    herramienta: "Pacheck, Pastèque, Nuss-Checker",
    beneficio: "Hay comprobadores de certificados; Pastèque está verificado en Isabelle/HOL.",
    limitacion: "El propio proceso de verificación puede contener errores.",
    validacion: "Los certificados se generan y se comprueban por fuera de la herramienta original.",
  },
  {
    id: "alvez",
    cita: "Álvez y colegas (2019)",
    fuente: "alvez2019",
    herramienta: "ATP sobre ontologías FOL",
    beneficio: "Detectaron defectos ocultos y mejoraron Adimen-SUMO.",
    limitacion: "Cubre ontologías en lógica de primer orden, no cualquier texto.",
    validacion: "Cada prueba da pistas sobre la naturaleza del defecto.",
  },
  {
    id: "sun",
    cita: "Sun y Yu (2020)",
    fuente: "sun2020",
    herramienta: "Coq",
    beneficio: "Ocho axiomas, un esquema, 62 definiciones y 148 teoremas o corolarios comprobados.",
    limitacion: "Formaliza resultados conocidos; no afirma descubrimiento de teoremas nuevos.",
    validacion: "Las pruebas quedan en el asistente Coq.",
  },
  {
    id: "reynolds",
    cita: "Reynolds y colegas (2017)",
    fuente: "reynolds2017",
    herramienta: "SMT / modelos finitos",
    beneficio: "Cuando el solucionador responde «unknown», puede devolver contraejemplos.",
    limitacion: "No siempre decide las fórmulas con cuantificadores.",
    validacion: "El contraejemplo es una forma concreta de comprobar que la fórmula no se sostiene.",
  },
  {
    id: "ye",
    cita: "Ye, Woodcock y Foster (2024)",
    fuente: "ye2024",
    herramienta: "Isabelle/UTP",
    beneficio: "Mecanizan ProbURel con ejemplos de razonamiento bajo incertidumbre.",
    limitacion: "Los autores reconocen que quedan muchos desafíos.",
    validacion: "El razonamiento queda dentro del asistente.",
  },
];

const COLUMNAS = [
  { clave: "beneficio", nombre: "Beneficio" },
  { clave: "limitacion", nombre: "Limitación" },
  { clave: "validacion", nombre: "Validación" },
] as const;

type ClaveColumna = (typeof COLUMNAS)[number]["clave"];

export function Galeria() {
  const [abierta, setAbierta] = useState<string | null>(CASOS[0].id);
  const caso = CASOS.find((c) => c.id === abierta) ?? CASOS[0];

  return (
    <>
      <p className="entrada">
        Estos diez casos salen de la matriz de la revisión. Abre cada ficha y mira las tres columnas. No tienes que
        memorizarlos: aprendes a leerlos.
      </p>

      <div className="galeria">
        <ul className="galeria__lista" role="list">
          {CASOS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={abierta === item.id ? "galeria__chip galeria__chip--activo" : "galeria__chip"}
                aria-pressed={abierta === item.id}
                onClick={() => setAbierta(item.id)}
              >
                <span className="galeria__herramienta">{item.herramienta}</span>
                <span>{item.cita}</span>
              </button>
            </li>
          ))}
        </ul>

        <AnimatePresence mode="wait">
          <motion.article
            key={caso.id}
            className="galeria__ficha"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={RESORTE}
          >
            <header className="galeria__cabeza">
              <p className="galeria__cita">{caso.cita}</p>
              <p className="galeria__herramienta">{caso.herramienta}</p>
              <Fuente id={caso.fuente}>Abrir el artículo</Fuente>
            </header>
            <dl className="galeria__columnas">
              <div className="columna--beneficio">
                <dt>Beneficio</dt>
                <dd>{caso.beneficio}</dd>
              </div>
              <div className="columna--limitacion">
                <dt>Limitación</dt>
                <dd>{caso.limitacion}</dd>
              </div>
              <div className="columna--validacion">
                <dt>Validación</dt>
                <dd>{caso.validacion}</dd>
              </div>
            </dl>
          </motion.article>
        </AnimatePresence>
      </div>
    </>
  );
}

const RETOS: {
  id: string;
  texto: string;
  fuente: string;
  correcta: ClaveColumna;
  pista: string;
}[] = [
  {
    id: "r1",
    texto: "Formalizar obligó a precisar puntos finos del capítulo.",
    fuente: "Schlichtkrull y colegas (2020)",
    correcta: "beneficio",
    pista: "Dice qué se ganó al formalizar, no qué cuesta ni cómo se comprueba.",
  },
  {
    id: "r2",
    texto: "El proceso de verificación podría contener errores.",
    fuente: "Kaufmann y colegas (2024)",
    correcta: "limitacion",
    pista: "Es una advertencia sobre el costo o el riesgo del método.",
  },
  {
    id: "r3",
    texto: "Cuando el solucionador no decide, puede devolver un contraejemplo.",
    fuente: "Reynolds y colegas (2017)",
    correcta: "validacion",
    pista: "El contraejemplo es una forma de comprobar que la fórmula no se sostiene.",
  },
  {
    id: "r4",
    texto: "Quedan muchos desafíos por resolver.",
    fuente: "Ye, Woodcock y Foster (2024)",
    correcta: "limitacion",
    pista: "Los autores reconocen un límite, no un beneficio ni una comprobación.",
  },
];

export function Laboratorio() {
  const progreso = useProgreso();
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<ClaveColumna | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const reto = RETOS[indice];
  const terminado = indice >= RETOS.length;
  const respondido = elegida !== null;
  const bien = elegida === reto?.correcta;

  function elegir(columna: ClaveColumna) {
    if (respondido || terminado) return;
    setElegida(columna);
    const suma = aciertos + (columna === reto.correcta ? 1 : 0);
    setAciertos(suma);
    if (indice + 1 >= RETOS.length && suma === RETOS.length) marcarActividad("a8", true);
  }

  function siguiente() {
    setElegida(null);
    setIndice((i) => i + 1);
  }

  function repetir() {
    setIndice(0);
    setElegida(null);
    setAciertos(0);
  }

  if (terminado) {
    const todas = aciertos === RETOS.length;
    return (
      <section className="actividad">
        {progreso.actividades.a8 && (
          <p className="actividad__hecha">Ya resolviste este laboratorio. Puedes repetirlo.</p>
        )}
        <div className={todas ? "retro retro--bien" : "retro retro--mal"} role="status">
          <p className="retro__titulo">
            {aciertos} de {RETOS.length} aciertos
          </p>
          {todas ? (
            <p>Leíste cada hallazgo con las tres columnas. Puedes seguir al caso guiado.</p>
          ) : (
            <>
              <p>Para resolver el laboratorio necesitas las {RETOS.length}. Repítelo cuando quieras.</p>
              <div className="retro__acciones">
                <button type="button" className="boton" onClick={repetir}>
                  Repetir el laboratorio
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="actividad">
      {progreso.actividades.a8 && !respondido && indice === 0 && (
        <p className="actividad__hecha">Ya resolviste este laboratorio. Puedes repetirlo.</p>
      )}
      <p className="actividad__cuenta">
        Hallazgo {indice + 1} de {RETOS.length}
      </p>
      <p className="actividad__enunciado">¿En qué columna va este hallazgo?</p>
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={reto.id}
          className="serie__tarjeta"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={RESORTE}
        >
          <p>{reto.texto}</p>
          <footer>{reto.fuente}</footer>
        </motion.blockquote>
      </AnimatePresence>

      <div className="laboratorio__columnas">
        {COLUMNAS.map((columna) => (
          <motion.button
            key={columna.clave}
            type="button"
            className={`laboratorio__boton columna--${columna.clave}${
              respondido && columna.clave === reto.correcta ? " laboratorio__boton--ok" : ""
            }`}
            aria-pressed={elegida === columna.clave}
            disabled={respondido && elegida !== columna.clave}
            onClick={() => elegir(columna.clave)}
            whileTap={!respondido ? { scale: 0.97 } : undefined}
          >
            {columna.nombre}
          </motion.button>
        ))}
      </div>

      <div role="status">
        <AnimatePresence>
          {respondido && (
            <motion.div
              key={`${reto.id}-${elegida}`}
              className={bien ? "retro retro--bien" : "retro retro--mal"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={RESORTE}
            >
              <p className="retro__titulo">{bien ? "Correcto" : "Todavía no"}</p>
              <p>{bien ? "Esa columna encaja con el hallazgo." : reto.pista}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {respondido && (
        <button type="button" className="boton" onClick={siguiente}>
          {indice + 1 < RETOS.length ? "Siguiente hallazgo" : "Ver el resultado"}
        </button>
      )}
    </section>
  );
}
