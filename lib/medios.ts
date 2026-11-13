"use client";

import { useSyncExternalStore } from "react";

function suscribirA(consulta: string) {
  return (avisar: () => void) => {
    const medio = window.matchMedia(consulta);
    medio.addEventListener("change", avisar);
    return () => medio.removeEventListener("change", avisar);
  };
}

const PUNTERO_FINO = "(pointer: fine)";
const suscribirPuntero = suscribirA(PUNTERO_FINO);

/**
 * Verdadero cuando el dispositivo tiene ratón o panel táctil de computador.
 * En pantallas táctiles el arrastre libre impediría desplazar la página con el dedo.
 */
export function usePunteroFino(): boolean {
  return useSyncExternalStore(
    suscribirPuntero,
    () => window.matchMedia(PUNTERO_FINO).matches,
    () => false,
  );
}
