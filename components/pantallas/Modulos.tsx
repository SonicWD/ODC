"use client";

import { useId, useState } from "react";
import { Aviso, Ficha, Fuente, TresColumnas } from "@/components/Piezas";
import { Ventana } from "@/components/Ventana";
import { MINIMO_PALABRAS, actualizar, contarPalabras, marcarActividad, useProgreso } from "@/lib/progreso";
import { urlDe } from "@/lib/referencias";

/* ---------- Pantalla 4 · Formalizar ---------- */

const PASOS = [
  {
    nombre: "Argumento suelto",
    detalle: "Un resumen o un párrafo convincente. Suena bien, pero nadie puede comprobar cada paso.",
    icono: (
      <>
        <path d="M8 10h32v20H22l-8 7v-7H8z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M14 17c3-3 5 3 8 0s5 3 8 0M14 24c3-3 5 3 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    nombre: "Lenguaje formal",
    detalle: "El resultado declara símbolos, reglas y una secuencia. Cada paso queda escrito.",
    icono: (
      <>
        <rect x="7" y="9" width="34" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text x="24" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor">
          ∀ ⊢ →
        </text>
      </>
    ),
  },
  {
    nombre: "Prueba revisable",
    detalle: "Otra persona puede seguir cada paso y decir si se sostiene. La revisión es parte del conocimiento.",
    icono: (
      <>
        <rect x="9" y="7" width="30" height="34" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M15 17l3 3 5-6M15 29l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 18h7M27 30h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
];

function InfografiaFormalizar() {
  const [activo, setActivo] = useState(0);
  return (
    <figure className="infografia">
      <figcaption className="infografia__titulo">De un argumento suelto a una prueba revisable</figcaption>
      <ol className="pasos" role="list">
        {PASOS.map((paso, i) => (
          <li key={paso.nombre} className="pasos__item">
            <button type="button" className="paso" aria-pressed={activo === i} onClick={() => setActivo(i)}>
              <svg className="paso__icono" viewBox="0 0 48 48" aria-hidden="true">
                {paso.icono}
              </svg>
              <span className="paso__numero">Paso {i + 1}</span>
              <span className="paso__nombre">{paso.nombre}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="infografia__detalle" aria-live="polite">
        <strong>{PASOS[activo].nombre}.</strong> {PASOS[activo].detalle}
      </p>
    </figure>
  );
}

export function Formalizar() {
  return (
    <>
      <p className="entrada">
        Formalizar conocimiento científico es dejar un resultado o un argumento en un lenguaje donde otra persona
        puede seguir cada paso y decir si se sostiene.
      </p>
      <p>
        No es resumir un artículo ni pedirle a un sistema que explique un tema en un párrafo convincente. El resultado
        formal declara símbolos, reglas y una secuencia que se puede comprobar.
      </p>

      <InfografiaFormalizar />

      <h2>Tres casos reales</h2>
      <div className="fichas">
        <Ficha
          cita="Jensen, Larsen, Schlichtkrull y Villadsen (2018)"
          rotulo="Isabelle/HOL"
          fuente="jensen2018"
          enlace="Artículo de Jensen y colegas (2018)"
        >
          <p>
            Formalizan un demostrador de primer orden en Isabelle/HOL y dejan revisable la lógica de ese demostrador,
            no un resumen de su funcionamiento.
          </p>
          <p>
            Sus pruebas son declarativas: cada paso se declara, de forma parecida a las oraciones de una prueba
            cuidadosa en papel.
          </p>
        </Ficha>
        <Ficha cita="Sun y Yu (2020)" rotulo="Coq" fuente="sun2020" enlace="Artículo de Sun y Yu (2020)">
          <p>
            Hacen lo propio con una teoría de conjuntos en Coq: los axiomas y las pruebas quedan en un archivo que
            otro puede abrir.
          </p>
          <p>
            La formalización completa tiene ocho axiomas, un esquema de axiomas, 62 definiciones y 148 teoremas o
            corolarios.
          </p>
        </Ficha>
        <Ficha
          cita="Lund y Villadsen (2024)"
          rotulo="En el aula"
          fuente="lund2024"
          enlace="Artículo de Lund y Villadsen (2024)"
        >
          <p>
            Acercan esa exigencia al aula: usan razonamiento verificado para enseñar cálculo de secuentes, de modo que
            la prueba se revisa mientras se aprende.
          </p>
        </Ficha>
      </div>

      <p>
        En estos casos el sistema propone o registra el paso, y la revisión sigue siendo parte del conocimiento. En
        una universidad pública esa diferencia importa, porque el estudiante de posgrado puede exigir una prueba
        revisable aunque no disponga del cómputo de un laboratorio industrial.
      </p>

      <Aviso>Formalizar no es resumir un texto ni conversar con un chatbot.</Aviso>
    </>
  );
}

/* ---------- Pantalla 6 · Tres criterios ---------- */

export function Criterios() {
  return (
    <>
      <p className="entrada">
        Beneficio, limitación y validación son tres lecturas distintas de un mismo caso. Abre las tres columnas.
      </p>

      <TresColumnas
        beneficio={
          <p>
            Es lo que el estudio documenta que el sistema sí permite hacer: una prueba que se puede abrir, un fallo
            que se vuelve visible o un paso que otra persona puede recorrer. No basta con decir que la herramienta es
            poderosa.
          </p>
        }
        limitacion={
          <p>
            Es el costo o el alcance. Puede ser la formación, la herramienta, el tiempo de supervisión o el hecho de
            que el método sirve para un objeto formal y no para cualquier texto. Decir que estos sistemas no existen
            en la literatura no es una limitación: los casos de este recurso están publicados.
          </p>
        }
        validacion={
          <p>
            Es la forma de comprobar el resultado, no el tono de la respuesta. La pregunta es siempre la misma: si los
            pasos quedan para que otra persona los revise.
          </p>
        }
      />

      <h2>Dos asistentes de prueba</h2>
      <p>Isabelle/HOL y Coq no buscan artículos. Registran pasos de una prueba.</p>
      <div className="fila-botones">
        <Ventana etiqueta="+ info: Isabelle" titulo="Isabelle/HOL">
          <p>
            Es un asistente de prueba: registra cada paso de una demostración para que se pueda comprobar. Nipkow,
            Paulson y Wenzel (2026) lo documentan en el{" "}
            <Fuente id="nipkow2026">tutorial oficial de Isabelle/HOL</Fuente>.
          </p>
          <p>
            Para ampliar: <Fuente id="paulson1994">Paulson (1994)</Fuente> y{" "}
            <Fuente id="nipkow2014">Nipkow y Klein (2014)</Fuente>. Una introducción de acceso abierto es la de{" "}
            <Fuente id="teege2024">Teege (2024)</Fuente>, con licencia CC0.
          </p>
        </Ventana>
        <Ventana etiqueta="+ info: Coq" titulo="Coq">
          <p>
            También es un asistente de prueba. Sun y Yu (2020) dejan en Coq una{" "}
            <Fuente id="sun2020">teoría de conjuntos</Fuente>, en un lenguaje que se puede comprobar.
          </p>
          <p>
            Para ampliar: <Fuente id="bertot2004">Bertot y Castéran (2004)</Fuente> y el{" "}
            <Fuente id="coq">manual de referencia de Coq</Fuente> (The Coq Development Team, s. f.).
          </p>
        </Ventana>
      </div>

      <p>Si en un caso falta una de las tres columnas, el análisis queda incompleto.</p>
      <Aviso>
        El costo de usar el sistema es la limitación. El asistente que registra los pasos es la validación.
      </Aviso>
    </>
  );
}

/* ---------- Pantalla 8 · Beneficios ---------- */

export function Beneficios() {
  return (
    <>
      <p className="entrada">
        Los sistemas de inteligencia artificial que formalizan conocimiento científico no se valoran por el tono de la
        respuesta, sino por lo que el estudio deja revisable.
      </p>

      <h2>Qué documenta cada caso</h2>
      <div className="fichas">
        <Ficha
          cita="Jensen, Larsen, Schlichtkrull y Villadsen (2018)"
          rotulo="Isabelle/HOL"
          fuente="jensen2018"
          enlace="Artículo de Jensen y colegas (2018)"
        >
          <p>
            Formalizan y verifican un demostrador de primer orden dentro de Isabelle/HOL. El beneficio que se puede
            sostener con ese artículo es preciso: no solo se usa un demostrador, sino que la lógica de ese demostrador
            queda en un asistente y otra persona puede recorrerla.
          </p>
          <p>
            Los autores dicen para qué lo hicieron: enseñar cómo funcionan y cómo se usan estos demostradores. El
            resultado permite estudiar código concreto junto con la verificación de que es correcto.
          </p>
          <p>Eso no significa que el sistema reemplace a quien investiga.</p>
        </Ficha>
        <Ficha cita="Sun y Yu (2020)" rotulo="Coq" fuente="sun2020" enlace="Artículo de Sun y Yu (2020)">
          <p>
            Construyen un sistema formal de teoría de conjuntos en Coq. Cambia la herramienta y cambia el objeto, pero
            el tipo de beneficio se parece: los axiomas y las pruebas quedan en un lenguaje que se puede comprobar, no
            en un resumen de la teoría.
          </p>
          <p>
            Los teoremas que prueban ya se conocían, como el de Schröder-Bernstein. Lo que se gana no es un teorema
            nuevo, sino que las pruebas quedan comprobadas dentro del asistente.
          </p>
        </Ficha>
        <Ficha
          cita="Schlichtkrull, Blanchette, Traytel y Waldmann (2020)"
          rotulo="Isabelle/HOL"
          fuente="schlichtkrull2020"
          enlace="Artículo de Schlichtkrull y colegas (2020)"
        >
          <p>
            Formalizan un demostrador de resolución ordenada y muestran el mismo tipo de beneficio: la prueba queda
            dentro del asistente y no basta con aceptar el veredicto.
          </p>
          <p>
            Parten de la primera mitad de un capítulo clásico sobre demostración por resolución. Según los autores,
            el trabajo aclaró puntos finos de ese capítulo.
          </p>
        </Ficha>
      </div>

      <p>
        En una universidad pública, el estudiante de posgrado puede pedir ese criterio aunque no disponga del cómputo
        de un laboratorio industrial.
      </p>
      <Aviso>Un beneficio se cita con autor y año. No se inventa a partir del nombre del programa.</Aviso>

      <section className="video">
        <h2>Video para ampliar</h2>
        <p>
          Conferencia de Lawrence Paulson, autor de Isabelle:{" "}
          <span lang="en">«Doing mathematics with simple types: Infinitary combinatorics in Isabelle/HOL»</span>{" "}
          (Harvard CMSA, 2021). Dura 70 minutos, está en inglés y tiene subtítulos automáticos en YouTube.
        </p>
        <p>Es opcional. Muestra cómo se trabaja en Isabelle; no es el resultado de los artículos de este módulo.</p>
        <p>
          <a className="boton boton--suave" href={urlDe("harvard2021")} target="_blank" rel="noreferrer">
            Ver el video en YouTube<span className="solo-lector"> (se abre en otra pestaña)</span>
          </a>
        </p>
        <p className="nota">
          Otro caso para ampliar: <Fuente id="ye2024">Ye, Woodcock y Foster (2024)</Fuente> modelan incertidumbre y
          automatizan el razonamiento con demostración de teoremas.
        </p>
      </section>
    </>
  );
}

/* ---------- Pantalla 10 · Limitaciones ---------- */

export function Limitaciones() {
  return (
    <>
      <p className="entrada">
        Una limitación útil no es decir que la inteligencia artificial no existe en la literatura. Los casos de este
        módulo están publicados. La limitación es el costo de usarlos con criterio.
      </p>

      <h2>Qué hace falta en cada caso</h2>
      <div className="fichas">
        <Ficha
          cita="Kaufmann (2022)"
          rotulo="Circuitos"
          fuente="kaufmann2022"
          enlace="Artículo de Kaufmann (2022)"
        >
          <p>
            Verifica circuitos multiplicadores con álgebra computacional. El trabajo muestra que esa verificación es
            posible y, al mismo tiempo, que es especializada: hacen falta el circuito, la herramienta y alguien capaz
            de leer la prueba.
          </p>
          <p>
            El propio autor reconoce el costo: verificar multiplicadores todavía exige una cantidad importante de
            trabajo manual. Su herramienta entrega certificados que comprobadores independientes pueden revisar.
          </p>
          <p>Sin esa supervisión, el veredicto del sistema no queda integrado como conocimiento del curso.</p>
        </Ficha>
        <Ficha
          cita="Benzmüller y Scott (2020)"
          rotulo="Lógica libre en HOL"
          fuente="benzmuller2020"
          enlace="Artículo de Benzmüller y Scott (2020)"
        >
          <p>
            Automatizan razonamiento en una lógica libre dentro de HOL. El estudio muestra alcance, porque hay lógicas
            que se pueden tratar de forma mecánica, y también cuidado: la automatización no debe tomarse como
            aceptación automática.
          </p>
          <p>
            Lo prueban en teoría de categorías y, de paso, salieron a la luz errores menores en un libro de texto
            reconocido. Aun así, los autores aclaran que no buscan resultados nuevos en esa área, sino mostrar una
            forma de usar el razonamiento automático.
          </p>
          <p>
            El sistema opera sobre una lógica formal precisa. No autoriza a tratar cualquier texto académico como si
            ya estuviera formalizado.
          </p>
        </Ficha>
        <Ficha
          cita="Kaufmann, Fleury, Biere y Kauers (2024)"
          rotulo="Comprobadores"
          fuente="kaufmann2024"
          enlace="Artículo de Kaufmann y colegas (2024)"
        >
          <p>
            Refuerzan el mismo límite en comprobadores de circuitos: la herramienta especializada no se usa sin quien
            sepa leerla.
          </p>
          <p>
            Parten de una advertencia: el propio proceso de verificación puede contener errores. Por eso generan
            certificados y presentan tres programas que los revisan. Uno de ellos, Pastèque, está verificado a su vez
            en Isabelle/HOL.
          </p>
        </Ficha>
      </div>

      <p>
        En una universidad pública, la pieza que más importa es la supervisión, porque no se resuelve solo con más
        cómputo.
      </p>
      <div className="fila-botones">
        <Ventana etiqueta="+ info: supervisión humana" titulo="Supervisión humana">
          <p>Significa que una persona revisa la prueba antes de darla por aceptada.</p>
        </Ventana>
      </div>
    </>
  );
}

/* ---------- Pantalla 12 · Validación ---------- */

export function Validacion() {
  return (
    <>
      <p className="entrada">
        Validar no es creer el texto que produce el sistema ni aceptar una respuesta porque suena segura. Es poder
        revisar los pasos.
      </p>

      <h2>Cómo se valida en cada caso</h2>
      <div className="fichas">
        <Ficha
          cita="Lund y Villadsen (2024)"
          rotulo="En el aula"
          fuente="lund2024"
          enlace="Artículo de Lund y Villadsen (2024)"
        >
          <p>
            Usan razonamiento verificado para enseñar cálculo de secuentes a estudiantes de ciencias de la
            computación. La validación y la formación van juntas: el estudiante no recibe solo un resultado, sino que
            trabaja con una prueba que se puede revisar mientras aprende el cálculo.
          </p>
          <p>
            Por eso el caso se parece a una clase de posgrado. No exige el cómputo de un laboratorio industrial. Exige
            una actividad donde la prueba sea parte del estudio.
          </p>
        </Ficha>
        <Ficha
          cita="Schlichtkrull, Blanchette, Traytel y Waldmann (2020)"
          rotulo="Isabelle/HOL"
          fuente="schlichtkrull2020"
          enlace="Artículo de Schlichtkrull y colegas (2020)"
        >
          <p>
            Formalizan un demostrador de resolución ordenada y dejan la prueba dentro del asistente. Ahí también se
            valida porque alguien puede recorrer los pasos, no porque el sistema entregue un veredicto.
          </p>
        </Ficha>
        <Ficha
          cita="Reynolds, Tinelli y Barrett (2017)"
          rotulo="Ampliación"
          fuente="reynolds2017"
          enlace="Artículo de Reynolds y colegas (2017)"
        >
          <p>
            Muestran otro modo de comprobación formal, la búsqueda de contraejemplos. No cambia la pregunta de este
            módulo: si los pasos se pueden revisar.
          </p>
        </Ficha>
      </div>

      <div className="cuenta">
        <div className="cuenta__lado cuenta__lado--si">
          <h2>Sí cuenta como validación</h2>
          <ul>
            <li>Que alguien pueda recorrer los pasos de la prueba.</li>
            <li>Que la prueba quede dentro del asistente.</li>
            <li>Que un comprobador independiente revise el certificado de la prueba (Kaufmann, 2022).</li>
          </ul>
        </div>
        <div className="cuenta__lado cuenta__lado--no">
          <h2>No cuenta</h2>
          <ul>
            <li>Que el sistema responda con un tono seguro.</li>
            <li>Que el texto sea largo.</li>
            <li>Que una persona diga que confía en la herramienta.</li>
          </ul>
        </div>
      </div>

      <Aviso>Un tono seguro no es una prueba.</Aviso>
    </>
  );
}

/* ---------- Pantalla 14 · Caso guiado ---------- */

export function Caso() {
  const progreso = useProgreso();
  const [comparar, setComparar] = useState(false);
  const idCampo = useId();
  const hayHipotesis = progreso.hipotesis.trim() !== "";

  return (
    <>
      <p className="entrada">
        Álvez, Hermo, Lucio y Rigau (2019) prueban ontologías escritas en lógica de primer orden con pruebas de caja
        blanca.
      </p>
      <p>
        El objeto ya es formal. No se trata de un texto libre ni de un resumen. Las pruebas automáticas ayudan a ver
        si la ontología se sostiene. <Fuente id="alvez2019">Artículo de Álvez y colegas (2019)</Fuente>.
      </p>

      <section className="hipotesis">
        <label className="actividad__enunciado" htmlFor={idCampo}>
          Mi hipótesis: ¿qué beneficio crees que reporta el artículo?
        </label>
        <textarea
          id={idCampo}
          className="campo"
          rows={3}
          value={progreso.hipotesis}
          onChange={(evento) => actualizar({ hipotesis: evento.target.value })}
        />
        {!comparar && (
          <button type="button" className="boton" disabled={!hayHipotesis} onClick={() => setComparar(true)}>
            Comparar con las tres columnas
          </button>
        )}
      </section>

      <div aria-live="polite">
        {comparar && (
          <>
            <h2>Lo que dice el caso</h2>
            <TresColumnas
              abiertas
              beneficio={
                <p>
                  El beneficio es estrecho: esas pruebas muestran fallos de la ontología que de otro modo quedarían ocultos. Los
                  autores encontraron defectos en varias ontologías y, al corregirlos, obtuvieron una versión mejorada de una de
                  ellas, Adimen-SUMO. No dice que el sistema arregle cualquier base de conocimiento.
                </p>
              }
              limitacion={
                <p>
                  La limitación es de alcance. El método cubre ontologías formales de lógica de primer orden y no se extiende, por
                  este solo artículo, a cualquier texto académico.
                </p>
              }
              validacion={
                <p>
                  La validación está en la inspección. No se acepta solo el veredicto de la herramienta. La caja blanca importa
                  porque deja ver el interior de la prueba, no únicamente un sí o un no. Según los autores, cada prueba da pistas
                  sobre la naturaleza del defecto.
                </p>
              }
            />
            <p>
              Compara tu hipótesis con la columna Beneficio. Con las tres columnas llenas, el caso queda analizado en
              los términos del resultado de aprendizaje: qué se gana, qué no cubre y cómo se comprueba.
            </p>
          </>
        )}
      </div>
    </>
  );
}

/* ---------- Pantalla 16 · Apropiación ---------- */

export function Apropiacion() {
  const progreso = useProgreso();
  const idCampo = useId();
  const idAyuda = useId();
  const palabras = contarPalabras(progreso.justificacion);
  const lista = progreso.decision === "A" && palabras >= MINIMO_PALABRAS;

  function decidir(opcion: "A" | "B") {
    actualizar({ decision: opcion });
    marcarActividad("a7", opcion === "A" && palabras >= MINIMO_PALABRAS);
  }

  function escribir(texto: string) {
    actualizar({ justificacion: texto });
    marcarActividad("a7", progreso.decision === "A" && contarPalabras(texto) >= MINIMO_PALABRAS);
  }

  return (
    <>
      <p className="entrada">
        En la Especialización en Inteligencia Artificial de una universidad pública, el estudiante puede apropiar
        criterios de trabajo.
      </p>

      <div className="cuenta">
        <div className="cuenta__lado cuenta__lado--si">
          <h2>Sí cabe en el posgrado</h2>
          <ul>
            <li>Pedir que la prueba quede revisable cuando el curso use formalización.</li>
            <li>Leer un caso con las tres columnas.</li>
            <li>Citar el beneficio con autor y año.</li>
            <li>Decir el límite antes de tratar el resultado como conocimiento aceptado.</li>
          </ul>
        </div>
        <div className="cuenta__lado cuenta__lado--no">
          <h2>No es una meta de este posgrado</h2>
          <ul>
            <li>Repetir un laboratorio de gran escala.</li>
            <li>Esperar el cómputo de un centro industrial para empezar a aprender el criterio.</li>
            <li>Tratar la verificación de un circuito como una práctica que cualquiera monta sin formación.</li>
          </ul>
        </div>
      </div>

      <p>
        Lund y Villadsen (2024) muestran que esa apropiación cabe en una actividad de formación. No es un consejo
        suelto: en ese estudio la prueba verificada se usa para enseñar. Las condiciones de la segunda lista aparecen
        como límite en Kaufmann (2022) y en el cuidado de Benzmüller y Scott (2020). Reconocerlas también es analizar.
      </p>

      <section className="actividad">
        <fieldset className="actividad__grupo">
          <legend className="actividad__enunciado">Tu decisión: ¿qué harías en tu posgrado?</legend>
          <div className="opciones">
            <button type="button" className="opcion" aria-pressed={progreso.decision === "A"} onClick={() => decidir("A")}>
              A. En un curso que use formalización, exigir que la prueba quede revisable.
            </button>
            <button type="button" className="opcion" aria-pressed={progreso.decision === "B"} onClick={() => decidir("B")}>
              B. Esperar el cómputo de un laboratorio industrial antes de aprender el criterio.
            </button>
          </div>
        </fieldset>

        <div role="status">
          {progreso.decision === "A" && (
            <div className="retro retro--bien">
              <p className="retro__titulo">La opción A se sostiene</p>
              <p>
                Lund y Villadsen (2024) muestran que la prueba verificada cabe en una actividad de formación. Ahora
                justifica tu decisión.
              </p>
            </div>
          )}
          {progreso.decision === "B" && (
            <div className="retro retro--mal">
              <p className="retro__titulo">La opción B no se sostiene</p>
              <p>
                Aplaza el aprendizaje hasta una condición que el programa no controla. Vuelve a leer las prácticas que
                sí caben y elige de nuevo.
              </p>
            </div>
          )}
        </div>

        <label className="actividad__enunciado" htmlFor={idCampo}>
          Justifica tu decisión en dos líneas
        </label>
        <p className="actividad__ayuda" id={idAyuda}>
          Mínimo {MINIMO_PALABRAS} palabras. Esta justificación cuenta para el resultado de aprendizaje, junto con el
          80 % de la evaluación. Llevas {palabras}.
        </p>
        <textarea
          id={idCampo}
          className="campo"
          rows={4}
          aria-describedby={idAyuda}
          value={progreso.justificacion}
          onChange={(evento) => escribir(evento.target.value)}
        />
        <p className={lista ? "estado estado--ok" : "estado"} role="status">
          {lista
            ? "Decisión justificada y guardada. Ya puedes pasar a la evaluación."
            : progreso.decision !== "A"
              ? "Falta elegir la opción que se sostiene y escribir la justificación."
              : `Faltan ${MINIMO_PALABRAS - palabras} palabras en la justificación.`}
        </p>
      </section>
    </>
  );
}
