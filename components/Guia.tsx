"use client";

import { useEffect, type CSSProperties } from "react";
import { Avatar } from "@/components/Avatar";
import { Ventana } from "@/components/Ventana";
import { contarPalabras } from "@/lib/progreso";
import { conBase } from "@/lib/sitio";
import { detener, detenerSiEs, hablar, pausar, prepararVoces, reanudar, useVoz } from "@/lib/voz";

// Botón pequeño para oír un texto corto (tarjetas de resultado y población).
export function BotonEscuchar({ id, texto, etiqueta }: { id: string; texto: string; etiqueta: string }) {
  const voz = useVoz();
  const activa = voz.id === id && voz.fase !== "inactiva";

  useEffect(() => () => detenerSiEs(id), [id]);

  return (
    <button type="button" className="boton boton--suave boton--chico" onClick={() => (activa ? detener() : hablar(id, texto))}>
      {activa ? "Detener" : etiqueta}
    </button>
  );
}

// Duración aproximada a 140 palabras por minuto, redondeada a 5 segundos.
function duracion(texto: string): number {
  return Math.max(5, Math.round((contarPalabras(texto) / 140) * 12) * 5);
}

const TOCAR = "M8 5v14l11-7z";
const PAUSA = "M7 5h4v14H7zM13 5h4v14h-4z";

const ACCION = {
  inactiva: { etiqueta: "Escuchar al guía", icono: TOCAR },
  hablando: { etiqueta: "Pausar", icono: PAUSA },
  pausada: { etiqueta: "Reanudar", icono: TOCAR },
} as const;

// Reproductor del guía. Vive en la barra inferior, entre Atrás y Seguir.
export function Guia({ id: pantalla, texto, audio }: { id: string; texto: string; audio?: string }) {
  const id = `guia-${pantalla}`;
  const voz = useVoz();
  const mia = voz.id === id;
  const fase = mia ? voz.fase : "inactiva";
  const accion = ACCION[fase];

  useEffect(() => {
    prepararVoces();
    return () => detenerSiEs(id);
  }, [id]);

  function alPulsar() {
    if (fase === "inactiva") hablar(id, texto);
    else if (fase === "hablando") pausar();
    else reanudar();
  }

  return (
    <section className="guia" aria-label="Guía con voz">
      <Avatar hablando={fase === "hablando"} />

      {audio ? (
        <audio className="guia__audio" controls preload="none" src={conBase(audio)} />
      ) : (
        <>
          <button type="button" className="guia__boton" onClick={alPulsar}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={accion.icono} fill="currentColor" />
            </svg>
            <span className="guia__etiqueta">{accion.etiqueta}</span>
          </button>
          <span className={fase === "hablando" ? "ondas ondas--activas" : "ondas"} aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} style={{ "--i": i } as CSSProperties} />
            ))}
          </span>
          <span className="guia__tiempo">≈ {duracion(texto)} s</span>
          {fase !== "inactiva" && (
            <button type="button" className="guia__detener" onClick={detener}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6h12v12H6z" fill="currentColor" />
              </svg>
              <span className="guia__etiqueta">Detener</span>
            </button>
          )}
        </>
      )}

      <Ventana
        etiqueta={
          <>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 7h14M5 12h14M5 17h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="guia__etiqueta">Transcripción</span>
          </>
        }
        titulo="Lo que dice el guía en esta pantalla"
        clase="guia__texto"
      >
        <p>{texto}</p>
      </Ventana>

      <p className="guia__aviso" role="status">
        {mia ? voz.aviso : null}
      </p>
    </section>
  );
}
