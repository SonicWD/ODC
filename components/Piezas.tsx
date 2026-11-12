import type { ReactNode } from "react";
import { urlDe } from "@/lib/referencias";

export function Externo({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="solo-lector"> (se abre en otra pestaña)</span>
    </a>
  );
}

// Enlace a la fuente de una referencia de lib/referencias.ts.
export function Fuente({ id, children }: { id: string; children: ReactNode }) {
  return <Externo href={urlDe(id)}>{children}</Externo>;
}

// Ficha de un caso: se abre al pulsar la cita.
export function Ficha({
  cita,
  rotulo,
  fuente,
  enlace,
  children,
}: {
  cita: string;
  rotulo: string;
  fuente: string;
  enlace: string;
  children: ReactNode;
}) {
  return (
    <details className="ficha">
      <summary className="ficha__resumen">
        <span className="ficha__cita">{cita}</span>
        <span className="ficha__rotulo">{rotulo}</span>
      </summary>
      <div className="ficha__cuerpo">
        {children}
        <p className="ficha__fuente">
          <Fuente id={fuente}>{enlace}</Fuente>
        </p>
      </div>
    </details>
  );
}

export function Aviso({ titulo = "Aviso", children }: { titulo?: string; children: ReactNode }) {
  return (
    <p className="aviso" role="note">
      <strong>{titulo}.</strong> {children}
    </p>
  );
}

// Las tres lecturas de un caso. Se usa en Criterios y en el Caso guiado.
export function TresColumnas({
  beneficio,
  limitacion,
  validacion,
  abiertas = false,
}: {
  beneficio: ReactNode;
  limitacion: ReactNode;
  validacion: ReactNode;
  abiertas?: boolean;
}) {
  const columnas = [
    { clave: "beneficio", nombre: "Beneficio", pregunta: "Qué se gana", cuerpo: beneficio },
    { clave: "limitacion", nombre: "Limitación", pregunta: "Qué cuesta o qué no cubre", cuerpo: limitacion },
    { clave: "validacion", nombre: "Validación", pregunta: "Cómo se comprueba", cuerpo: validacion },
  ];
  return (
    <div className="columnas">
      {columnas.map((columna) => (
        <details key={columna.clave} className={`columna columna--${columna.clave}`} open={abiertas}>
          <summary className="columna__resumen">
            <span className="columna__nombre">{columna.nombre}</span>
            <span className="columna__pregunta">{columna.pregunta}</span>
          </summary>
          <div className="columna__cuerpo">{columna.cuerpo}</div>
        </details>
      ))}
    </div>
  );
}
