"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ruta } from "@/lib/pantallas";
import { marcarActividad, useProgreso } from "@/lib/progreso";

export type Paso = { id: string; texto: string };

// Ordenar una secuencia con los botones Subir y Bajar. Sirve igual con ratón, teclado o pantalla táctil.
export function Ordenar({
  clave,
  repaso,
  enunciado,
  pasos,
  inicial,
  retroBien,
  retroMal,
}: {
  clave: string;
  repaso: number;
  enunciado: string;
  /** Los pasos, en el orden correcto. */
  pasos: Paso[];
  /** Los ids, en el orden desordenado con el que empieza la actividad. */
  inicial: string[];
  retroBien: string;
  retroMal: string;
}) {
  const progreso = useProgreso();
  const base = useId();
  const [orden, setOrden] = useState(inicial);
  const [comprobado, setComprobado] = useState(false);
  const [aviso, setAviso] = useState("");
  // Botón que debe recuperar el foco después de mover un paso.
  const foco = useRef<string | null>(null);

  const enSuLugar = orden.map((id, i) => id === pasos[i].id);
  const bien = enSuLugar.every(Boolean);

  // Al mover un paso el navegador puede soltar el foco del botón; aquí se le devuelve.
  useEffect(() => {
    if (!foco.current) return;
    const boton = document.getElementById(foco.current);
    if (boton instanceof HTMLButtonElement && !boton.disabled) boton.focus();
    foco.current = null;
  }, [orden]);

  function mover(i: number, salto: -1 | 1) {
    const j = i + salto;
    if (j < 0 || j >= orden.length) return;
    const nuevo = [...orden];
    [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
    // Si el paso llega a un extremo, el botón usado queda inactivo: el foco pasa al otro.
    const enExtremo = j === 0 || j === orden.length - 1;
    const sentido = enExtremo ? (salto === -1 ? "bajar" : "subir") : salto === -1 ? "subir" : "bajar";
    foco.current = `${base}-${orden[i]}-${sentido}`;
    setOrden(nuevo);
    setComprobado(false);
    setAviso(`«${pasos.find((p) => p.id === orden[i])?.texto}» quedó en la posición ${j + 1} de ${orden.length}.`);
  }

  function comprobar() {
    setComprobado(true);
    if (bien) marcarActividad(clave, true);
  }

  return (
    <section className="actividad">
      {progreso.actividades[clave] && !comprobado && (
        <p className="actividad__hecha">Ya resolviste esta actividad. Puedes repetirla.</p>
      )}
      <p className="actividad__enunciado">{enunciado}</p>
      <p className="actividad__ayuda">Usa las flechas para subir o bajar cada paso. Arriba va lo que ocurre primero.</p>

      <ol className="orden">
        {orden.map((id, i) => {
          const paso = pasos.find((p) => p.id === id);
          if (!paso) return null;
          const marcado = comprobado && !bien;
          return (
            <li
              key={id}
              className={
                marcado ? (enSuLugar[i] ? "orden__paso orden__paso--ok" : "orden__paso orden__paso--mal") : "orden__paso"
              }
            >
              <span className="orden__numero" aria-hidden="true">
                {i + 1}
              </span>
              <span className="orden__texto">
                {paso.texto}
                {marcado && <span className="orden__nota">{enSuLugar[i] ? "En su lugar" : "Fuera de lugar"}</span>}
              </span>
              <span className="orden__botones">
                <button
                  type="button"
                  id={`${base}-${id}-subir`}
                  className="orden__boton"
                  disabled={i === 0 || (comprobado && bien)}
                  onClick={() => mover(i, -1)}
                >
                  <span aria-hidden="true">↑</span>
                  <span className="solo-lector">Subir: {paso.texto}</span>
                </button>
                <button
                  type="button"
                  id={`${base}-${id}-bajar`}
                  className="orden__boton"
                  disabled={i === orden.length - 1 || (comprobado && bien)}
                  onClick={() => mover(i, 1)}
                >
                  <span aria-hidden="true">↓</span>
                  <span className="solo-lector">Bajar: {paso.texto}</span>
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="solo-lector" aria-live="polite">
        {aviso}
      </p>

      {!comprobado && (
        <button type="button" className="boton" onClick={comprobar}>
          Comprobar
        </button>
      )}

      <div role="status">
        {comprobado && (
          <div className={bien ? "retro retro--bien" : "retro retro--mal"}>
            <p className="retro__titulo">{bien ? "Correcto" : "Todavía no"}</p>
            <p>{bien ? retroBien : retroMal}</p>
            {bien ? (
              <p>Puedes seguir.</p>
            ) : (
              <div className="retro__acciones">
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
