export type DatosPantalla = {
  n: number;
  titulo: string;
  seccion: string;
  voz: string;
};

export const PANTALLAS: DatosPantalla[] = [
  {
    n: 1,
    titulo: "Portada",
    seccion: "Inicio",
    voz: "¡Hola! Soy tu guía digital. Mi misión es acompañarte en este recorrido. Vamos a ver qué ocurre cuando un sistema de inteligencia artificial ayuda a formalizar conocimiento científico: qué beneficio queda documentado, qué limitación aparece y cómo se sabe que un resultado quedó validado. También verás qué de eso puedes apropiar en tu posgrado, en una universidad pública. Este contenido es interactivo: podrás avanzar con las flechas, regresar para repasar, abrir el menú y responder actividades con retroalimentación. ¿Listo para comenzar? Pulsa Iniciar.",
  },
  {
    n: 2,
    titulo: "Resultado de aprendizaje y población",
    seccion: "Primera entrada",
    voz: "En esta pantalla hay dos tarjetas. Abre primero Resultado. Ahí está lo que vas a demostrar al terminar: analizar un caso, no memorizar una lista. Luego abre Población. Este recorrido es para estudiantes de este posgrado. Cuando termines las dos, pulsa Seguir.",
  },
  {
    n: 3,
    titulo: "Menú",
    seccion: "Navegación",
    voz: "Este es el menú. No tienes que seguir un único camino. Elige un módulo o entra a la evaluación cuando quieras repasar. Cada módulo trae una actividad. Después de responder, verás por qué la respuesta sirve o por qué no. Si prefieres el recorrido seguido, pulsa la flecha.",
  },
  {
    n: 4,
    titulo: "Qué significa formalizar",
    seccion: "Módulo 1 · Formalizar",
    voz: "Bienvenido al módulo sobre qué significa formalizar. Al terminar esta pantalla podrás explicar la diferencia entre un argumento suelto y una prueba que otra persona puede recorrer. Mira la infografía de izquierda a derecha y lee el aviso del final. Los casos de Jensen y colegas, de Sun y Yu, y de Lund y Villadsen muestran esa idea en sistemas reales. La actividad está en la siguiente pantalla.",
  },
  {
    n: 5,
    titulo: "Actividad 1. Ordena los pasos",
    seccion: "Módulo 1 · Formalizar",
    voz: "Aquí hay cuatro pasos desordenados. Cuentan el camino de un resultado, desde que alguien lo afirma hasta que queda aceptado. Usa las flechas de cada paso para subirlo o bajarlo y pulsa Comprobar. Fíjate bien en cuál dejas de último. Si te equivocas, verás qué pasos están fuera de lugar. Si aciertas, pulsa Seguir.",
  },
  {
    n: 6,
    titulo: "Tres criterios para leer un caso",
    seccion: "Módulo 2 · Criterios",
    voz: "Bienvenido al módulo de los tres criterios. Al terminar podrás separar, en un caso, qué se gana, qué cuesta y cómo se comprueba. Abre las tres columnas y después los botones de Isabelle y de Coq. Esos sistemas registran una prueba. No buscan artículos. Si una columna se te queda vacía, el análisis todavía no está listo. La actividad está en la siguiente pantalla.",
  },
  {
    n: 7,
    titulo: "Actividad 2. Clasifica seis hallazgos",
    seccion: "Módulo 2 · Criterios",
    voz: "Estos seis hallazgos salen de los artículos. Lleva cada uno a su columna. No te guíes por el autor, porque un mismo artículo puede traer un beneficio y una limitación. Mira si la frase habla de lo que se gana, de lo que cuesta o de cómo se comprueba. Si alguna queda mal, recibes una pista y solo mueves esa. Si aciertas, pulsa Seguir.",
  },
  {
    n: 8,
    titulo: "Beneficios",
    seccion: "Módulo 3 · Beneficios",
    voz: "Bienvenido al módulo de beneficios. Al terminar podrás decir qué beneficio sí documentan los casos y cuál no está en los artículos. Lee las fichas de Jensen y colegas, de Sun y Yu, y de Schlichtkrull y colegas. Fíjate en qué quedó revisable en Isabelle y en Coq. El video muestra a un autor de Isabelle. No lo uses como si fuera el resultado de esos artículos. Luego pasa a la actividad.",
  },
  {
    n: 9,
    titulo: "Actividad 3. ¿Qué se puede citar?",
    seccion: "Módulo 3 · Beneficios",
    voz: "Lee el caso de Sun y Yu antes de mirar las opciones. Elige el beneficio que sí puedes citar con ese artículo, no el que suena más grande. Si marcas que el sistema descubrió algo nuevo o que reemplaza a quien estudia, la retroalimentación te dice por qué no se sostiene y te devuelve a la pantalla 8.",
  },
  {
    n: 10,
    titulo: "Limitaciones",
    seccion: "Módulo 4 · Limitaciones",
    voz: "Bienvenido al módulo de limitaciones. Al terminar podrás nombrar el límite real de estos sistemas: formación, herramienta y una persona que lea la prueba. Lee a Kaufmann y a Benzmüller y Scott. No busques un fracaso del programa. Busca qué hace falta para usar el resultado con criterio. La literatura sí existe. Lo que no se puede saltar es la supervisión. Luego pasa a la actividad.",
  },
  {
    n: 11,
    titulo: "Actividad 4. ¿Cuál es el límite?",
    seccion: "Módulo 4 · Limitaciones",
    voz: "Lee el caso de Kaufmann y colegas. Ellos mismos advierten que la verificación puede contener errores. Elige qué límite reconoce esa advertencia. Responde con el caso, no con una opinión general. Si dices que la literatura no existe o que la verificación no sirve, vuelves a la pantalla 10.",
  },
  {
    n: 12,
    titulo: "Validación",
    seccion: "Módulo 5 · Validación",
    voz: "Bienvenido al módulo de validación. Al terminar podrás decir qué cuenta como comprobación y qué es solo confianza en la herramienta. Lee el caso de Lund y Villadsen. Es el más cercano a una clase: la prueba se revisa mientras se aprende. Luego compara con Schlichtkrull y colegas. En los dos, los pasos quedan para recorrerlos. La actividad está en la siguiente pantalla.",
  },
  {
    n: 13,
    titulo: "Actividad 5. ¿Cuenta como validación?",
    seccion: "Módulo 5 · Validación",
    voz: "Vas a ver seis situaciones, una por una. En cada una decide si cuenta o no cuenta como validación, y lee la razón antes de pasar a la siguiente. Un tono seguro o un texto largo suenan a validación, y no lo son. Para resolver la actividad necesitas las seis. Si fallas alguna, puedes repetir la serie.",
  },
  {
    n: 14,
    titulo: "Caso guiado",
    seccion: "Módulo 6 · Caso",
    voz: "Bienvenido al caso guiado. Álvez y colegas trabajan con ontologías formales, no con un texto cualquiera. Antes de seguir, escribe en el cuadro qué beneficio crees que reporta el artículo. Luego compara tu nota con las tres columnas: fallos que la prueba deja ver, un alcance limitado y una prueba que se inspecciona. La frase de la actividad va en la siguiente pantalla.",
  },
  {
    n: 15,
    titulo: "Actividad 6. Una frase",
    seccion: "Módulo 6 · Caso",
    voz: "Escribe una sola frase. No resumas el artículo. Di qué revisarías tú. Si nombras la prueba, el alcance o a la persona que supervisa, puedes seguir. Si solo dices que la herramienta ya lo resolvió, vuelve a la pantalla 14.",
  },
  {
    n: 16,
    titulo: "Apropiación",
    seccion: "Módulo 7 · Apropiación",
    voz: "Bienvenido al módulo de apropiación. Al terminar vas a elegir qué sí puedes usar en tu posgrado y qué no depende de un gran laboratorio. Lee las cuatro prácticas que sí caben y las tres que no debes prometer. Luego elige A o B y escribe dos líneas. No te pido que diseñes un programa. Te pido una decisión de formación.",
  },
  {
    n: 17,
    titulo: "Evaluación",
    seccion: "Evaluación final",
    voz: "Esta es la evaluación. Son ocho preguntas, una por vista, y cada una parte de un caso. Lee el caso, elige una opción y lee la razón antes de pasar a la siguiente. El logro es siete de ocho, junto con la justificación que escribiste en el módulo de apropiación. Al terminar ves el puntaje. Si la repites, los casos y las preguntas cambian.",
  },
  {
    n: 18,
    titulo: "Cierre",
    seccion: "Conclusión",
    voz: "Antes de salir, marca la lista. Si una casilla no te sale, vuelve solo a ese módulo. No hace falta repetir todo el recurso. Quédate con esta idea: una propuesta automática sirve en tu formación cuando puedes revisar la prueba y decir su límite. Las referencias y los créditos están en los botones.",
  },
  {
    n: 19,
    titulo: "Referencias",
    seccion: "Fuentes",
    voz: "Aquí están las fuentes de los casos, del video y de la licencia del recurso. Cada una tiene su enlace.",
  },
  {
    n: 20,
    titulo: "Créditos y licencia",
    seccion: "Créditos",
    voz: "Aquí están los créditos, los metadatos y la licencia del recurso. Si usas este material, cita al autor y conserva la misma licencia.",
  },
];

export const TOTAL = PANTALLAS.length;

export function buscar(n: number): DatosPantalla | undefined {
  return PANTALLAS.find((p) => p.n === n);
}

export function ruta(n: number): string {
  return n === 1 ? "/" : `/pantalla/${n}`;
}

export type EntradaMenu = { etiqueta: string; n: number; actividad?: string };

export const MENU: { grupo: string; entradas: EntradaMenu[] }[] = [
  { grupo: "Inicio", entradas: [{ etiqueta: "Inicio", n: 1 }] },
  {
    grupo: "Módulos",
    entradas: [
      { etiqueta: "Formalizar", n: 4, actividad: "a1" },
      { etiqueta: "Criterios", n: 6, actividad: "a2" },
      { etiqueta: "Beneficios", n: 8, actividad: "a3" },
      { etiqueta: "Limitaciones", n: 10, actividad: "a4" },
      { etiqueta: "Validación", n: 12, actividad: "a5" },
      { etiqueta: "Caso", n: 14, actividad: "a6" },
      { etiqueta: "Apropiación", n: 16, actividad: "a7" },
    ],
  },
  {
    grupo: "Cierre del recorrido",
    entradas: [
      { etiqueta: "Evaluación", n: 17 },
      { etiqueta: "Cierre", n: 18 },
      { etiqueta: "Referencias", n: 19 },
      { etiqueta: "Créditos", n: 20 },
    ],
  },
];
