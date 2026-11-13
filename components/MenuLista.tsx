"use client";

import Link from "next/link";
import { MENU, indice, ruta } from "@/lib/pantallas";
import { useProgreso } from "@/lib/progreso";

export function MenuLista({ actual, nivel }: { actual: string; nivel: 2 | 3 }) {
  const progreso = useProgreso();
  const Rotulo = nivel === 2 ? "h2" : "h3";
  const aqui = indice(actual);

  return (
    <nav className="menu" aria-label="Secciones del recurso">
      {MENU.map((grupo) => (
        <div key={grupo.grupo} className="menu__grupo">
          <Rotulo className="menu__rotulo">{grupo.grupo}</Rotulo>
          <ul className="menu__lista" role="list">
            {grupo.entradas.map((entrada) => {
              const resuelta = entrada.actividad ? Boolean(progreso.actividades[entrada.actividad]) : false;
              return (
                <li key={entrada.id}>
                  <Link
                    href={ruta(entrada.id)}
                    className={resuelta ? "menu__enlace menu__enlace--resuelta" : "menu__enlace"}
                    aria-current={actual === entrada.id ? "page" : undefined}
                    transitionTypes={[indice(entrada.id) >= aqui ? "nav-forward" : "nav-back"]}
                  >
                    <span className="menu__marca" aria-hidden="true">
                      {resuelta ? "✓" : ""}
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
