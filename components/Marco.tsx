"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Guia } from "@/components/Guia";
import { MenuLista } from "@/components/MenuLista";
import { Ventana } from "@/components/Ventana";
import { TOTAL, buscar, ruta } from "@/lib/pantallas";
import { AUDIOS, SITIO } from "@/lib/sitio";

export function Marco({ n, children }: { n: number; children: ReactNode }) {
  const datos = buscar(n);
  if (!datos) return null;

  const anterior = n > 1 ? n - 1 : null;
  const siguiente = n > 1 && n < TOTAL ? n + 1 : null;

  return (
    <div className="marco">
      <a className="salto" href="#contenido">
        Saltar al contenido
      </a>

      <header className="cabecera">
        <div className="cabecera__fila">
          <p className="cabecera__marca">
            <span className="cabecera__sigla">ODC</span>
            <span className="cabecera__nombre">Formalizar con inteligencia artificial</span>
          </p>
          <p className="cabecera__posicion">
            Pantalla {n} de {TOTAL}
          </p>
          <Ventana etiqueta="Menú" titulo="Menú de navegación" clase="boton boton--acento">
            <MenuLista actual={n} nivel={3} />
          </Ventana>
        </div>
        <div className="cabecera__avance" aria-hidden="true">
          <span style={{ inlineSize: `${(n / TOTAL) * 100}%` }} />
        </div>
      </header>

      {/* En pantallas angostas el orden es título, guía y contenido.
          La portada lleva su propio título, así que allí la guía va al final. */}
      <main id="contenido" className={n === 1 ? "lienzo lienzo--portada" : "lienzo"}>
        {n === 1 ? (
          <div className="lienzo__contenido">{children}</div>
        ) : (
          <div className="lienzo__encabezado">
            <p className="seccion">{datos.seccion}</p>
            <h1 className="titulo">{datos.titulo}</h1>
          </div>
        )}
        <aside className="lienzo__guia" aria-label="Guía con voz">
          <Guia n={n} texto={datos.voz} audio={AUDIOS[n]} />
        </aside>
        {n > 1 && <div className="lienzo__contenido">{children}</div>}
      </main>

      <footer className="pie">
        {n > 1 && (
          <nav className="pie__nav" aria-label="Recorrido">
            {anterior && (
              <Link className="boton boton--suave" href={ruta(anterior)}>
                <span aria-hidden="true">←</span> Atrás
              </Link>
            )}
            {siguiente ? (
              <Link className="boton pie__seguir" href={ruta(siguiente)}>
                Seguir <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <Link className="boton pie__seguir" href={ruta(1)}>
                Inicio
              </Link>
            )}
          </nav>
        )}
        <p className="pie__licencia">
          {SITIO.autor} · {SITIO.programa}, Universidad de Cundinamarca · {SITIO.licencia.sigla}
        </p>
      </footer>
    </div>
  );
}
