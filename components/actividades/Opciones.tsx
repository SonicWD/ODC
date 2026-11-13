"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { Repaso } from "@/components/Repaso";
import { RESORTE } from "@/components/Movimiento";
import { marcarActividad, useProgreso } from "@/lib/progreso";

export type Opcion = { id: string; etiqueta: string; correcta: boolean; retro: string };

// Verdadero o falso y opción múltiple: una respuesta, retroalimentación inmediata.
export function Opciones({
  clave,
  caso,
  enunciado,
  opciones,
  repaso,
}: {
  clave: string;
  /** Situación o hallazgo sobre el que se pregunta. Se muestra antes del enunciado. */
  caso?: string;
  enunciado: string;
  opciones: Opcion[];
  repaso: string;
}) {
  const progreso = useProgreso();
  const [elegida, setElegida] = useState<string | null>(null);
  const primera = useRef<HTMLButtonElement>(null);
  const respuesta = opciones.find((o) => o.id === elegida);

  function elegir(opcion: Opcion) {
    setElegida(opcion.id);
    if (opcion.correcta) marcarActividad(clave, true);
  }

  function reintentar() {
    setElegida(null);
    requestAnimationFrame(() => primera.current?.focus());
  }

  return (
    <section className="actividad">
      {progreso.actividades[clave] && !respuesta && (
        <p className="actividad__hecha">Ya resolviste esta actividad. Puedes repetirla.</p>
      )}
      {caso && (
        <p className="caso">
          <span className="caso__rotulo">Caso</span>
          {caso}
        </p>
      )}
      <fieldset className="actividad__grupo">
        <legend className="actividad__enunciado">{enunciado}</legend>
        <div className="opciones">
          {opciones.map((opcion, i) => (
            <motion.button
              key={opcion.id}
              ref={i === 0 ? primera : undefined}
              type="button"
              className="opcion"
              aria-pressed={elegida === opcion.id}
              disabled={elegida !== null && elegida !== opcion.id}
              onClick={() => elegir(opcion)}
              whileTap={elegida === null ? { scale: 0.985 } : undefined}
              transition={RESORTE}
            >
              {opcion.etiqueta}
            </motion.button>
          ))}
        </div>
      </fieldset>

      <div role="status">
        <AnimatePresence>
          {respuesta && (
            <motion.div
              key={respuesta.id}
              className={respuesta.correcta ? "retro retro--bien" : "retro retro--mal"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={RESORTE}
            >
              <p className="retro__titulo">{respuesta.correcta ? "Correcto" : "Todavía no"}</p>
              <p>{respuesta.retro}</p>
              {respuesta.correcta ? (
                <p>Puedes seguir.</p>
              ) : (
                <div className="retro__acciones">
                  <button type="button" className="boton" onClick={reintentar}>
                    Reintentar
                  </button>
                  <Repaso id={repaso} boton />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
