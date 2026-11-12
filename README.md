# ODC: Inteligencia artificial para formalizar conocimiento científico

Objeto Digital de Conocimiento de Wilson Alfonso Díaz Capador para el curso Ciencia, Tecnología e Innovación de la Especialización en Inteligencia Artificial, Universidad de Cundinamarca, Extensión Fusagasugá.

Son 20 pantallas: portada, resultado y población, menú, siete módulos con su actividad, evaluación de ocho ítems, cierre, referencias y créditos. Es solo front: no tiene servidor ni base de datos. El progreso de cada estudiante se guarda en su propio navegador.

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
| Ítems de la evaluación | `components/pantallas/Evaluacion.tsx` |
| Cierre, referencias y créditos | `components/pantallas/Final.tsx` |
| Colores y estilos | `app/globals.css` |

El logro se calcula en `lib/progreso.ts`: 7 de 8 aciertos (al menos 80 %) y la decisión justificada del módulo de apropiación, con 15 palabras como mínimo.

## Voz del guía

Cada pantalla tiene un texto para el guía. Si no hay audio grabado, lo lee la síntesis de voz del navegador, y la voz depende del equipo de cada estudiante. La transcripción siempre queda visible bajo el botón.

Para usar audios grabados:

1. Guarda los archivos en `public/audio/`, por ejemplo `pantalla-04.mp3`.
2. Regístralos en `AUDIOS`, en `lib/sitio.ts`:

   ```ts
   export const AUDIOS: Record<number, string> = {
     4: "/audio/pantalla-04.mp3",
   };
   ```

Las pantallas registradas muestran un reproductor de audio. Las demás siguen con la voz del navegador.

## Licencia

El contenido se comparte con la licencia [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Si se cambia, se cambia en `lib/sitio.ts` y queda actualizada en el pie de página y en los créditos.
