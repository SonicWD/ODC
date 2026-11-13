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

| Dónde | Qué hace |
| --- | --- |
| Cambio de pantalla | Seguir desliza el contenido hacia la izquierda y Atrás hacia la derecha. La cabecera y la barra inferior no se mueven. |
| Portada | El título entra palabra por palabra. La prueba aparece línea por línea y cada paso recibe su marca. Termina sola en unos cuatro segundos y tiene botón Repetir. |
| Contenido | Los bloques aparecen al entrar en la ventana. Las fichas se despliegan. |
| Actividades | El acierto rebota y el fallo se sacude una vez. |
| Evaluación | El anillo del puntaje se traza y, con el logro cumplido, cae el sello Q.E.D. |
| Guía con voz | Las barras de sonido y el avatar se mueven solo mientras habla. |

Reglas:

1. Todo el movimiento está dentro de `@media (prefers-reduced-motion: no-preference)`. Si el estudiante pide reducir el movimiento, no se anima nada y cada elemento queda en su estado final.
2. Ninguna animación automática dura más de cinco segundos. La única que se repite es la del guía, que se detiene con Pausar o Detener.
3. Lo que el navegador no admita se omite sin afectar el contenido: aparición al desplazar, despliegue de fichas y transiciones de vista.
