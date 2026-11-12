import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pantalla } from "@/components/Pantalla";
import { PANTALLAS, buscar } from "@/lib/pantallas";

// La pantalla 1 es la portada y vive en la raíz del sitio.
export function generateStaticParams() {
  return PANTALLAS.filter((p) => p.n > 1).map((p) => ({ n: String(p.n) }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/pantalla/[n]">): Promise<Metadata> {
  const { n } = await props.params;
  const datos = buscar(Number(n));
  return { title: datos ? `${datos.n}. ${datos.titulo}` : "Pantalla no encontrada" };
}

export default async function Page(props: PageProps<"/pantalla/[n]">) {
  const { n } = await props.params;
  const datos = buscar(Number(n));
  if (!datos || datos.n === 1) notFound();
  return <Pantalla n={datos.n} />;
}
