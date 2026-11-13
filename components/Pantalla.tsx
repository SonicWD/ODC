"use client";

import { ViewTransition, type ReactNode } from "react";
import { PORTADA, buscar } from "@/lib/pantallas";
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
import { Galeria, Laboratorio } from "@/components/pantallas/Explorar";
import {
  Apropiacion,
  Beneficios,
  Caso,
  Criterios,
  Formalizar,
  Limitaciones,
  Validacion,
} from "@/components/pantallas/Modulos";
import { Problema, ProblemaActividad } from "@/components/pantallas/Problema";

// Contenido de cada pantalla, por su nombre en lib/pantallas.ts.
const CUERPOS: Record<string, () => ReactNode> = {
  portada: Portada,
  resultado: ResultadoPoblacion,
  menu: MenuPantalla,
  problema: Problema,
  "problema-actividad": ProblemaActividad,
  formalizar: Formalizar,
  "formalizar-actividad": Actividad1,
  criterios: Criterios,
  "criterios-actividad": Actividad2,
  beneficios: Beneficios,
  "beneficios-actividad": Actividad3,
  limitaciones: Limitaciones,
  "limitaciones-actividad": Actividad4,
  validacion: Validacion,
  "validacion-actividad": Actividad5,
  galeria: Galeria,
  laboratorio: Laboratorio,
  caso: Caso,
  "caso-actividad": Actividad6,
  apropiacion: Apropiacion,
  evaluacion: Evaluacion,
  cierre: Cierre,
  referencias: Referencias,
  creditos: Creditos,
};

// Seguir desliza hacia adelante y Atrás hacia atrás; cualquier otro salto funde.
const DESLIZAR = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "auto" } as const;

// Contenido de una pantalla. La cabecera y la barra inferior están en components/Marco.tsx.
export function Pantalla({ id }: { id: string }) {
  const datos = buscar(id);
  const Cuerpo = CUERPOS[id];
  if (!datos || !Cuerpo) return null;
  const portada = id === PORTADA;

  return (
    <ViewTransition enter={DESLIZAR} exit={DESLIZAR} default="none">
      <main id="contenido" className={portada ? "lienzo lienzo--portada" : "lienzo"}>
        {!portada && (
          <div className="lienzo__encabezado">
            <p className="seccion">{datos.seccion}</p>
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
