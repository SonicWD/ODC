// Recorrido del recurso. El orden de esta lista es el orden de Seguir y Atrás.
// Para agregar una pantalla basta con sumar una entrada aquí y su contenido en components/Pantalla.tsx.

export type DatosPantalla = {
  /** Nombre en la dirección: "/beneficios/". La portada vive en "/". */
  id: string;
  titulo: string;
  /** Rótulo sobre el título. */
  seccion: string;
  /** Nombre corto para la cabecera. */
  corto: string;
  /** Guion del guía. También es la transcripción. */
  voz: string;
};

export const PANTALLAS: DatosPantalla[] = [
  {
    id: "portada",
    titulo: "Portada",
    seccion: "Inicio",
    corto: "Inicio",
    voz: "¡Hola! Soy tu guía digital. Mi misión es acompañarte en este recorrido. Vamos a ver qué ocurre cuando un sistema de inteligencia artificial ayuda a formalizar conocimiento científico: qué beneficio queda documentado, qué limitación aparece y cómo se sabe que un resultado quedó validado. También verás qué de eso puedes apropiar en tu posgrado, en una universidad pública. Este contenido es interactivo: podrás avanzar con las flechas, regresar para repasar, abrir el menú y responder actividades con retroalimentación. ¿Listo para comenzar? Pulsa Iniciar.",
  },
  {
    id: "resultado",
    titulo: "Resultado de aprendizaje y población",
    seccion: "Primera entrada",
    corto: "Resultado y población",
    voz: "En esta pantalla hay dos tarjetas. Abre primero Resultado. Ahí está lo que vas a demostrar al terminar: analizar un caso, no memorizar una lista. Luego abre Población. Este recorrido es para estudiantes de este posgrado. Cuando termines las dos, pulsa Seguir.",
  },
  {
    id: "menu",
    titulo: "Menú",
    seccion: "Navegación",
    corto: "Menú",
    voz: "Este es el menú. No tienes que seguir un único camino. Elige un módulo o entra a la evaluación cuando quieras repasar. Cada módulo trae una actividad. Después de responder, verás por qué la respuesta sirve o por qué no. Si prefieres el recorrido seguido, pulsa Seguir.",
  },
  {
    id: "problema",
    titulo: "Sonar bien no es demostrar",
    seccion: "Introducción · El problema",
    corto: "Introducción",
    voz: "Empecemos por el problema. Hoy un sistema de inteligencia artificial puede escribir un texto científico que suena seguro. Eso no quiere decir que el resultado se sostenga. En esta pantalla hay dos evidencias. La primera es una advertencia publicada en 2025: estos sistemas ya no solo interpretan el conocimiento, también actúan sobre él, y eso aumenta la preocupación por la reproducibilidad y la auditoría. La segunda es un dato de la revisión de literatura que sustenta este recurso: de treinta estudios, diez trabajan con asistentes de demostración. Pulsa cada barra de la gráfica para ver qué reúne. Con esos diez casos vas a trabajar. Luego pasa a la actividad.",
  },
  {
    id: "problema-actividad",
    titulo: "Dos respuestas, un mismo resultado",
    seccion: "Introducción · Actividad",
    corto: "Introducción",
    voz: "Aquí hay dos respuestas al mismo resultado: la suma de dos números pares es par. Pulsa cada fragmento de la primera y cada paso de la segunda. Verás qué se puede comprobar y qué no. Después responde la pregunta. No importa cuál suena mejor. Importa cuál puede revisar otra persona.",
  },
  {
    id: "formalizar",
    titulo: "Qué significa formalizar",
    seccion: "Formalizar",
    corto: "Formalizar",
    voz: "Bienvenido al módulo sobre qué significa formalizar. Al terminar esta pantalla podrás explicar la diferencia entre un argumento suelto y una prueba que otra persona puede recorrer. Recorre la infografía de izquierda a derecha y lee el aviso del final. Los casos de Jensen y colegas, de Sun y Yu, y de Lund y Villadsen muestran esa idea en sistemas reales. La actividad está en la siguiente pantalla.",
  },
  {
    id: "formalizar-actividad",
    titulo: "Ordena los pasos",
    seccion: "Formalizar · Actividad",
    corto: "Formalizar",
    voz: "Aquí hay cuatro pasos desordenados. Cuentan el camino de un resultado, desde que alguien lo afirma hasta que queda aceptado. Arrastra cada paso por su agarradera, o usa las flechas para subirlo o bajarlo, y pulsa Comprobar. Fíjate bien en cuál dejas de último. Si te equivocas, verás qué pasos están fuera de lugar. Si aciertas, pulsa Seguir.",
  },
  {
    id: "criterios",
    titulo: "Tres criterios para leer un caso",
    seccion: "Criterios",
    corto: "Criterios",
    voz: "Bienvenido al módulo de los tres criterios. Al terminar podrás separar, en un caso, qué se gana, qué cuesta y cómo se comprueba. Abre las tres columnas y después los botones de Isabelle y de Coq. Esos sistemas registran una prueba. No buscan artículos. Si una columna se te queda vacía, el análisis todavía no está listo. La actividad está en la siguiente pantalla.",
  },
  {
    id: "criterios-actividad",
    titulo: "Clasifica seis hallazgos",
    seccion: "Criterios · Actividad",
    corto: "Criterios",
    voz: "Estos seis hallazgos salen de los artículos. Lleva cada uno a su columna. Puedes arrastrarlo, o pulsarlo y elegir la columna con los botones. No te guíes por el autor, porque un mismo artículo puede traer un beneficio y una limitación. Mira si la frase habla de lo que se gana, de lo que cuesta o de cómo se comprueba. Si alguna queda mal, recibes una pista y solo mueves esa. Si aciertas, pulsa Seguir.",
  },
  {
    id: "beneficios",
    titulo: "Beneficios",
    seccion: "Beneficios",
    corto: "Beneficios",
    voz: "Bienvenido al módulo de beneficios. Al terminar podrás decir qué beneficio sí documentan los casos y cuál no está en los artículos. Lee las fichas de Jensen y colegas, de Sun y Yu, y de Schlichtkrull y colegas. Fíjate en qué quedó revisable en Isabelle y en Coq. El video muestra a un autor de Isabelle. No lo uses como si fuera el resultado de esos artículos. Luego pasa a la actividad.",
  },
  {
    id: "beneficios-actividad",
    titulo: "¿Qué se puede citar?",
    seccion: "Beneficios · Actividad",
    corto: "Beneficios",
    voz: "Lee el caso de Sun y Yu antes de mirar las opciones. Elige el beneficio que sí puedes citar con ese artículo, no el que suena más grande. Si marcas que el sistema descubrió algo nuevo o que reemplaza a quien estudia, la retroalimentación te dice por qué no se sostiene y te devuelve al módulo de beneficios.",
  },
  {
    id: "limitaciones",
    titulo: "Limitaciones",
    seccion: "Limitaciones",
    corto: "Limitaciones",
    voz: "Bienvenido al módulo de limitaciones. Al terminar podrás nombrar el límite real de estos sistemas: formación, herramienta y una persona que lea la prueba. Lee a Kaufmann y a Benzmüller y Scott. No busques un fracaso del programa. Busca qué hace falta para usar el resultado con criterio. La literatura sí existe. Lo que no se puede saltar es la supervisión. Luego pasa a la actividad.",
  },
  {
    id: "limitaciones-actividad",
    titulo: "¿Cuál es el límite?",
    seccion: "Limitaciones · Actividad",
    corto: "Limitaciones",
    voz: "Lee el caso de Kaufmann y colegas. Ellos mismos advierten que la verificación puede contener errores. Elige qué límite reconoce esa advertencia. Responde con el caso, no con una opinión general. Si dices que la literatura no existe o que la verificación no sirve, vuelves al módulo de limitaciones.",
  },
  {
    id: "validacion",
    titulo: "Validación",
    seccion: "Validación",
    corto: "Validación",
    voz: "Bienvenido al módulo de validación. Al terminar podrás decir qué cuenta como comprobación y qué es solo confianza en la herramienta. Lee el caso de Lund y Villadsen: plantean usar pruebas comprobadas por la máquina para enseñar lógica. Luego compara con Schlichtkrull y colegas. En los dos, los pasos quedan para recorrerlos. La actividad está en la siguiente pantalla.",
  },
  {
    id: "validacion-actividad",
    titulo: "¿Cuenta como validación?",
    seccion: "Validación · Actividad",
    corto: "Validación",
    voz: "Vas a ver seis situaciones, una por una. En cada una decide si cuenta o no cuenta como validación. Puedes deslizar la tarjeta hacia un lado o usar los botones. Lee la razón antes de pasar a la siguiente. Un tono seguro o un texto largo suenan a validación, y no lo son. Para resolver la actividad necesitas las seis. Si fallas alguna, puedes repetir la serie.",
  },
  {
    id: "galeria",
    titulo: "Diez casos para leer",
    seccion: "Explorar · Galería",
    corto: "Galería",
    voz: "Aquí tienes diez casos de la matriz. Abre cada ficha. En todas verás beneficio, limitación y validación. No busques memorizarlos. Busca el hábito de leer un caso con esas tres columnas. Cuando termines, pasa al laboratorio.",
  },
  {
    id: "laboratorio",
    titulo: "Laboratorio de columnas",
    seccion: "Explorar · Laboratorio",
    corto: "Laboratorio",
    voz: "Vas a clasificar cuatro hallazgos. En cada uno elige si es beneficio, limitación o validación, y lee la razón. Si fallas alguno, puedes repetir el laboratorio. Luego entra al caso guiado de Álvez y colegas.",
  },
  {
    id: "caso",
    titulo: "Caso guiado",
    seccion: "Caso",
    corto: "Caso",
    voz: "Bienvenido al caso guiado. Álvez y colegas trabajan con ontologías formales, no con un texto cualquiera. Antes de seguir, escribe en el cuadro qué beneficio crees que reporta el artículo. Luego compara tu nota con las tres columnas: fallos que la prueba deja ver, un alcance limitado y una prueba que se inspecciona. La frase de la actividad va en la siguiente pantalla.",
  },
  {
    id: "caso-actividad",
    titulo: "Una frase sobre el caso",
    seccion: "Caso · Actividad",
    corto: "Caso",
    voz: "Escribe una sola frase. No resumas el artículo. Di qué revisarías tú. Si nombras la prueba, el alcance o a la persona que supervisa, puedes seguir. Si solo dices que la herramienta ya lo resolvió, vuelve al caso guiado.",
  },
  {
    id: "apropiacion",
    titulo: "Apropiación",
    seccion: "Apropiación",
    corto: "Apropiación",
    voz: "Bienvenido al módulo de apropiación. Al terminar vas a elegir qué sí puedes usar en tu posgrado y qué no depende de un gran laboratorio. Lee las cuatro prácticas que sí caben y las tres que no debes prometer. Luego elige A o B y escribe dos líneas. No te pido que diseñes un programa. Te pido una decisión de formación.",
  },
  {
    id: "evaluacion",
    titulo: "Evaluación",
    seccion: "Evaluación final",
    corto: "Evaluación",
    voz: "Esta es la evaluación. Son ocho preguntas, una por vista, y cada una parte de un caso. Lee el caso, elige una opción y lee la razón antes de pasar a la siguiente. El logro es siete de ocho, junto con la justificación que escribiste en el módulo de apropiación. Al terminar ves el puntaje. Si la repites, los casos y las preguntas cambian.",
  },
  {
    id: "cierre",
    titulo: "Cierre",
    seccion: "Conclusión",
    corto: "Cierre",
    voz: "Antes de salir, marca la lista. Si una casilla no te sale, vuelve solo a ese módulo. No hace falta repetir todo el recurso. Quédate con esta idea: una propuesta automática sirve en tu formación cuando puedes revisar la prueba y decir su límite. Las referencias y los créditos están en los botones.",
  },
  {
    id: "referencias",
    titulo: "Referencias",
    seccion: "Fuentes",
    corto: "Referencias",
    voz: "Aquí están las fuentes de los casos, del video y de la licencia del recurso. Cada una tiene su enlace.",
  },
  {
    id: "creditos",
    titulo: "Créditos y licencia",
    seccion: "Créditos",
    corto: "Créditos",
    voz: "Aquí están los créditos, los metadatos y la licencia del recurso. Si usas este material, cita al autor y conserva la misma licencia.",
  },
];

export const TOTAL = PANTALLAS.length;
export const PORTADA = PANTALLAS[0].id;

export function buscar(id: string): DatosPantalla | undefined {
  return PANTALLAS.find((p) => p.id === id);
}

/** Posición en el recorrido, desde 0. Devuelve -1 si la pantalla no existe. */
export function indice(id: string): number {
  return PANTALLAS.findIndex((p) => p.id === id);
}

export function ruta(id: string): string {
  return id === PORTADA ? "/" : `/${id}`;
}

/** Pantalla que corresponde a una dirección del sitio, o undefined si la dirección no es una pantalla. */
export function pantallaDe(camino: string): DatosPantalla | undefined {
  const nombre = camino.replace(/^\/|\/$/g, "");
  return buscar(nombre === "" ? PORTADA : nombre);
}

export type EntradaMenu = { etiqueta: string; id: string; actividad?: string };

export const MENU: { grupo: string; entradas: EntradaMenu[] }[] = [
  {
    grupo: "Inicio",
    entradas: [
      { etiqueta: "Portada", id: "portada" },
      { etiqueta: "Resultado y población", id: "resultado" },
    ],
  },
  {
    grupo: "Módulos",
    entradas: [
      { etiqueta: "Introducción", id: "problema", actividad: "a0" },
      { etiqueta: "Formalizar", id: "formalizar", actividad: "a1" },
      { etiqueta: "Criterios", id: "criterios", actividad: "a2" },
      { etiqueta: "Beneficios", id: "beneficios", actividad: "a3" },
      { etiqueta: "Limitaciones", id: "limitaciones", actividad: "a4" },
      { etiqueta: "Validación", id: "validacion", actividad: "a5" },
      { etiqueta: "Galería de casos", id: "galeria" },
      { etiqueta: "Laboratorio", id: "laboratorio", actividad: "a8" },
      { etiqueta: "Caso", id: "caso", actividad: "a6" },
      { etiqueta: "Apropiación", id: "apropiacion", actividad: "a7" },
    ],
  },
  {
    grupo: "Cierre del recorrido",
    entradas: [
      { etiqueta: "Evaluación", id: "evaluacion" },
      { etiqueta: "Cierre", id: "cierre" },
      { etiqueta: "Referencias", id: "referencias" },
      { etiqueta: "Créditos", id: "creditos" },
    ],
  },
];
