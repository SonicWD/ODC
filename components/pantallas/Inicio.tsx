"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, type CSSProperties, type PointerEvent } from "react";
import { BotonEscuchar } from "@/components/Guia";
import { MenuLista } from "@/components/MenuLista";
import { Prueba } from "@/components/Prueba";
import { Ventana } from "@/components/Ventana";
import { MENU, ruta } from "@/lib/pantallas";
import { reiniciar, useProgreso } from "@/lib/progreso";
import { POBLACION, REA, SITIO, conBase } from "@/lib/sitio";

// El brillo del fondo sigue al puntero. Es decorativo y solo se ve si el usuario acepta movimiento.
function seguirPuntero(evento: PointerEvent<HTMLDivElement>) {
  const caja = evento.currentTarget.getBoundingClientRect();
  evento.currentTarget.style.setProperty("--x", `${evento.clientX - caja.left}px`);
  evento.currentTarget.style.setProperty("--y", `${evento.clientY - caja.top}px`);
}

export function Portada() {
  return (
    <div className="portada" onPointerMove={seguirPuntero}>
      <div className="portada__texto">
        <div className="portada__marcas">
          <Image
            className="portada__logo"
            src={conBase("/logos/udec-horizontal.png")}
            alt="Universidad de Cundinamarca"
            width={280}
            height={130}
            priority
          />
          <Image
            className="portada__escudo"
            src={conBase("/logos/udec-escudo.png")}
            alt=""
            width={72}
            height={108}
            aria-hidden
          />
        </div>
        <p className="seccion">Objeto Digital de Conocimiento · Universidad de Cundinamarca</p>
        <h1 className="portada__titulo">
          {/* Cada palabra va en su caja para que entre por separado. El espacio queda fuera para que no se pierda. */}
          {SITIO.tituloCorto.split(" ").map((palabra, i) => (
            <Fragment key={i}>
              <span className="portada__palabra" style={{ "--i": i } as CSSProperties}>
                {palabra}
              </span>{" "}
            </Fragment>
          ))}
        </h1>
        <p className="portada__bajada">{SITIO.tituloLargo}.</p>

        <div className="portada__acciones">
          <Link className="boton boton--grande" href={ruta("resultado")} transitionTypes={["nav-forward"]}>
            Iniciar <span aria-hidden="true">→</span>
          </Link>
          <Ventana etiqueta="Ayuda" titulo="Cómo usar este recurso" clase="boton boton--suave boton--grande">
            <ul>
              <li>Avanza con Seguir y regresa con Atrás, en la barra inferior.</li>
              <li>El botón Menú, arriba, abre todas las secciones. No hay un orden obligatorio.</li>
              <li>
                En la misma barra, Escuchar al guía reproduce la voz de la pantalla y Transcripción muestra ese
                texto.
              </li>
              <li>Cada módulo cierra con una actividad. Verás por qué la respuesta sirve o por qué no.</li>
              <li>
                En las actividades puedes arrastrar con el ratón o con el dedo. Todas tienen además botones, para
                usarlas con el teclado.
              </li>
              <li>
                Tus respuestas se guardan solo en este navegador. Puedes borrarlas en la pantalla Menú.
              </li>
            </ul>
          </Ventana>
        </div>
      </div>

      <Prueba />

      <div className="portada__base">
        <dl className="datos">
          <div>
            <dt>Autor, guion y diseño</dt>
            <dd>{SITIO.autor}</dd>
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
            <dt>Fecha y versión</dt>
            <dd>
              {SITIO.fecha} · {SITIO.version}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function ResultadoPoblacion() {
  return (
    <>
      <p className="entrada">Abre las dos tarjetas antes de seguir.</p>
      <div className="tarjetas">
        <details className="tarjeta">
          <summary className="tarjeta__resumen">
            <span className="tarjeta__nombre">Resultado</span>
            <span className="tarjeta__pista">Lo que vas a demostrar al terminar</span>
          </summary>
          <div className="tarjeta__cuerpo">
            <p>{REA}</p>
            <dl className="desglose">
              <div>
                <dt>Desempeño</dt>
                <dd>Analiza</dd>
              </div>
              <div>
                <dt>Contenido</dt>
                <dd>Beneficios, limitaciones y criterios de validación de sistemas que formalizan conocimiento científico</dd>
              </div>
              <div>
                <dt>Contexto</dt>
                <dd>Universidades públicas</dd>
              </div>
              <div>
                <dt>Condición</dt>
                <dd>A partir de casos publicados entre 2016 y 2026</dd>
              </div>
              <div>
                <dt>Evidencia</dt>
                <dd>Al menos 80 % de acierto en ocho ítems y una decisión justificada</dd>
              </div>
            </dl>
            <BotonEscuchar id="tarjeta-resultado" texto={REA} etiqueta="Escuchar el resultado" />
          </div>
        </details>

        <details className="tarjeta">
          <summary className="tarjeta__resumen">
            <span className="tarjeta__nombre">Población</span>
            <span className="tarjeta__pista">Para quién es este recorrido</span>
          </summary>
          <div className="tarjeta__cuerpo">
            <p>{POBLACION}</p>
            <BotonEscuchar id="tarjeta-poblacion" texto={POBLACION} etiqueta="Escuchar la población" />
          </div>
        </details>
      </div>
    </>
  );
}

const MODULOS = MENU.flatMap((grupo) => grupo.entradas).filter((entrada) => entrada.actividad);
const VUELTA = 2 * Math.PI * 26;

export function MenuPantalla() {
  const progreso = useProgreso();
  const resueltas = MODULOS.filter((m) => m.actividad && progreso.actividades[m.actividad]).length;

  return (
    <>
      <p className="entrada">Elige una sección. El orden no es obligatorio.</p>
      <div className="avance">
        <svg className="avance__anillo" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="26" className="avance__fondo" />
          <circle
            cx="32"
            cy="32"
            r="26"
            className="avance__trazo"
            strokeDasharray={VUELTA}
            strokeDashoffset={VUELTA * (1 - resueltas / MODULOS.length)}
          />
        </svg>
        <p className="avance__texto">
          <b>
            {resueltas} de {MODULOS.length}
          </b>{" "}
          actividades resueltas
        </p>
      </div>
      <MenuLista actual="menu" nivel={2} />
      <div className="reinicio">
        <Ventana etiqueta="Borrar mis respuestas" titulo="¿Borrar tus respuestas?" clase="boton boton--suave boton--chico">
          <p>
            Se borran las actividades resueltas, tus textos y la evaluación guardados en este navegador. No se puede
            deshacer.
          </p>
          <button type="button" className="boton boton--peligro" data-cerrar onClick={reiniciar}>
            Sí, borrar
          </button>
        </Ventana>
      </div>
    </>
  );
}
