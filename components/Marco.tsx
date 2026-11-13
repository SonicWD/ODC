"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Guia } from "@/components/Guia";
import { MenuLista } from "@/components/MenuLista";
import { Ventana } from "@/components/Ventana";
import { PANTALLAS, PORTADA, TOTAL, indice, pantallaDe, ruta } from "@/lib/pantallas";
import { AUDIOS } from "@/lib/sitio";

// Cabecera y barra inferior. Vive en el layout para que no se desmonte al cambiar de pantalla:
// así solo el contenido participa en la transición.
export function Marco({ children }: { children: ReactNode }) {
  const datos = pantallaDe(usePathname());
  if (!datos) return children;

  const i = indice(datos.id);
  const anterior = i > 0 ? PANTALLAS[i - 1] : null;
  const ultima = i === TOTAL - 1;
  const siguiente = ultima ? PANTALLAS[0] : PANTALLAS[i + 1];

  return (
    <div className="marco">
      <a className="salto" href="#contenido">
        Saltar al contenido
      </a>

      {/* El nombre de transición deja quietas la cabecera y la barra mientras el contenido se desliza. */}
      <header className="cabecera" style={{ viewTransitionName: "cabecera" }}>
        <div className="cabecera__fila">
          <Link className="cabecera__marca" href={ruta(PORTADA)} transitionTypes={["nav-back"]}>
            <span className="cabecera__sigla">ODC</span>
            <span className="cabecera__nombre">Formalizar con inteligencia artificial</span>
            <span className="solo-lector">, ir a la portada</span>
          </Link>
          <p className="cabecera__posicion">
            <span className="solo-lector">Estás en: </span>
            {datos.corto}
          </p>
          <Ventana etiqueta="Menú" titulo="Menú de navegación" clase="boton boton--suave boton--chico">
            <MenuLista actual={datos.id} nivel={3} />
          </Ventana>
        </div>
        {/* Avance del recorrido. Es un adorno: el menú dice dónde estás y qué falta. */}
        <div className="tramo" aria-hidden="true">
          <motion.div className="tramo__lleno" initial={false} animate={{ scaleX: (i + 1) / TOTAL }} />
        </div>
      </header>

      {children}

      <footer className="muelle" style={{ viewTransitionName: "muelle" }}>
        <div className="muelle__fila">
          {anterior ? (
            <Link className="muelle__paso" href={ruta(anterior.id)} transitionTypes={["nav-back"]}>
              <span aria-hidden="true">←</span>
              <span className="muelle__rotulo">Atrás</span>
            </Link>
          ) : (
            <span className="muelle__hueco" />
          )}

          <Guia id={datos.id} texto={datos.voz} audio={AUDIOS[datos.id]} />

          <Link
            className="muelle__paso muelle__paso--seguir"
            href={ruta(siguiente.id)}
            transitionTypes={[ultima ? "nav-back" : "nav-forward"]}
          >
            <span className="muelle__rotulo">{i === 0 ? "Iniciar" : ultima ? "Inicio" : "Seguir"}</span>
            <span aria-hidden="true">{ultima ? "↺" : "→"}</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
