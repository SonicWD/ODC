// Banco de la evaluación final (pantalla 17).
//
// Son ocho ítems por forma, uno por cada parte del resultado de aprendizaje, y hay dos formas
// paralelas: quien repite la evaluación recibe la otra. Cada ítem parte de un caso. Los datos
// de los casos salen de los resúmenes de los artículos, tal como están en la matriz de la revisión.

export type OpcionItem = { id: string; texto: string; retro: string };

export type Item = {
  /** Parte del resultado de aprendizaje que evalúa. */
  criterio: string;
  caso: string;
  pregunta: string;
  opciones: OpcionItem[];
  /** id de la opción correcta. */
  correcta: string;
  /** Pantalla a la que se envía a repasar si falla. */
  repaso: string;
};

const FORMA_A: Item[] = [
  {
    criterio: "Formalizar",
    caso: "Para un trabajo del posgrado, Ana pega un párrafo de un chatbot que explica con claridad la teoría de conjuntos. Sun y Yu (2020) escribieron esa teoría en Coq: ocho axiomas, un esquema de axiomas, 62 definiciones y 148 teoremas o corolarios.",
    pregunta: "¿Cuál de los dos resultados quedó formalizado?",
    opciones: [
      {
        id: "a",
        texto: "El de Ana, porque el párrafo es claro y está bien redactado.",
        retro: "Un párrafo claro sigue siendo un argumento suelto: nadie puede comprobar cada paso.",
      },
      {
        id: "b",
        texto: "El de Sun y Yu, porque cada prueba quedó en un lenguaje que otra persona puede comprobar.",
        retro: "Formalizar es dejar símbolos, reglas y una secuencia que se puede comprobar. Eso es lo que quedó en Coq.",
      },
      {
        id: "c",
        texto: "Los dos, porque ambos explican el mismo tema.",
        retro: "El tema no formaliza. Lo que cuenta es que los pasos queden en un lenguaje comprobable.",
      },
    ],
    correcta: "b",
    repaso: "formalizar",
  },
  {
    criterio: "Tres criterios",
    caso: "Kaufmann (2022) escribe que verificar circuitos multiplicadores todavía exige una cantidad importante de trabajo manual.",
    pregunta: "¿En qué columna del análisis va ese hallazgo?",
    opciones: [
      {
        id: "a",
        texto: "Beneficio: dice lo que el método permite hacer.",
        retro: "La frase no dice qué se gana. Dice qué cuesta usar el método.",
      },
      {
        id: "b",
        texto: "Validación: dice cómo se comprueba el resultado.",
        retro: "La frase no describe una comprobación. Describe el esfuerzo que exige el método.",
      },
      {
        id: "c",
        texto: "Limitación: dice lo que cuesta usar el método.",
        retro: "El trabajo manual es un costo. En el análisis va como limitación.",
      },
    ],
    correcta: "c",
    repaso: "criterios",
  },
  {
    criterio: "Beneficios",
    caso: "Jensen y colegas (2018) certifican en Isabelle/HOL la corrección de un demostrador de primer orden. Su motivación es enseñar cómo funcionan y cómo se usan estos demostradores.",
    pregunta: "¿Qué beneficio se puede citar con ese artículo?",
    opciones: [
      {
        id: "a",
        texto: "Queda un demostrador con su corrección probada y con un código que se puede estudiar.",
        retro: "Eso documenta el artículo: el demostrador permite estudiar código concreto y una verificación formal de su corrección.",
      },
      {
        id: "b",
        texto: "El demostrador encuentra pruebas que ninguna persona podría encontrar.",
        retro: "El artículo no afirma eso. Certifica que el demostrador es correcto.",
      },
      {
        id: "c",
        texto: "Quien investiga ya no necesita aprender lógica.",
        retro: "Es lo contrario: los autores lo hicieron para enseñar cómo funcionan estos demostradores.",
      },
    ],
    correcta: "a",
    repaso: "beneficios",
  },
  {
    criterio: "Limitaciones",
    caso: "Benzmüller y Scott (2020) automatizan una lógica libre dentro de HOL y la prueban en teoría de categorías. Aclaran que no buscan resultados nuevos en esa área, sino mostrar una forma de usar el razonamiento automático.",
    pregunta: "¿Qué límite debes decir si citas este caso?",
    opciones: [
      {
        id: "a",
        texto: "Que no sirve, porque no produjo teoremas nuevos.",
        retro: "El caso sí aporta: muestra un método y, de paso, dejó ver errores menores en un libro de texto. El límite es de alcance.",
      },
      {
        id: "b",
        texto: "Que el aporte es un método sobre una lógica precisa, no resultados nuevos ni cualquier texto.",
        retro: "Ese es el alcance que declaran los autores. Decirlo evita tratar cualquier texto académico como si ya estuviera formalizado.",
      },
      {
        id: "c",
        texto: "Que, al estar automatizado, ya no hace falta revisar nada.",
        retro: "La automatización no es aceptación automática. La revisión sigue siendo parte del conocimiento.",
      },
    ],
    correcta: "b",
    repaso: "limitaciones",
  },
  {
    criterio: "Validación",
    caso: "Un sistema responde «teorema demostrado» y entrega un informe largo y seguro. Otro deja la prueba dentro de Isabelle/HOL, donde se puede recorrer paso a paso.",
    pregunta: "¿Cuál de los dos resultados está validado?",
    opciones: [
      {
        id: "a",
        texto: "El primero, porque el informe es extenso y no muestra dudas.",
        retro: "Un tono seguro y un texto largo no dejan pasos para revisar.",
      },
      {
        id: "b",
        texto: "Ninguno, porque un sistema automático no puede validar nada.",
        retro: "La validación no depende de quién propone la prueba, sino de que los pasos queden para revisarlos.",
      },
      {
        id: "c",
        texto: "El segundo, porque otra persona puede recorrer los pasos.",
        retro: "Validar es poder revisar los pasos. Así ocurre en Schlichtkrull y colegas (2020).",
      },
    ],
    correcta: "c",
    repaso: "validacion",
  },
  {
    criterio: "Caso",
    caso: "Álvez y colegas (2019) generan pruebas automáticas para ontologías escritas en lógica de primer orden. Encontraron defectos que estaban ocultos y, al corregirlos, obtuvieron una versión mejorada de la ontología Adimen-SUMO.",
    pregunta: "¿Cuál de estos análisis del caso está completo y se sostiene?",
    opciones: [
      {
        id: "a",
        texto: "Beneficio: deja ver defectos ocultos. Limitación: cubre ontologías formales. Validación: cada prueba se puede inspeccionar.",
        retro: "Las tres columnas están llenas y cada una sale del artículo.",
      },
      {
        id: "b",
        texto: "Beneficio: corrige cualquier base de conocimiento. Limitación: ninguna. Validación: el proceso es automático.",
        retro: "El artículo no habla de cualquier base de conocimiento, y que un proceso sea automático no lo valida.",
      },
      {
        id: "c",
        texto: "Beneficio: es un método rápido. Limitación: es difícil de usar. Validación: los autores son expertos.",
        retro: "Ninguna de las tres sale del artículo. Validar no es apelar a la autoridad de los autores, sino poder inspeccionar la prueba.",
      },
    ],
    correcta: "a",
    repaso: "caso",
  },
  {
    criterio: "Apropiación",
    caso: "En un curso del posgrado, un grupo entrega un resultado «verificado con inteligencia artificial» y adjunta solo la respuesta del sistema.",
    pregunta: "¿Qué pedirías antes de aceptarlo?",
    opciones: [
      {
        id: "a",
        texto: "Nada más: si lo verificó un sistema, ya está aceptado.",
        retro: "Lo que entrega el sistema es una propuesta. Falta que otra persona pueda revisarla.",
      },
      {
        id: "b",
        texto: "Que lo repitan en un laboratorio con más cómputo.",
        retro: "Más cómputo no vuelve revisable un resultado. Eso aplaza el criterio en lugar de aplicarlo.",
      },
      {
        id: "c",
        texto: "La prueba, en una forma que otra persona pueda recorrer, y el límite del resultado.",
        retro: "Eso es lo que sí cabe en el posgrado: exigir una prueba revisable y decir el límite.",
      },
    ],
    correcta: "c",
    repaso: "apropiacion",
  },
  {
    criterio: "Resultado de aprendizaje",
    caso: "Una compañera te pregunta para qué le sirve este recurso antes de su trabajo final.",
    pregunta: "¿Qué puede hacer quien lo termina?",
    opciones: [
      {
        id: "a",
        texto: "Hacer una revisión de literatura con su diagrama de flujo.",
        retro: "La revisión de literatura fue el trabajo previo con el que se eligieron los casos. No es un módulo de este recurso.",
      },
      {
        id: "b",
        texto: "Analizar un caso: qué beneficio documenta, qué límite tiene y cómo se valida.",
        retro: "Ese es el resultado de aprendizaje: analizar beneficios, limitaciones y criterios de validación.",
      },
      {
        id: "c",
        texto: "Programar pruebas en Isabelle o en Coq.",
        retro: "El recurso muestra para qué sirven esos asistentes. No enseña a programar en ellos.",
      },
    ],
    correcta: "b",
    repaso: "resultado",
  },
];

const FORMA_B: Item[] = [
  {
    criterio: "Formalizar",
    caso: "Jensen y colegas (2018) describen la prueba declarativa: cada paso se declara, de forma parecida a las oraciones de una prueba cuidadosa en papel.",
    pregunta: "¿Qué hace que esa prueba sea formal y no un argumento suelto?",
    opciones: [
      {
        id: "a",
        texto: "Que cada paso queda escrito con reglas y se puede comprobar uno por uno.",
        retro: "Formalizar es declarar símbolos, reglas y una secuencia que se puede comprobar.",
      },
      {
        id: "b",
        texto: "Que usa el vocabulario técnico de la lógica.",
        retro: "El vocabulario no formaliza. Un párrafo técnico puede seguir sin pasos comprobables.",
      },
      {
        id: "c",
        texto: "Que salió publicada en una revista indexada.",
        retro: "La publicación no reemplaza la revisión de los pasos.",
      },
    ],
    correcta: "a",
    repaso: "formalizar",
  },
  {
    criterio: "Tres criterios",
    caso: "Kaufmann (2022) señala que los certificados que entrega su herramienta se pueden revisar con comprobadores independientes.",
    pregunta: "¿En qué columna del análisis va ese hallazgo?",
    opciones: [
      {
        id: "a",
        texto: "Validación: dice cómo se comprueba el resultado.",
        retro: "Un comprobador independiente que revisa el certificado es una forma de comprobar. Va como validación.",
      },
      {
        id: "b",
        texto: "Limitación: dice lo que cuesta usar el método.",
        retro: "La frase no habla de un costo ni del alcance. Habla de cómo se revisa el resultado.",
      },
      {
        id: "c",
        texto: "Beneficio: dice lo que el método permite hacer.",
        retro: "La frase no dice qué se gana con verificar el circuito. Dice cómo se comprueba que la verificación es correcta.",
      },
    ],
    correcta: "a",
    repaso: "criterios",
  },
  {
    criterio: "Beneficios",
    caso: "Schlichtkrull y colegas (2020) formalizaron en Isabelle/HOL la primera mitad de un capítulo clásico sobre demostración por resolución.",
    pregunta: "¿Qué beneficio destacan los autores?",
    opciones: [
      {
        id: "a",
        texto: "El capítulo original estaba equivocado y quedó refutado.",
        retro: "El artículo habla de aclarar puntos finos, no de refutar el capítulo.",
      },
      {
        id: "b",
        texto: "Isabelle redactó el capítulo sin intervención de los autores.",
        retro: "El asistente comprueba los pasos. La formalización la escribieron los autores.",
      },
      {
        id: "c",
        texto: "La formalización aclaró puntos finos del capítulo.",
        retro: "Ese es el valor que destacan los autores: el trabajo aclara puntos finos del capítulo y muestra para qué sirve una prueba formal.",
      },
    ],
    correcta: "c",
    repaso: "beneficios",
  },
  {
    criterio: "Limitaciones",
    caso: "Tu grupo propone usar en el proyecto final la verificación de circuitos de Kaufmann (2022), aunque nadie del grupo conoce la herramienta.",
    pregunta: "¿Qué limitación reporta el propio artículo?",
    opciones: [
      {
        id: "a",
        texto: "Que verificar multiplicadores todavía exige una cantidad importante de trabajo manual.",
        retro: "Es el límite que reconoce el autor. Sin alguien formado para ese trabajo y para leer la prueba, el resultado no se integra al curso.",
      },
      {
        id: "b",
        texto: "Que estos sistemas todavía no aparecen en la literatura.",
        retro: "Es falso: el caso está publicado. El límite es el costo de usarlo con criterio.",
      },
      {
        id: "c",
        texto: "Que sus resultados no se pueden comprobar con otra herramienta.",
        retro: "Al contrario: la herramienta entrega certificados que comprobadores independientes pueden revisar.",
      },
    ],
    correcta: "a",
    repaso: "limitaciones",
  },
  {
    criterio: "Validación",
    caso: "Lund y Villadsen (2024) construyen en Isabelle/HOL un demostrador para lógica proposicional y un sistema para escribir pruebas de cálculo de secuentes que la máquina comprueba. Plantean usarlo para enseñar lógica a estudiantes de computación.",
    pregunta: "¿Dónde está la validación en este caso?",
    opciones: [
      {
        id: "a",
        texto: "En que el demostrador resuelve la tarea sin mucho esfuerzo.",
        retro: "Eso es un beneficio, no una forma de comprobar el resultado.",
      },
      {
        id: "b",
        texto: "En que cada prueba queda comprobada por la máquina y se puede revisar.",
        retro: "La validación está en los pasos comprobados. En este caso, además, esa revisión se usa para enseñar.",
      },
      {
        id: "c",
        texto: "En que los estudiantes confían en la herramienta de su universidad.",
        retro: "La confianza en la herramienta no es una revisión de la prueba.",
      },
    ],
    correcta: "b",
    repaso: "validacion",
  },
  {
    criterio: "Caso",
    caso: "Álvez y colegas (2019) prueban ontologías escritas en lógica de primer orden. Un compañero resume el artículo así: «Con este método se puede revisar cualquier texto académico».",
    pregunta: "¿Qué parte del análisis leyó mal?",
    opciones: [
      {
        id: "a",
        texto: "El beneficio: el artículo no reporta defectos encontrados.",
        retro: "Sí los reporta: encontraron defectos ocultos y obtuvieron una versión mejorada de Adimen-SUMO.",
      },
      {
        id: "b",
        texto: "La validación: las pruebas no se pueden inspeccionar.",
        retro: "Sí se pueden: según los autores, cada prueba da pistas sobre la naturaleza del defecto.",
      },
      {
        id: "c",
        texto: "La limitación: el método cubre ontologías formales, no cualquier texto.",
        retro: "El alcance es el de las ontologías en lógica de primer orden. Extenderlo a cualquier texto no sale del artículo.",
      },
    ],
    correcta: "c",
    repaso: "caso",
  },
  {
    criterio: "Apropiación",
    caso: "La universidad no tiene el cómputo de un laboratorio industrial. Un compañero concluye que, entonces, no hay nada que aprender de estos sistemas.",
    pregunta: "¿Qué muestra el caso de Lund y Villadsen (2024)?",
    opciones: [
      {
        id: "a",
        texto: "Que la prueba verificada cabe en una actividad de clase: se apropia el criterio de revisar.",
        retro: "En ese estudio la prueba verificada se usa para enseñar. Exigir una prueba revisable no depende de un gran laboratorio.",
      },
      {
        id: "b",
        texto: "Que tiene razón: sin ese cómputo no se puede empezar.",
        retro: "Esperar el cómputo industrial aplaza el aprendizaje hasta una condición que el programa no controla.",
      },
      {
        id: "c",
        texto: "Que basta con usar un sistema más grande y confiar en su respuesta.",
        retro: "El tamaño del sistema no vuelve revisable su respuesta.",
      },
    ],
    correcta: "a",
    repaso: "apropiacion",
  },
  {
    criterio: "Resultado de aprendizaje",
    caso: "Antes de empezar, un estudiante quiere saber si este recurso le sirve para su proyecto.",
    pregunta: "¿Cuál de estas tareas corresponde al resultado de aprendizaje?",
    opciones: [
      {
        id: "a",
        texto: "Construir la ecuación de búsqueda de una revisión de literatura.",
        retro: "La búsqueda de literatura fue un trabajo previo. No es un módulo de este recurso.",
      },
      {
        id: "b",
        texto: "Verificar un circuito multiplicador con álgebra computacional.",
        retro: "Eso es lo que hace Kaufmann (2022). El recurso enseña a analizar el caso, no a repetirlo.",
      },
      {
        id: "c",
        texto: "Leer un caso publicado y separar beneficio, limitación y validación.",
        retro: "Ese es el resultado de aprendizaje: analizar beneficios, limitaciones y criterios de validación.",
      },
    ],
    correcta: "c",
    repaso: "resultado",
  },
];

const FORMAS = [FORMA_A, FORMA_B];

/** Ítems del intento: los intentos pares usan la forma A y los impares la forma B. */
export function itemsDe(intento: number): Item[] {
  return FORMAS[intento % FORMAS.length];
}

/** Opciones del ítem en el orden en que se muestran. El orden cambia con el intento y con el ítem. */
export function opcionesDe(item: Item, intento: number, indice: number): OpcionItem[] {
  // El doble del índice reparte la opción correcta entre las tres posiciones a lo largo del cuestionario.
  const corte = (intento + 2 * indice) % item.opciones.length;
  return [...item.opciones.slice(corte), ...item.opciones.slice(0, corte)];
}

export function nombreForma(intento: number): string {
  return intento % FORMAS.length === 0 ? "Cuestionario A" : "Cuestionario B";
}
