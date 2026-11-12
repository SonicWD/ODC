"use client";

import type { ReactNode } from "react";
import { Marco } from "@/components/Marco";
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

export function Pantalla({ n }: { n: number }) {
  const Cuerpo = CUERPOS[n];
  return <Marco n={n}>{Cuerpo ? <Cuerpo /> : null}</Marco>;
}
