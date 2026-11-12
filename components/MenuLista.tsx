"use client";

import Link from "next/link";
import { MENU, ruta } from "@/lib/pantallas";
import { useProgreso } from "@/lib/progreso";

export function MenuLista({ actual, nivel }: { actual: number; nivel: 2 | 3 }) {
  const progreso = useProgreso();
  const Rotulo = nivel === 2 ? "h2" : "h3";

  return (
    <nav className="menu" aria-label="Secciones del recurso">
      {MENU.map((grupo) => (
        <div key={grupo.grupo} className="menu__grupo">
          <Rotulo className="menu__rotulo">{grupo.grupo}</Rotulo>
          <ul className="menu__lista" role="list">
            {grupo.entradas.map((entrada) => {
              const resuelta = entrada.actividad ? Boolean(progreso.actividades[entrada.actividad]) : false;
              return (
                <li key={entrada.n}>
                  <Link
                    href={ruta(entrada.n)}
                    className="menu__enlace"
                    aria-current={actual === entrada.n ? "page" : undefined}
                  >
                    <span className="menu__numero" aria-hidden="true">
                      {entrada.n}
                    </span>
                    <span className="menu__nombre">{entrada.etiqueta}</span>
                    {entrada.actividad && (
                      <span className={resuelta ? "menu__estado menu__estado--ok" : "menu__estado"}>
                        {resuelta ? "Actividad resuelta" : "Actividad pendiente"}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
