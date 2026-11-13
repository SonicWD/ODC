"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Resorte que usan por defecto las animaciones hechas con Motion.
export const RESORTE = { type: "spring", stiffness: 420, damping: 34 } as const;

// Con reducedMotion="user", quien pide menos movimiento en su sistema no ve desplazamientos,
// escalas ni reacomodos: solo cambios de opacidad.
export function Movimiento({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={RESORTE}>
      {children}
    </MotionConfig>
  );
}
