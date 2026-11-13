import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pantalla } from "@/components/Pantalla";
import { PANTALLAS, PORTADA, buscar } from "@/lib/pantallas";

// La portada vive en la raíz del sitio. Las demás pantallas usan su nombre: "/beneficios/".
export function generateStaticParams() {
  return PANTALLAS.filter((p) => p.id !== PORTADA).map((p) => ({ id: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: buscar(id)?.titulo ?? "Pantalla no encontrada" };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const datos = buscar(id);
  if (!datos || datos.id === PORTADA) notFound();
  return <Pantalla id={datos.id} />;
}
