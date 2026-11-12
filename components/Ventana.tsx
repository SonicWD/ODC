"use client";

import { useId, useRef, type MouseEvent, type ReactNode } from "react";

// Ventana emergente sobre <dialog> nativo: el navegador se encarga del foco,
// de Esc y de devolver el foco al botón que la abrió.
export function Ventana({
  etiqueta,
  titulo,
  clase = "boton boton--suave",
  children,
}: {
  etiqueta: ReactNode;
  titulo: string;
  clase?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const idTitulo = useId();

  // Se cierra al pulsar un enlace interno o cualquier control marcado con data-cerrar.
  function cerrarSiCorresponde(evento: MouseEvent<HTMLDialogElement>) {
    const origen = evento.target as HTMLElement;
    if (origen.closest("[data-cerrar], a:not([target])")) evento.currentTarget.close();
  }

  return (
    <>
      <button type="button" className={clase} onClick={() => ref.current?.showModal()}>
        {etiqueta}
      </button>
      {/* closedby="any" añade el cierre al pulsar fuera donde el navegador lo admite. */}
      <dialog
        ref={ref}
        className="ventana"
        aria-labelledby={idTitulo}
        onClick={cerrarSiCorresponde}
        {...{ closedby: "any" }}
      >
        <h2 id={idTitulo} className="ventana__titulo">
          {titulo}
        </h2>
        <div className="ventana__cuerpo">{children}</div>
        <form method="dialog" className="ventana__pie">
          <button className="boton">Cerrar</button>
        </form>
      </dialog>
    </>
  );
}
