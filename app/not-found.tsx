import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Pantalla no encontrada" };

export default function NoEncontrada() {
  return (
    <main className="perdida">
      <h1 className="titulo">Esta pantalla no existe</h1>
      <p>Vuelve a la portada y entra por el menú.</p>
      <Link className="boton" href="/">
        Ir a la portada
      </Link>
    </main>
  );
}
