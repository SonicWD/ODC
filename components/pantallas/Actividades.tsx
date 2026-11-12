"use client";

import { Arrastrar } from "@/components/actividades/Arrastrar";
import { Frase } from "@/components/actividades/Frase";
import { Opciones } from "@/components/actividades/Opciones";

export function Actividad1() {
  return (
    <Opciones
      clave="a1"
      repaso={4}
      enunciado="Si el sistema entrega una prueba y nadie la revisa, el resultado ya quedó aceptado."
      opciones={[
        {
          id: "v",
          etiqueta: "Verdadero",
          correcta: false,
          retro:
            "Una prueba que nadie revisa sigue siendo una propuesta. Vuelve a la pantalla 4, al paso «Prueba revisable», y reintenta.",
        },
        {
          id: "f",
          etiqueta: "Falso",
          correcta: true,
          retro: "La entrega es una propuesta. La aceptación exige una revisión que otra persona pueda repetir.",
        },
      ]}
    />
  );
}

export function Actividad2() {
  return <Arrastrar clave="a2" repaso={6} />;
}

export function Actividad3() {
  return (
    <Opciones
      clave="a3"
      repaso={8}
      enunciado="¿Qué beneficio documentan Jensen y colegas (2018) y Sun y Yu (2020)?"
      opciones={[
        {
          id: "a",
          etiqueta: "A. Reemplazan a quien investiga.",
          correcta: false,
          retro: "El artículo verifica un demostrador. No anuncia un reemplazo. Vuelve a la pantalla 8.",
        },
        {
          id: "b",
          etiqueta: "B. Dejan pasos que otra persona puede comprobar.",
          correcta: true,
          retro: "El beneficio sí está documentado: los pasos quedan en un asistente y otra persona puede recorrerlos.",
        },
        {
          id: "c",
          etiqueta: "C. Cierran un problema del milenio.",
          correcta: false,
          retro: "Ese resultado no está en estos estudios. Vuelve a la pantalla 8 y mira qué quedó revisable.",
        },
      ]}
    />
  );
}

export function Actividad4() {
  return (
    <Opciones
      clave="a4"
      repaso={10}
      enunciado="¿Cuál es una limitación real para usar estos sistemas en una universidad pública?"
      opciones={[
        {
          id: "a",
          etiqueta: "A. Estos sistemas no existen en la literatura.",
          correcta: false,
          retro: "Es falso. Kaufmann (2022) y Benzmüller y Scott (2020) están publicados. Vuelve a la pantalla 10.",
        },
        {
          id: "b",
          etiqueta: "B. Usarlos con criterio exige formación, herramienta y supervisión.",
          correcta: true,
          retro: "Nombraste el límite que sí se sostiene con los casos.",
        },
        {
          id: "c",
          etiqueta: "C. Solo sirven para redes sociales.",
          correcta: false,
          retro: "Cambia el tema. Ningún caso de este recorrido trata de redes sociales.",
        },
      ]}
    />
  );
}

export function Actividad5() {
  return (
    <Opciones
      clave="a5"
      repaso={12}
      enunciado="En los casos de Lund y Villadsen (2024) y de Schlichtkrull y colegas (2020), validar es que el sistema responda con seguridad."
      opciones={[
        {
          id: "v",
          etiqueta: "Verdadero",
          correcta: false,
          retro: "Un tono seguro está en la lista de lo que no cuenta. Vuelve a la pantalla 12.",
        },
        {
          id: "f",
          etiqueta: "Falso",
          correcta: true,
          retro:
            "Validar es que los pasos queden revisables. En Lund y Villadsen, además, esa revisión se usa para enseñar.",
        },
      ]}
    />
  );
}

export function Actividad6() {
  return (
    <Frase
      clave="a6"
      repaso={14}
      pregunta="¿Qué revisarías antes de usar el resultado de Álvez y colegas (2019) en un trabajo de posgrado?"
    />
  );
}
