import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { SITIO } from "@/lib/sitio";
import "./globals.css";

const texto = Source_Sans_3({ variable: "--fuente-texto", subsets: ["latin"] });
const titulos = Source_Serif_4({ variable: "--fuente-titulos", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITIO.tituloCorto,
    template: "%s | Formalizar con inteligencia artificial",
  },
  description: `${SITIO.tituloLargo}. Objeto Digital de Conocimiento de ${SITIO.autor}, ${SITIO.programa}, ${SITIO.institucion}.`,
  authors: [{ name: SITIO.autor }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${texto.variable} ${titulos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
