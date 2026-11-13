"use client";

import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useRef, useState } from "react";
import { Repaso } from "@/components/Repaso";
import { RESORTE } from "@/components/Movimiento";
import { usePunteroFino } from "@/lib/medios";
import { marcarActividad, useProgreso } from "@/lib/progreso";

export type Tarjeta = { texto: string; fuente?: string; cuenta: boolean; retro: string };

const UMBRAL = 80;

// Serie de situaciones, una por una, con dos respuestas posibles y la razón después de cada una.
// En pantallas con ratón también se puede deslizar la tarjeta: a la derecha cuenta, a la izquierda no.
export function Serie({
  clave,
  repaso,
  enunciado,
  si,
  no,
  tarjetas,
  retroBien,
}: {
  clave: string;
  repaso: string;
  enunciado: string;
  retroBien: string;
  si: string;
  no: string;
  tarjetas: Tarjeta[];
}) {
  const progreso = useProgreso();
  const punteroFino = usePunteroFino();
  const [respuestas, setRespuestas] = useState<boolean[]>([]);
  const [vista, setVista] = useState(0);
  const siguiente = useRef<HTMLButtonElement>(null);
  const cabeza = useRef<HTMLParagraphElement>(null);

  const total = tarjetas.length;
  const aciertos = respuestas.filter((r, i) => r === tarjetas[i].cuenta).length;
  const terminada = vista >= total;

  function responder(valor: boolean) {
    if (respuestas.length > vista) return;
    const nuevas = [...respuestas, valor];
    setRespuestas(nuevas);
    if (nuevas.length === total && nuevas.every((r, i) => r === tarjetas[i].cuenta)) marcarActividad(clave, true);
    requestAnimationFrame(() => siguiente.current?.focus());
  }

  function irA(i: number) {
    setVista(i);
    requestAnimationFrame(() => cabeza.current?.focus());
  }

  function repetir() {
    setRespuestas([]);
    irA(0);
  }

  function alSoltar(_: unknown, info: PanInfo) {
    if (respuestas[vista] !== undefined) return;
    if (info.offset.x > UMBRAL) responder(true);
    else if (info.offset.x < -UMBRAL) responder(false);
  }

  const puntos = (
    <ol className="puntos" aria-hidden="true">
      {tarjetas.map((tarjeta, i) => (
        <li
          key={tarjeta.texto}
          className={
            i >= respuestas.length
              ? i === vista
                ? "puntos__punto puntos__punto--actual"
                : "puntos__punto"
              : respuestas[i] === tarjeta.cuenta
                ? "puntos__punto puntos__punto--ok"
                : "puntos__punto puntos__punto--mal"
          }
        />
      ))}
    </ol>
  );

  if (terminada) {
    const todas = aciertos === total;
    return (
      <section className="actividad">
        <p ref={cabeza} tabIndex={-1} className="actividad__enunciado">
          {enunciado}
        </p>
        {puntos}
        <div role="status">
          <motion.div
            className={todas ? "retro retro--bien" : "retro retro--mal"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={RESORTE}
          >
            <p className="retro__titulo">
              {aciertos} de {total} aciertos
            </p>
            {todas ? (
              <p>{retroBien} Puedes seguir.</p>
            ) : (
              <>
                <p>Para resolver la actividad necesitas las {total}. Estas son las que fallaste:</p>
                <ul>
                  {tarjetas.map(
                    (tarjeta, i) =>
                      respuestas[i] !== tarjeta.cuenta && (
                        <li key={tarjeta.texto}>
                          {tarjeta.texto} <strong>{tarjeta.cuenta ? si : no}.</strong> {tarjeta.retro}
                        </li>
                      ),
                  )}
                </ul>
                <div className="retro__acciones">
                  <button type="button" className="boton" onClick={repetir}>
                    Repetir la serie
                  </button>
                  <Repaso id={repaso} boton />
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  const tarjeta = tarjetas[vista];
  const dada = respuestas[vista];
  const respondida = dada !== undefined;
  const bien = dada === tarjeta.cuenta;

  return (
    <section className="actividad">
      {progreso.actividades[clave] && respuestas.length === 0 && (
        <p className="actividad__hecha">Ya resolviste esta actividad. Puedes repetirla.</p>
      )}
      <p ref={cabeza} tabIndex={-1} className="actividad__cuenta">
        Situación {vista + 1} de {total}
      </p>
      <fieldset className="actividad__grupo">
        <legend className="actividad__enunciado">{enunciado}</legend>
        {puntos}
        <p className="actividad__ayuda">
          {punteroFino
            ? `Desliza la tarjeta a la derecha para «${si}» o a la izquierda para «${no}», o usa los botones.`
            : "Usa los botones. También puedes deslizar la tarjeta si tu dispositivo lo permite."}
        </p>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={vista}
            className="serie__tarjeta"
            drag={respondida ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.55}
            onDragEnd={alSoltar}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={RESORTE}
            style={{ touchAction: "pan-y" }}
          >
            <p>{tarjeta.texto}</p>
            {tarjeta.fuente && <footer>{tarjeta.fuente}</footer>}
          </motion.blockquote>
        </AnimatePresence>
        <div className="serie__botones">
          {[true, false].map((valor) => (
            <motion.button
              key={String(valor)}
              type="button"
              className="opcion"
              aria-pressed={dada === valor}
              disabled={respondida && dada !== valor}
              onClick={() => !respondida && responder(valor)}
              whileTap={!respondida ? { scale: 0.97 } : undefined}
            >
              {valor ? si : no}
            </motion.button>
          ))}
        </div>
      </fieldset>

      <div role="status">
        <AnimatePresence>
          {respondida && (
            <motion.div
              key={`${vista}-${String(dada)}`}
              className={bien ? "retro retro--bien" : "retro retro--mal"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={RESORTE}
            >
              <p className="retro__titulo">{bien ? "Correcto" : `No: la respuesta es «${tarjeta.cuenta ? si : no}»`}</p>
              <p>{tarjeta.retro}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {respondida && (
        <button ref={siguiente} type="button" className="boton" onClick={() => irA(vista + 1)}>
          {vista + 1 < total ? "Siguiente situación" : "Ver el resultado"}
        </button>
      )}
    </section>
  );
}
