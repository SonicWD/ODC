"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ruta } from "@/lib/pantallas";
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
  repaso: number;
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
            <button
              key={opcion.id}
              ref={i === 0 ? primera : undefined}
              type="button"
              className="opcion"
              aria-pressed={elegida === opcion.id}
              disabled={elegida !== null && elegida !== opcion.id}
              onClick={() => elegir(opcion)}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>
      </fieldset>

      <div role="status">
        {respuesta && (
          <div className={respuesta.correcta ? "retro retro--bien" : "retro retro--mal"}>
            <p className="retro__titulo">{respuesta.correcta ? "Correcto" : "Todavía no"}</p>
            <p>{respuesta.retro}</p>
            {respuesta.correcta ? (
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
