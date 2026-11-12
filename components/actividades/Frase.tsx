"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ruta } from "@/lib/pantallas";
import { actualizar, contarPalabras, marcarActividad, useProgreso } from "@/lib/progreso";

// Palabras que muestran que la frase nombra la prueba, el alcance o la supervisión.
const SENALES: { nombre: string; raices: string[] }[] = [
  { nombre: "la prueba", raices: ["prueba", "demostracion", "caja blanca", "inspecc", "paso"] },
  { nombre: "el alcance", raices: ["alcance", "ontolog", "primer orden", "limite", "cubre"] },
  { nombre: "la supervisión", raices: ["supervis", "persona", "human", "alguien", "docente", "expert"] },
];

function sinTildes(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function senalesEn(frase: string): string[] {
  const limpia = sinTildes(frase);
  return SENALES.filter((s) => s.raices.some((raiz) => limpia.includes(raiz))).map((s) => s.nombre);
}

export function Frase({ clave, pregunta, repaso }: { clave: string; pregunta: string; repaso: number }) {
  const progreso = useProgreso();
  const [comprobada, setComprobada] = useState(false);
  const idCampo = useId();
  const idAyuda = useId();

  const halladas = senalesEn(progreso.frase);
  const corta = contarPalabras(progreso.frase) < 4;
  const sirve = halladas.length > 0 && !corta;

  function comprobar() {
    setComprobada(true);
    marcarActividad(clave, sirve);
  }

  return (
    <section className="actividad">
      <label className="actividad__enunciado" htmlFor={idCampo}>
        {pregunta}
      </label>
      <p className="actividad__ayuda" id={idAyuda}>
        Escribe una sola frase. La comprobación es automática: busca si nombras la prueba, el alcance o la
        supervisión.
      </p>
      <textarea
        id={idCampo}
        className="campo"
        rows={3}
        aria-describedby={idAyuda}
        value={progreso.frase}
        onChange={(evento) => {
          actualizar({ frase: evento.target.value });
          setComprobada(false);
        }}
      />
      <button type="button" className="boton" disabled={progreso.frase.trim() === ""} onClick={comprobar}>
        Comprobar
      </button>

      <div role="status">
        {comprobada && sirve && (
          <div className="retro retro--bien">
            <p className="retro__titulo">La frase sirve</p>
            <p>Nombras {halladas.join(" y ")}. Eso es lo que se revisa antes de usar el resultado. Puedes seguir.</p>
          </div>
        )}
        {comprobada && !sirve && (
          <div className="retro retro--mal">
            <p className="retro__titulo">Todavía no</p>
            <p>
              {corta
                ? "La frase es muy corta. Di qué revisarías tú."
                : "Tu frase no nombra la prueba, el alcance ni la supervisión. Decir que la inteligencia artificial ya lo resolvió no es revisar."}{" "}
              Vuelve a la pantalla {repaso} y reescríbela con una de las tres columnas.
            </p>
            <div className="retro__acciones">
              <Link className="boton boton--suave" href={ruta(repaso)}>
                Volver a la pantalla {repaso}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
