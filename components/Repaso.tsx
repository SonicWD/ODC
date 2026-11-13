import Link from "next/link";
import { buscar, ruta } from "@/lib/pantallas";

// Enlace para volver a la pantalla donde está el contenido que hay que repasar.
export function Repaso({ id, boton = false }: { id: string; boton?: boolean }) {
  return (
    <Link className={boton ? "boton boton--suave" : undefined} href={ruta(id)} transitionTypes={["nav-back"]}>
      Repasar: {buscar(id)?.titulo}
    </Link>
  );
}
