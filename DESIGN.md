# Sistema visual del ODC (versión 2)

La idea del diseño es que el recurso se vea como lo que enseña: una prueba que se revisa paso a paso. Por eso la portada muestra una prueba que recibe una marca por cada paso, los números van en tipografía de código y el logro final cierra con el sello Q.E.D.

La referencia de partida fue el DESIGN.md de VoltAgent, de la colección [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (licencia MIT): lienzo casi negro, un solo acento verde, bordes finos en lugar de sombras y rótulos en mayúsculas espaciadas. El verde también es el color de la Universidad de Cundinamarca y el ámbar retoma su amarillo.

## Color

Los colores están al inicio de `app/globals.css`, en `:root`.

| Variable | Valor | Uso |
| --- | --- | --- |
| `--lienzo` | `#0e0f0e` | Fondo de la página |
| `--superficie` | `#151716` | Tarjetas, fichas y actividades |
| `--superficie-2` | `#1c1f1d` | Opciones y elementos dentro de una tarjeta |
| `--hondo` | `#0a0b0a` | Campos de texto, zonas de arrastre y la prueba de la portada |
| `--linea` / `--linea-fuerte` | `#2b2f2c` / `#414642` | Bordes |
| `--tinta` | `#f2f2f2` | Títulos y texto destacado |
| `--texto` | `#c9cdca` | Texto corrido |
| `--apagado` | `#9aa19d` | Notas y rótulos secundarios |
| `--verde` | `#00d992` | Acento: botones, avance, aciertos, columna Beneficio |
| `--ambar` | `#f2c230` | Avisos y columna Limitación |
| `--azul` | `#7cb7ff` | Columna Validación |
| `--rojo` | `#ff7a70` | Fallos y acciones que borran |

El verde es el único color de acento. Ámbar, azul y rojo solo aparecen con un significado: aviso, validación y error.

## Tipografía

- **Inter** para todo el texto. Títulos en peso 500 con espaciado negativo.
- **JetBrains Mono** para números de pantalla, rótulos en mayúsculas, contadores y código.

## Forma

- Radio de 6 px en botones y de 8 px en tarjetas. Las píldoras se reservan para estados.
- Bordes de 1 px. No hay sombras, salvo el brillo verde de la prueba de la portada.
- En escritorio, el título de la pantalla queda fijo a la izquierda y el contenido corre a la derecha.
- La barra inferior reúne Atrás, el guía con voz y Seguir, y está siempre a la vista.

## Movimiento

Se usan dos capas: **View Transitions** del navegador para cambiar de pantalla y **Motion** (`motion/react`) para interacciones dentro de la pantalla. El contenedor `Movimiento` aplica `reducedMotion="user"`.

| Dónde | Qué hace |
| --- | --- |
| Cambio de pantalla | Seguir desliza hacia adelante y Atrás hacia atrás. Cabecera y barra inferior se quedan quietas. |
| Avance | Una barra continua crece con Motion según la posición en el recorrido (sin contar pantallas fijas). |
| Portada | El título entra palabra por palabra. La prueba aparece línea por línea. |
| Ordenar | Arrastre por la agarradera (`Reorder`) o flechas con teclado. |
| Serie / laboratorio | Entrada de tarjeta; en la serie también se puede deslizar a izquierda/derecha. |
| Clasificar | Las frases se reacomodan con layout animado al pasar a una columna. |
| Evaluación | Cada pregunta entra y sale; el anillo del puntaje se traza; con el logro cae Q.E.D. |
| Guía con voz | Las barras y el avatar se mueven solo mientras habla. |

Reglas:

1. Si el sistema pide menos movimiento, Motion reduce a cambios de opacidad y el CSS no aplica desplazamientos.
2. Ninguna animación automática dura más de cinco segundos. La del guía se detiene con Pausar o Detener.
3. Toda actividad arrastrable tiene alternativa con botones o teclado.
