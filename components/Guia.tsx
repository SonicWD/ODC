"use client";

import { useEffect } from "react";
import { Avatar } from "@/components/Avatar";
import { conBase } from "@/lib/sitio";
import { detener, detenerSiEs, hablar, pausar, prepararVoces, reanudar, useVoz } from "@/lib/voz";

// Botón pequeño para oír un texto corto (tarjetas de la pantalla 2).
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

export function Guia({ n, texto, audio }: { n: number; texto: string; audio?: string }) {
  const id = `guia-${n}`;
  const voz = useVoz();
  const mia = voz.id === id;
  const fase = mia ? voz.fase : "inactiva";

  useEffect(() => {
    prepararVoces();
    return () => detenerSiEs(id);
  }, [id]);

  return (
    <div className="guia">
      <div className="guia__cabeza">
        <Avatar hablando={fase === "hablando"} />
        <div>
          <h2 className="guia__titulo">Tu guía</h2>
          <p className="guia__nota">Te dice qué abrir y cuál es la idea de esta pantalla.</p>
        </div>
      </div>

      {audio ? (
        <audio className="guia__audio" controls preload="none" src={conBase(audio)} aria-details={`${id}-texto`} />
      ) : (
        <div className="guia__controles">
          {fase === "inactiva" && (
            <button type="button" className="boton" onClick={() => hablar(id, texto)}>
              Escuchar al guía
            </button>
          )}
          {fase === "hablando" && (
            <button type="button" className="boton" onClick={pausar}>
              Pausar
            </button>
          )}
          {fase === "pausada" && (
            <button type="button" className="boton" onClick={reanudar}>
              Reanudar
            </button>
          )}
          {fase !== "inactiva" && (
            <button type="button" className="boton boton--suave" onClick={detener}>
              Detener
            </button>
          )}
        </div>
      )}

      <p className="guia__aviso" role="status">
        {mia ? voz.aviso : null}
      </p>

      <details className="guia__transcripcion" id={`${id}-texto`}>
        <summary>Transcripción</summary>
        <p>{texto}</p>
      </details>
    </div>
  );
}
