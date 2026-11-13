"use client";

import { ViewTransition, type ReactNode } from "react";
import { buscar } from "@/lib/pantallas";
import { SITIO } from "@/lib/sitio";
import {
  Actividad1,
  Actividad2,
  Actividad3,
  Actividad4,
  Actividad5,
  Actividad6,
} from "@/components/pantallas/Actividades";
import { Evaluacion } from "@/components/pantallas/Evaluacion";
import { Cierre, Creditos, Referencias } from "@/components/pantallas/Final";
import { MenuPantalla, Portada, ResultadoPoblacion } from "@/components/pantallas/Inicio";
import {
  Apropiacion,
  Beneficios,
  Caso,
  Criterios,
  Formalizar,
  Limitaciones,
  Validacion,
} from "@/components/pantallas/Modulos";

const CUERPOS: Record<number, () => ReactNode> = {
  1: Portada,
  2: ResultadoPoblacion,
  3: MenuPantalla,
  4: Formalizar,
  5: Actividad1,
  6: Criterios,
  7: Actividad2,
  8: Beneficios,
  9: Actividad3,
  10: Limitaciones,
  11: Actividad4,
  12: Validacion,
  13: Actividad5,
  14: Caso,
  15: Actividad6,
  16: Apropiacion,
  17: Evaluacion,
  18: Cierre,
  19: Referencias,
  20: Creditos,
};

// Seguir desliza hacia adelante y Atrás hacia atrás; cualquier otro salto funde.
const DESLIZAR = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "auto" } as const;

function dos(n: number): string {
  return String(n).padStart(2, "0");
}

// Contenido de una pantalla. La cabecera y la barra inferior están en components/Marco.tsx.
export function Pantalla({ n }: { n: number }) {
  const datos = buscar(n);
  const Cuerpo = CUERPOS[n];
  if (!datos || !Cuerpo) return null;

  return (
    <ViewTransition enter={DESLIZAR} exit={DESLIZAR} default="none">
      <main id="contenido" className={n === 1 ? "lienzo lienzo--portada" : "lienzo"}>
        {n > 1 && (
          <div className="lienzo__encabezado">
            <p className="seccion">
              <span className="seccion__numero">{dos(n)}</span>
              {datos.seccion}
            </p>
            <h1 className="titulo">{datos.titulo}</h1>
          </div>
        )}
        <div className="lienzo__contenido">
          <Cuerpo />
        </div>
        <p className="licencia">
          {SITIO.autor} · {SITIO.programa}, Universidad de Cundinamarca · {SITIO.licencia.sigla}
        </p>
      </main>
    </ViewTransition>
  );
}
