"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Externo, Fuente } from "@/components/Piezas";
import { buscar, ruta } from "@/lib/pantallas";
import { ITEMS_EVALUACION, actualizar, decisionJustificada, useProgreso } from "@/lib/progreso";
import { REFERENCIAS } from "@/lib/referencias";
import { SITIO } from "@/lib/sitio";

/* ---------- Pantalla 18 · Cierre ---------- */

const CASILLAS = [
  { texto: "Puedo explicar qué es formalizar conocimiento científico.", repaso: 4 },
  { texto: "Puedo separar beneficio, limitación y validación en un caso.", repaso: 6 },
  { texto: "Puedo decir qué apropiaría en mi posgrado y qué no depende de un gran laboratorio.", repaso: 16 },
];

export function Cierre() {
  const progreso = useProgreso();
  const respondidas = progreso.evaluacion.filter((r) => r !== null).length;

  function marcar(i: number, valor: boolean) {
    actualizar({ cierre: progreso.cierre.map((c, j) => (j === i ? valor : c)) });
  }

  return (
    <>
      <p className="entrada">Marca lo que ya puedes hacer. Si una casilla no se sostiene, vuelve solo a ese módulo.</p>

      <ul className="casillas" role="list">
        {CASILLAS.map((casilla, i) => (
          <li key={casilla.texto} className="casilla">
            <label className="casilla__texto">
              <input
                type="checkbox"
                checked={Boolean(progreso.cierre[i])}
                onChange={(evento) => marcar(i, evento.target.checked)}
              />
              <span>{casilla.texto}</span>
            </label>
            {!progreso.cierre[i] && (
              <Link className="casilla__repaso" href={ruta(casilla.repaso)}>
                Repasar en la pantalla {casilla.repaso}: {buscar(casilla.repaso)?.titulo}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <p className="idea">Una propuesta sirve cuando la prueba se puede revisar y el límite queda dicho.</p>

      <h2>Tu recorrido</h2>
      <ul>
        <li>
          Evaluación: {respondidas} de {ITEMS_EVALUACION} preguntas respondidas.
        </li>
        <li>Decisión justificada: {decisionJustificada(progreso) ? "lista" : "pendiente"}.</li>
      </ul>

      <div className="fila-botones">
        <Link className="boton boton--suave" href={ruta(19)}>
          Referencias
        </Link>
        <Link className="boton boton--suave" href={ruta(20)}>
          Créditos
        </Link>
      </div>
    </>
  );
}

/* ---------- Pantalla 19 · Referencias ---------- */

export function Referencias() {
  return (
    <>
      <p className="entrada">
        Fuentes de los casos, del video y de la licencia del recurso, en normas APA, séptima edición (Sánchez, 2019).
      </p>
      <ol className="referencias" role="list">
        {REFERENCIAS.map((referencia) => (
          <li key={referencia.id} className="referencia">
            {referencia.partes.map((parte, i) =>
              typeof parte === "string" ? <span key={i}>{parte}</span> : <em key={i}>{parte.i}</em>,
            )}{" "}
            <a href={referencia.url} target="_blank" rel="noreferrer">
              {referencia.url}
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ---------- Pantalla 20 · Créditos y licencia ---------- */

const RECURSOS: { titulo: string; autor: string; fuente: ReactNode; licencia: string }[] = [
  {
    titulo: "Infografías, ilustraciones y avatar",
    autor: `${SITIO.autor} (elaboración propia)`,
    fuente: "Este recurso",
    licencia: SITIO.licencia.sigla,
  },
  {
    titulo: "Voz del guía",
    autor: `Síntesis de voz del navegador, con guion de ${SITIO.autor}`,
    fuente: "Este recurso",
    licencia: SITIO.licencia.sigla,
  },
  {
    titulo: "Lawrence Paulson | Doing mathematics with simple types: Infinitary combinatorics in Isabelle/HOL",
    autor: "Harvard CMSA",
    fuente: <Fuente id="harvard2021">YouTube</Fuente>,
    licencia: "Licencia estándar de YouTube. Solo se enlaza.",
  },
  {
    titulo: "A gentle introduction to Isabelle and Isabelle/HOL",
    autor: "Gunnar Teege",
    fuente: <Fuente id="teege2024">GitHub</Fuente>,
    licencia: "CC0 1.0. Solo se enlaza.",
  },
  {
    titulo: "Tipografías Source Serif 4 y Source Sans 3",
    autor: "Adobe",
    fuente: <Externo href="https://fonts.google.com/">Google Fonts</Externo>,
    licencia: "SIL Open Font License 1.1",
  },
];

export function Creditos() {
  return (
    <>
      <h2>Metadatos</h2>
      <dl className="datos">
        <div>
          <dt>Área de conocimiento</dt>
          <dd>{SITIO.area}</dd>
        </div>
        <div>
          <dt>Nombre del material</dt>
          <dd>{SITIO.tituloLargo}</dd>
        </div>
        <div>
          <dt>Autor y guion</dt>
          <dd>{SITIO.autor}</dd>
        </div>
        <div>
          <dt>Diseño y desarrollo</dt>
          <dd>{SITIO.autor}</dd>
        </div>
        <div>
          <dt>Imágenes</dt>
          <dd>Infografías propias, dibujadas para este recurso</dd>
        </div>
        <div>
          <dt>Sonidos y voces</dt>
          <dd>Síntesis de voz del navegador, con transcripción en cada pantalla</dd>
        </div>
        <div>
          <dt>Programa</dt>
          <dd>
            {SITIO.programa}, {SITIO.institucion}
          </dd>
        </div>
        <div>
          <dt>Curso</dt>
          <dd>{SITIO.curso}</dd>
        </div>
        <div>
          <dt>Línea translocal</dt>
          <dd>
            {SITIO.linea} (<Fuente id="udec">Universidad de Cundinamarca, s. f.</Fuente>)
          </dd>
        </div>
        <div>
          <dt>Fecha de creación</dt>
          <dd>
            {SITIO.fecha} · {SITIO.version}
          </dd>
        </div>
        <div>
          <dt>Nivel educativo</dt>
          <dd>{SITIO.nivel}</dd>
        </div>
      </dl>
      <p className="nota">
        La búsqueda de literatura con la que se eligieron los casos fue un trabajo previo. No es un módulo de este
        recurso.
      </p>

      <h2>Recursos usados</h2>
      {/* Región con foco: en pantallas angostas la tabla se desplaza de lado. */}
      <div className="tabla-marco" role="region" aria-label="Recursos usados" tabIndex={0}>
        <table className="tabla">
          <caption className="solo-lector">Título, autor, fuente y licencia de cada recurso</caption>
          <thead>
            <tr>
              <th scope="col">Título</th>
              <th scope="col">Autor</th>
              <th scope="col">Fuente</th>
              <th scope="col">Licencia</th>
            </tr>
          </thead>
          <tbody>
            {RECURSOS.map((recurso) => (
              <tr key={recurso.titulo}>
                <th scope="row">{recurso.titulo}</th>
                <td>{recurso.autor}</td>
                <td>{recurso.fuente}</td>
                <td>{recurso.licencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Licencia</h2>
      <p>
        Este recurso se comparte con la licencia{" "}
        <Externo href={SITIO.licencia.url}>
          {SITIO.licencia.nombre} ({SITIO.licencia.sigla})
        </Externo>
        . Puedes copiarlo y adaptarlo sin fines comerciales, si citas al autor y conservas la misma licencia
        (Creative Commons, s. f.).
      </p>
    </>
  );
}
