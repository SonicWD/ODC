"use client";

import Link from "next/link";
import { BotonEscuchar } from "@/components/Guia";
import { MenuLista } from "@/components/MenuLista";
import { Ventana } from "@/components/Ventana";
import { ruta } from "@/lib/pantallas";
import { reiniciar } from "@/lib/progreso";
import { POBLACION, REA, SITIO } from "@/lib/sitio";

function IlustracionPortada() {
  const pasos = [28, 88, 148];
  return (
    <svg
      className="portada__figura"
      viewBox="0 0 260 200"
      role="img"
      aria-label="Tres pasos de una prueba, cada uno con su marca de revisión"
    >
      <rect x="18" y="8" width="224" height="184" rx="16" fill="#ffffff" stroke="#cfd8d0" strokeWidth="2" />
      <path d="M52 44v120" stroke="#0b3d2e" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      {pasos.map((y, i) => (
        <g key={y}>
          <circle cx="52" cy={y + 16} r="14" fill="#0b3d2e" />
          <text x="52" y={y + 21} textAnchor="middle" fontSize="14" fontWeight="700" fill="#ffffff">
            {i + 1}
          </text>
          <rect x="78" y={y + 4} width="104" height="9" rx="4.5" fill="#16211c" opacity="0.82" />
          <rect x="78" y={y + 20} width="72" height="7" rx="3.5" fill="#9aa8a0" />
          <circle cx="212" cy={y + 16} r="13" fill="#f2c230" />
          <path
            d={`M205 ${y + 16}l5 5 9-10`}
            fill="none"
            stroke="#16211c"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

export function Portada() {
  return (
    <div className="portada">
        <p className="seccion">Objeto Digital de Conocimiento · Universidad de Cundinamarca</p>
        <h1 className="portada__titulo">{SITIO.tituloCorto}</h1>
        <p className="portada__bajada">{SITIO.tituloLargo}.</p>

        <div className="portada__acciones">
          <Link className="boton boton--grande" href={ruta(2)}>
            Iniciar <span aria-hidden="true">→</span>
          </Link>
          <Ventana etiqueta="Ayuda" titulo="Cómo usar este recurso" clase="boton boton--suave boton--grande">
            <ul>
              <li>Avanza con Seguir y regresa con Atrás, al final de cada pantalla.</li>
              <li>El botón Menú, arriba, abre todas las secciones. No hay un orden obligatorio.</li>
              <li>
                Escuchar al guía reproduce la voz de la pantalla. Transcripción muestra ese mismo texto.
              </li>
              <li>Cada módulo cierra con una actividad. Verás por qué la respuesta sirve o por qué no.</li>
              <li>
                Tus respuestas se guardan solo en este navegador. Puedes borrarlas en la pantalla Menú.
              </li>
            </ul>
          </Ventana>
        </div>

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
        <IlustracionPortada />
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

export function MenuPantalla() {
  return (
    <>
      <p className="entrada">Elige una sección. El orden no es obligatorio.</p>
      <MenuLista actual={3} nivel={2} />
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
