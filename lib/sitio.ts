export const SITIO = {
  tituloCorto: "Inteligencia artificial para formalizar conocimiento científico",
  tituloLargo:
    "Plataforma web interactiva como estrategia digital para el aprendizaje de beneficios, limitaciones y validación de sistemas de inteligencia artificial en la formalización de conocimiento científico",
  autor: "Wilson Alfonso Díaz Capador",
  programa: "Especialización en Inteligencia Artificial",
  institucion: "Universidad de Cundinamarca, Extensión Fusagasugá",
  curso: "Ciencia, Tecnología e Innovación",
  area: "Inteligencia artificial aplicada a la formalización del conocimiento científico",
  linea: "Aprendizaje, conocimiento, tecnologías, comunicación y digitalización",
  fecha: "Noviembre de 2026",
  version: "Versión 1.0",
  nivel: "Alto (posgrado)",
  licencia: {
    nombre: "Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional",
    sigla: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es",
  },
} as const;

export const REA =
  "Al finalizar, el estudiante analiza beneficios, limitaciones y criterios de validación de sistemas de inteligencia artificial usados para formalizar conocimiento científico en universidades públicas, a partir de casos publicados entre 2016 y 2026, evidenciado por al menos 80 % de acierto en ocho ítems y por una decisión justificada.";

export const POBLACION =
  "Estudiantes de posgrado de la Especialización en Inteligencia Artificial, Universidad de Cundinamarca, Extensión Fusagasugá.";

// Para usar un audio grabado: guárdalo en public/audio y escribe aquí su ruta
// con el número de pantalla, por ejemplo { 4: "/audio/pantalla-04.mp3" }.
// Las pantallas sin audio grabado usan la voz del navegador.
export const AUDIOS: Record<number, string> = {};

export function conBase(ruta: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${ruta}`;
}
