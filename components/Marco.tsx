"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Guia } from "@/components/Guia";
import { MenuLista } from "@/components/MenuLista";
import { Ventana } from "@/components/Ventana";
import { PANTALLAS, TOTAL, buscar, ruta } from "@/lib/pantallas";
import { AUDIOS } from "@/lib/sitio";

function dos(n: number): string {
  return String(n).padStart(2, "0");
}

// "/" es la pantalla 1 y "/pantalla/7/" es la 7. Cualquier otra ruta no tiene marco.
function pantallaDe(camino: string): number | null {
  if (camino === "/") return 1;
  const partes = camino.match(/^\/pantalla\/(\d+)\/?$/);
  return partes ? Number(partes[1]) : null;
}

// Cabecera y barra inferior. Vive en el layout para que no se desmonte al cambiar de pantalla:
// así solo el contenido participa en la transición.
export function Marco({ children }: { children: ReactNode }) {
  const n = pantallaDe(usePathname());
  const datos = n === null ? undefined : buscar(n);
  if (n === null || !datos) return children;

  const anterior = n > 1 ? n - 1 : null;
  const siguiente = n < TOTAL ? n + 1 : 1;

  return (
    <div className="marco">
      <a className="salto" href="#contenido">
        Saltar al contenido
      </a>

      {/* El nombre de transición deja quietas la cabecera y la barra mientras el contenido se desliza. */}
      <header className="cabecera" style={{ viewTransitionName: "cabecera" }}>
        <div className="cabecera__fila">
          <Link className="cabecera__marca" href={ruta(1)} transitionTypes={["nav-back"]}>
            <span className="cabecera__sigla">ODC</span>
            <span className="cabecera__nombre">Formalizar con inteligencia artificial</span>
            <span className="solo-lector">, ir a la portada</span>
          </Link>
          <p className="cabecera__posicion">
            <span className="solo-lector">Pantalla </span>
            <b>{dos(n)}</b>
            <span aria-hidden="true"> / </span>
            <span className="solo-lector"> de </span>
            {TOTAL}
          </p>
          <Ventana etiqueta="Menú" titulo="Menú de navegación" clase="boton boton--suave boton--chico">
            <MenuLista actual={n} nivel={3} />
          </Ventana>
        </div>
        <ol className="tramo" aria-hidden="true">
          {PANTALLAS.map((p) => (
            <li
              key={p.n}
              className={
                p.n < n ? "tramo__paso tramo__paso--hecho" : p.n === n ? "tramo__paso tramo__paso--actual" : "tramo__paso"
              }
            />
          ))}
        </ol>
      </header>

      {children}

      <footer className="muelle" style={{ viewTransitionName: "muelle" }}>
        <div className="muelle__fila">
          {anterior ? (
            <Link className="muelle__paso" href={ruta(anterior)} transitionTypes={["nav-back"]}>
              <span aria-hidden="true">←</span>
              <span className="muelle__rotulo">Atrás</span>
            </Link>
          ) : (
            <span className="muelle__hueco" />
          )}

          <Guia n={n} texto={datos.voz} audio={AUDIOS[n]} />

          <Link
            className="muelle__paso muelle__paso--seguir"
            href={ruta(siguiente)}
            transitionTypes={[n < TOTAL ? "nav-forward" : "nav-back"]}
          >
            <span className="muelle__rotulo">{n === 1 ? "Iniciar" : n < TOTAL ? "Seguir" : "Inicio"}</span>
            <span aria-hidden="true">{n < TOTAL ? "→" : "↺"}</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
