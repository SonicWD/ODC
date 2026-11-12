"use client";

import { useSyncExternalStore } from "react";

type Fase = "inactiva" | "hablando" | "pausada";
export type EstadoVoz = { id: string | null; fase: Fase; aviso: string | null };

const REPOSO: EstadoVoz = { id: null, fase: "inactiva", aviso: null };

let estado: EstadoVoz = REPOSO;
let turno = 0;
const oyentes = new Set<() => void>();

function poner(nuevo: EstadoVoz) {
  estado = nuevo;
  oyentes.forEach((avisar) => avisar());
}

function suscribir(avisar: () => void) {
  oyentes.add(avisar);
  return () => {
    oyentes.delete(avisar);
  };
}

export function useVoz(): EstadoVoz {
  return useSyncExternalStore(
    suscribir,
    () => estado,
    () => REPOSO,
  );
}

function sintetizador(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  return window.speechSynthesis;
}

// undefined: el navegador aún no entrega la lista. null: no hay voz en español.
function vozEnEspanol(synth: SpeechSynthesis): SpeechSynthesisVoice | null | undefined {
  const voces = synth.getVoices();
  if (voces.length === 0) return undefined;
  const es = voces.filter((v) => v.lang.toLowerCase().startsWith("es"));
  if (es.length === 0) return null;
  for (const preferida of ["es-co", "es-419", "es-mx", "es-us", "es-es"]) {
    const voz = es.find((v) => v.lang.toLowerCase().replace("_", "-") === preferida);
    if (voz) return voz;
  }
  return es[0];
}

// Chrome corta las locuciones largas: se envía una frase por locución.
function enFrases(texto: string): string[] {
  const partes = texto.match(/[^.!?…]+[.!?…]+|[^.!?…]+$/g) ?? [texto];
  return partes.map((p) => p.trim()).filter(Boolean);
}

export function prepararVoces() {
  sintetizador()?.getVoices();
}

export function hablar(id: string, texto: string) {
  const synth = sintetizador();
  if (!synth) {
    poner({ id, fase: "inactiva", aviso: "Este navegador no tiene voz. Lee la transcripción." });
    return;
  }
  const voz = vozEnEspanol(synth);
  if (voz === null) {
    poner({
      id,
      fase: "inactiva",
      aviso: "Este equipo no tiene una voz en español instalada. Lee la transcripción.",
    });
    return;
  }

  synth.cancel();
  const mio = ++turno;
  const partes = enFrases(texto);
  partes.forEach((parte, i) => {
    const locucion = new SpeechSynthesisUtterance(parte);
    locucion.lang = voz?.lang ?? "es-CO";
    if (voz) locucion.voice = voz;
    locucion.rate = 0.95;
    if (i === partes.length - 1) {
      locucion.onend = () => {
        if (turno === mio) poner(REPOSO);
      };
    }
    locucion.onerror = (evento) => {
      if (turno !== mio || evento.error === "interrupted" || evento.error === "canceled") return;
      poner({ id, fase: "inactiva", aviso: "No se pudo reproducir la voz. Lee la transcripción." });
    };
    synth.speak(locucion);
  });
  poner({ id, fase: "hablando", aviso: null });
}

export function pausar() {
  sintetizador()?.pause();
  poner({ ...estado, fase: "pausada" });
}

export function reanudar() {
  sintetizador()?.resume();
  poner({ ...estado, fase: "hablando" });
}

export function detener() {
  turno++;
  sintetizador()?.cancel();
  poner(REPOSO);
}

export function detenerSiEs(id: string) {
  if (estado.id === id) detener();
}
