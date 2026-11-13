"use client";

import { useSyncExternalStore } from "react";

export type Progreso = {
  actividades: Record<string, boolean>;
  hipotesis: string;
  frase: string;
  decision: "A" | "B" | null;
  justificacion: string;
  // Opción elegida en cada ítem de la evaluación (su id), o null si falta responder.
  evaluacion: (string | null)[];
  // Veces que se ha repetido la evaluación. Decide qué forma del cuestionario toca.
  intento: number;
  cierre: boolean[];
};

export const ITEMS_EVALUACION = 8;
export const MINIMO_ACIERTOS = 7;
export const MINIMO_PALABRAS = 15;

// v2: las respuestas de la evaluación pasaron de verdadero/falso a la opción elegida.
const CLAVE = "odc-formalizacion:v2";

const INICIAL: Progreso = {
  actividades: {},
  hipotesis: "",
  frase: "",
  decision: null,
  justificacion: "",
  evaluacion: Array(ITEMS_EVALUACION).fill(null),
  intento: 0,
  cierre: [false, false, false],
};

let memoria: Progreso = INICIAL;
let cargado = false;
const oyentes = new Set<() => void>();

function cargar() {
  if (cargado || typeof window === "undefined") return;
  cargado = true;
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (crudo) memoria = { ...INICIAL, ...JSON.parse(crudo) };
  } catch {
    // Sin almacenamiento (modo privado estricto): el progreso vive solo en memoria.
  }
}

function guardar() {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(memoria));
  } catch {
    // Igual que en cargar().
  }
  oyentes.forEach((avisar) => avisar());
}

function suscribir(avisar: () => void) {
  oyentes.add(avisar);
  return () => {
    oyentes.delete(avisar);
  };
}

function instantanea() {
  cargar();
  return memoria;
}

export function useProgreso(): Progreso {
  return useSyncExternalStore(suscribir, instantanea, () => INICIAL);
}

export function actualizar(cambio: Partial<Progreso>) {
  cargar();
  memoria = { ...memoria, ...cambio };
  guardar();
}

export function marcarActividad(clave: string, resuelta: boolean) {
  cargar();
  if (Boolean(memoria.actividades[clave]) === resuelta) return;
  actualizar({ actividades: { ...memoria.actividades, [clave]: resuelta } });
}

export function reiniciar() {
  memoria = INICIAL;
  guardar();
}

export function contarPalabras(texto: string): number {
  return texto.trim().split(/\s+/).filter(Boolean).length;
}

export function decisionJustificada(p: Progreso): boolean {
  return p.decision === "A" && contarPalabras(p.justificacion) >= MINIMO_PALABRAS;
}
