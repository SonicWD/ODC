import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { Marco } from "@/components/Marco";
import { Movimiento } from "@/components/Movimiento";
import { SITIO } from "@/lib/sitio";
import "./globals.css";

const texto = Inter({ variable: "--fuente-texto", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--fuente-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITIO.tituloCorto,
    template: "%s | Formalizar con inteligencia artificial",
  },
  description: `${SITIO.tituloLargo}. Objeto Digital de Conocimiento de ${SITIO.autor}, ${SITIO.programa}, ${SITIO.institucion}.`,
  authors: [{ name: SITIO.autor }],
};

export const viewport: Viewport = {
  themeColor: "#0e0f0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${texto.variable} ${mono.variable}`}>
      <body>
        <Movimiento>
          <Marco>{children}</Marco>
        </Movimiento>
      </body>
    </html>
  );
}
