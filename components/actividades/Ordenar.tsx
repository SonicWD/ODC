"use client";

import { Reorder, useDragControls } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { Repaso } from "@/components/Repaso";
import { marcarActividad, useProgreso } from "@/lib/progreso";

export type Paso = { id: string; texto: string };

type Marca = "ok" | "mal" | null;

// Un paso de la lista. Se arrastra solo desde la agarradera, para que el resto de la tarjeta
// deje desplazar la página con el dedo. Las flechas hacen lo mismo con teclado.
function PasoOrdenable({
  paso,
  posicion,
  total,
  marca,
  fijo,
  base,
  alMover,
  alSoltar,
}: {
  paso: Paso;
  posicion: number;
  total: number;
  marca: Marca;
  fijo: boolean;
  base: string;
  alMover: (salto: -1 | 1) => void;
  alSoltar: () => void;
}) {
  const controles = useDragControls();
  return (
    <Reorder.Item
      as="li"
      value={paso.id}
      dragListener={false}
      dragControls={controles}
      className={marca ? `orden__paso orden__paso--${marca}` : "orden__paso"}
      whileDrag={{ scale: 1.02, boxShadow: "0 14px 34px rgb(0 0 0 / 0.5)", zIndex: 2 }}
      onDragEnd={alSoltar}
    >
      {/* La agarradera es solo para puntero: con teclado y lector de pantalla se usan las flechas. */}
      <span
        className="orden__agarre"
        aria-hidden="true"
        onPointerDown={(evento) => {
          if (!fijo) controles.start(evento);
        }}
      >
        <svg viewBox="0 0 16 24">
          <path
            d="M5 5h.01M11 5h.01M5 12h.01M11 12h.01M5 19h.01M11 19h.01"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="orden__numero" aria-hidden="true">
        {posicion + 1}
      </span>
      <span className="orden__texto">
        {paso.texto}
        {marca && <span className="orden__nota">{marca === "ok" ? "En su lugar" : "Fuera de lugar"}</span>}
      </span>
      <span className="orden__botones">
        <button
          type="button"
          id={`${base}-${paso.id}-subir`}
          className="orden__boton"
          disabled={posicion === 0 || fijo}
          onClick={() => alMover(-1)}
        >
          <span aria-hidden="true">↑</span>
          <span className="solo-lector">Subir: {paso.texto}</span>
        </button>
        <button
          type="button"
          id={`${base}-${paso.id}-bajar`}
          className="orden__boton"
          disabled={posicion === total - 1 || fijo}
          onClick={() => alMover(1)}
        >
          <span aria-hidden="true">↓</span>
          <span className="solo-lector">Bajar: {paso.texto}</span>
        </button>
      </span>
    </Reorder.Item>
  );
}

// Ordenar una secuencia arrastrando o con las flechas. Sirve igual con ratón, dedo o teclado.
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
  /** Pantalla a la que se envía a repasar. */
  repaso: string;
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
  // Botón que debe recuperar el foco después de mover un paso con las flechas.
  const foco = useRef<string | null>(null);

  const enSuLugar = orden.map((id, i) => id === pasos[i].id);
  const bien = enSuLugar.every(Boolean);
  const resuelto = comprobado && bien;

  // Al mover un paso el navegador puede soltar el foco del botón; aquí se le devuelve.
  useEffect(() => {
    if (!foco.current) return;
    const boton = document.getElementById(foco.current);
    if (boton instanceof HTMLButtonElement && !boton.disabled) boton.focus();
    foco.current = null;
  }, [orden]);

  function anunciar(id: string, lista: string[]) {
    const texto = pasos.find((p) => p.id === id)?.texto;
    setAviso(`«${texto}» quedó en la posición ${lista.indexOf(id) + 1} de ${lista.length}.`);
  }

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
    anunciar(orden[i], nuevo);
  }

  function reordenar(nuevo: string[]) {
    setOrden(nuevo);
    setComprobado(false);
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
      <p className="actividad__ayuda">
        Arrastra cada paso por su agarradera o usa las flechas. Arriba va lo que ocurre primero.
      </p>

      <Reorder.Group as="ol" axis="y" values={orden} onReorder={reordenar} className="orden">
        {orden.map((id, i) => {
          const paso = pasos.find((p) => p.id === id);
          if (!paso) return null;
          return (
            <PasoOrdenable
              key={id}
              paso={paso}
              posicion={i}
              total={orden.length}
              marca={comprobado && !bien ? (enSuLugar[i] ? "ok" : "mal") : null}
              fijo={resuelto}
              base={base}
              alMover={(salto) => mover(i, salto)}
              alSoltar={() => anunciar(id, orden)}
            />
          );
        })}
      </Reorder.Group>
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
                <Repaso id={repaso} boton />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
