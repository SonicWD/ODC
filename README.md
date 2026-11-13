# ODC: Inteligencia artificial para formalizar conocimiento científico

Objeto Digital de Conocimiento de Wilson Alfonso Díaz Capador para el curso Ciencia, Tecnología e Innovación de la Especialización en Inteligencia Artificial, Universidad de Cundinamarca, Extensión Fusagasugá.

El recorrido no está limitado a 20 pantallas: cada una tiene un nombre en la URL (`/beneficios/`, `/galeria/`, …) y una función clara. Incluye introducción interactiva, módulos con actividad, galería de diez casos, laboratorio de columnas, evaluación de ocho ítems, cierre, referencias y créditos. Es solo front: el progreso vive en el navegador del estudiante.

Esta es la versión 2 (tema oscuro + Motion). El logro sigue siendo 7 de 8 y la decisión justificada.

- Evaluación: dos cuestionarios paralelos de ocho ítems con caso y tres opciones.
- Actividades: ordenar, clasificar, opción múltiple sobre casos, serie con deslizamiento, frase y decisión.
- Galería y laboratorio: lectura interactiva de los diez casos de asistentes de la matriz.
- Animación: `motion/react` (reordenar, deslizar, revelados) + View Transitions entre pantallas, con respeto a `prefers-reduced-motion`.

El sistema visual está descrito en `DESIGN.md`.

## Requisitos

Node.js 20.9 o superior.

## Uso

```bash
npm install
npm run dev      # desarrollo, en http://localhost:3000
npm run lint
npm run build    # genera el sitio estático en la carpeta out/
npm run preview  # sirve out/ para revisarlo antes de publicar
```

## Publicar

`npm run build` deja en `out/` un sitio estático que funciona en cualquier alojamiento.

- **Vercel o Netlify.** Importa el repositorio. No hay que configurar nada.
- **GitHub Pages.** El sitio queda en `https://usuario.github.io/nombre-del-repo/`, así que hay que compilar con esa subruta y publicar la carpeta `out/`:

  ```bash
  # PowerShell
  $env:NEXT_PUBLIC_BASE_PATH = "/nombre-del-repo"; npm run build
  ```

  ```bash
  # bash
  NEXT_PUBLIC_BASE_PATH=/nombre-del-repo npm run build
  ```

## Dónde está cada cosa

| Qué cambiar | Archivo |
| --- | --- |
| Título, autor, programa, fecha, versión, licencia, resultado de aprendizaje, población | `lib/sitio.ts` |
| Título de cada pantalla, texto de la voz del guía y menú | `lib/pantallas.ts` |
| Referencias en APA 7 | `lib/referencias.ts` |
| Contenido de los módulos | `components/pantallas/Modulos.tsx` |
| Enunciados y retroalimentación de las actividades | `components/pantallas/Actividades.tsx` |
| Ítems de la evaluación (los dos cuestionarios) | `lib/evaluacion.ts` |
| Tipos de actividad (ordenar, arrastrar, opciones, serie, frase) | `components/actividades/` |
| Cierre, referencias y créditos | `components/pantallas/Final.tsx` |
| Cabecera, avance y barra inferior (Atrás, guía, Seguir) | `components/Marco.tsx` |
| Encabezado de cada pantalla y transición entre pantallas | `components/Pantalla.tsx` |
| Prueba animada de la portada | `components/Prueba.tsx` |
| Colores, estilos y animaciones | `app/globals.css` (los colores están al inicio, en `:root`) |

El logro se calcula en `lib/progreso.ts`: 7 de 8 aciertos (al menos 80 %) y la decisión justificada del módulo de apropiación, con 15 palabras como mínimo.

## Voz del guía

Cada pantalla tiene un texto para el guía. El reproductor está en la barra inferior. Si no hay audio grabado, lo lee la síntesis de voz del navegador, y la voz depende del equipo de cada estudiante. El botón Transcripción muestra el mismo texto.

Para usar audios grabados:

1. Guarda los archivos en `public/audio/`, por ejemplo `pantalla-04.mp3`.
2. Regístralos en `AUDIOS`, en `lib/sitio.ts`:

   ```ts
   export const AUDIOS: Record<number, string> = {
     4: "/audio/pantalla-04.mp3",
   };
   ```

Las pantallas registradas muestran un reproductor de audio. Las demás siguen con la voz del navegador.

## Movimiento y accesibilidad

Todas las animaciones se apagan cuando el sistema del estudiante pide reducir el movimiento. Sin animación, cada pantalla se ve en su estado final. El deslizamiento entre pantallas usa transiciones de vista: los navegadores que no las admiten cambian de pantalla sin animar.

## Licencia

El contenido se comparte con la licencia [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Si se cambia, se cambia en `lib/sitio.ts` y queda actualizada en el pie de página y en los créditos.
