"use client";

import { Arrastrar } from "@/components/actividades/Arrastrar";
import { Frase } from "@/components/actividades/Frase";
import { Opciones } from "@/components/actividades/Opciones";
import { Ordenar } from "@/components/actividades/Ordenar";
import { Serie } from "@/components/actividades/Serie";

// Los datos de cada caso salen de los resúmenes de los artículos, tal como están en la matriz de la revisión.

export function Actividad1() {
  return (
    <Ordenar
      clave="a1"
      repaso="formalizar"
      enunciado="Ordena el camino de un resultado, desde que alguien lo afirma hasta que queda aceptado."
      pasos={[
        { id: "parrafo", texto: "Alguien afirma el resultado en un párrafo convincente." },
        { id: "formal", texto: "El resultado se escribe con símbolos y reglas declaradas." },
        { id: "asistente", texto: "Un asistente de prueba registra cada paso de la demostración." },
        { id: "revision", texto: "Otra persona recorre los pasos y dice si se sostienen." },
      ]}
      inicial={["asistente", "parrafo", "revision", "formal"]}
      retroBien="Ese es el orden. Lo que entrega el sistema no cierra el camino: el resultado queda aceptado cuando otra persona puede recorrer los pasos."
      retroMal="Hay pasos fuera de lugar. Fíjate en cuál pusiste de último: una prueba que nadie revisa sigue siendo una propuesta. Mueve los pasos y vuelve a comprobar, o repasa la infografía de Formalizar."
    />
  );
}

export function Actividad2() {
  return (
    <Arrastrar
      clave="a2"
      repaso="criterios"
      enunciado="Estos seis hallazgos salen de los artículos. Lleva cada uno a su columna."
      zonas={[
        { clave: "beneficio", nombre: "Beneficio", ayuda: "Lo que se gana con el método" },
        { clave: "limitacion", nombre: "Limitación", ayuda: "Lo que cuesta o no cubre" },
        { clave: "validacion", nombre: "Validación", ayuda: "Cómo se comprueba el resultado" },
      ]}
      frases={[
        {
          id: "A",
          texto: "Queda un demostrador pensado para enseñar cómo funcionan estas herramientas.",
          fuente: "Jensen y colegas (2018)",
          destino: "beneficio",
          pista: "Dice qué queda disponible después del trabajo. Eso es lo que se gana.",
        },
        {
          id: "B",
          texto: "Un comprobador independiente revisa los certificados de la prueba.",
          fuente: "Kaufmann (2022)",
          destino: "validacion",
          pista: "Dice cómo se comprueba el resultado y quién lo hace.",
        },
        {
          id: "C",
          texto: "El método cubre ontologías en lógica de primer orden, no cualquier texto.",
          fuente: "Álvez y colegas (2019)",
          destino: "limitacion",
          pista: "Dice hasta dónde llega el método. Ese es su alcance.",
        },
        {
          id: "D",
          texto: "Verificar multiplicadores todavía exige mucho trabajo manual.",
          fuente: "Kaufmann (2022)",
          destino: "limitacion",
          pista: "Habla de lo que cuesta usar el método, no de lo que entrega.",
        },
        {
          id: "E",
          texto: "La máquina comprueba, paso a paso, cada prueba que escribe el estudiante.",
          fuente: "Lund y Villadsen (2024)",
          destino: "validacion",
          pista: "Dice cómo se revisa cada paso, no qué se gana ni qué cuesta.",
        },
        {
          id: "F",
          texto: "Salen a la luz defectos que estaban ocultos en la ontología.",
          fuente: "Álvez y colegas (2019)",
          destino: "beneficio",
          pista: "Dice qué permite ver el método. Eso es lo que se gana.",
        },
      ]}
      retroBien="Separaste lo que se gana, lo que cuesta o no cubre, y la forma de comprobar. Con esas tres columnas se lee cualquier caso."
    />
  );
}

export function Actividad3() {
  return (
    <Opciones
      clave="a3"
      repaso="beneficios"
      caso="Sun y Yu (2020) escribieron en Coq una teoría de conjuntos: ocho axiomas, un esquema de axiomas, 62 definiciones y 148 teoremas o corolarios, con sus pruebas dentro del asistente."
      enunciado="¿Qué beneficio puedes citar con ese artículo?"
      opciones={[
        {
          id: "a",
          etiqueta: "A. Coq descubrió por su cuenta teoremas de conjuntos que no se conocían.",
          correcta: false,
          retro:
            "El artículo formaliza teoremas conocidos, como el de Schröder-Bernstein. El beneficio es que quedan comprobables, no que sean nuevos. Vuelve a la ficha de Sun y Yu en Beneficios.",
        },
        {
          id: "b",
          etiqueta: "B. La teoría quedó en un archivo donde otra persona puede comprobar cada prueba.",
          correcta: true,
          retro:
            "Ese beneficio sí está documentado: los axiomas y las pruebas quedan en un lenguaje que se puede comprobar, no en un resumen de la teoría.",
        },
        {
          id: "c",
          etiqueta: "C. Con ese archivo ya no hace falta que una persona entienda la teoría.",
          correcta: false,
          retro:
            "El archivo deja los pasos para que alguien los revise. No reemplaza a quien los lee. Vuelve a Beneficios y mira qué quedó revisable.",
        },
      ]}
    />
  );
}

export function Actividad4() {
  return (
    <Opciones
      clave="a4"
      repaso="limitaciones"
      caso="Kaufmann y colegas (2024) parten de una advertencia: el propio proceso de verificación puede contener errores. Por eso sus herramientas generan certificados y otros programas los revisan."
      enunciado="¿Qué límite reconoce ese punto de partida?"
      opciones={[
        {
          id: "a",
          etiqueta: "A. Que la verificación formal no sirve en un posgrado, porque la herramienta también se equivoca.",
          correcta: false,
          retro:
            "El artículo no la descarta. Agrega certificados y comprobadores para poder confiar en el resultado. Vuelve a Limitaciones.",
        },
        {
          id: "b",
          etiqueta: "B. Que estos sistemas todavía no aparecen en la literatura.",
          correcta: false,
          retro:
            "Es falso. Kaufmann (2022), Benzmüller y Scott (2020) y este mismo artículo están publicados. El límite es otro. Vuelve a Limitaciones.",
        },
        {
          id: "c",
          etiqueta: "C. Que el veredicto de la herramienta no basta: hace falta una revisión independiente y quien sepa leerla.",
          correcta: true,
          retro:
            "Nombraste el límite que sí se sostiene con el caso: herramienta especializada, revisión independiente y una persona formada para leer la prueba.",
        },
      ]}
    />
  );
}

export function Actividad5() {
  return (
    <Serie
      clave="a5"
      repaso="validacion"
      enunciado="¿Cuenta como validación?"
      si="Sí cuenta"
      no="No cuenta"
      retroBien="Separaste lo que se puede revisar de lo que solo da confianza."
      tarjetas={[
        {
          texto: "El sistema responde «teorema demostrado» con total seguridad.",
          cuenta: false,
          retro: "Un tono seguro no deja pasos que otra persona pueda revisar.",
        },
        {
          texto: "La prueba queda dentro de Isabelle/HOL y otra persona puede recorrerla.",
          fuente: "Schlichtkrull y colegas (2020)",
          cuenta: true,
          retro: "Los pasos quedan para recorrerlos. Eso es validar.",
        },
        {
          texto: "La herramienta entrega un certificado y un comprobador independiente lo revisa.",
          fuente: "Kaufmann (2022)",
          cuenta: true,
          retro: "La comprobación la hace otro programa, por fuera de la herramienta que produjo el resultado.",
        },
        {
          texto: "El informe que entrega el sistema tiene cuarenta páginas.",
          cuenta: false,
          retro: "La longitud del texto no es una comprobación.",
        },
        {
          texto: "La máquina comprueba cada paso de la prueba que escribe el estudiante.",
          fuente: "Lund y Villadsen (2024)",
          cuenta: true,
          retro: "Cada paso queda comprobado y, además, esa revisión se usa para enseñar.",
        },
        {
          texto: "Un colega dice que confía en la herramienta porque es muy conocida.",
          cuenta: false,
          retro: "Es confianza en la herramienta, no una revisión de la prueba.",
        },
      ]}
    />
  );
}

export function Actividad6() {
  return (
    <Frase
      clave="a6"
      repaso="caso"
      pregunta="¿Qué revisarías antes de usar el resultado de Álvez y colegas (2019) en un trabajo de posgrado?"
    />
  );
}
