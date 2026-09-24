# Calculadora Web 🧮

Una calculadora web moderna, funcional y responsiva, diseñada para imitar el comportamiento y la estética de una aplicación móvil nativa y la clásica calculadora de escritorio. 

Desarrollada con **HTML**, **CSS** y **JavaScript (Vanilla)**.

🌐 **[Ver en vivo (Demo)](https://eduardocruzdev-calculadora.netlify.app/)** *(Asegúrate de que este enlace coincida con el nombre que le diste en Netlify)*

## ✨ Características Principales

- **Diseño Adaptativo (Responsive):** 
  - 📱 En dispositivos móviles se expande para ocupar el 100% de la pantalla, adaptando los márgenes de seguridad (Safe Areas). Al girar el móvil adopta un diseño apaisado (5x4).
  - 💻 En escritorio se presenta en una "caja" flotante y ergonómica.
- **Soporte Completo para Teclado:** Utiliza los números, el `Intro`, `Escape` y los operadores del teclado físico de tu PC para máxima fluidez.
- **Auto-Ajuste de Fuente:** El tamaño de los números se encoge dinámicamente si la cifra crece para que nunca se desborden de la pantalla, tal y como hace iOS/Windows.
- **Formateo Europeo:** La pantalla aplica automáticamente puntos `.` como separadores de miles y coma `,` para decimales en tiempo real.
- **Memoria Operativa en el Igual:** Pulsar el botón `=` repetidas veces re-aplica y continúa la última operación matemática de forma indefinida.
- **Control de Errores y Precisión:** Evita divisiones por cero (mostrando `Error`), limita la visualización a dos decimales y corrige los fallos nativos de precisión de JavaScript (como el famoso `0.1 + 0.2`).
- **Experiencia Nativa (UX):** Bloqueo de la selección de texto para evitar sombreados molestos, y sistema de **"mantener pulsado"** en el botón de borrar para eliminar grandes cantidades de texto de forma continua y fluida.

## 🛠️ Tecnologías

* **HTML5:** Estructura semántica, inserción de SVGs en línea.
* **CSS3:** CSS Grid Layout, Flexbox, y Media Queries condicionales según el dispositivo.
* **JavaScript (ES6):** Modularizado mediante el patrón "Divide y Vencerás" para la gestión de estados, eventos del DOM (mouse, touch y keyboard) e intervalos asíncronos.

## 🚀 Instalación y Uso local

1. Clona el repositorio en tu ordenador:
   ```bash
   git clone https://github.com/EduardoCruzmunioz/calculadora.git
   ```
2. Abre la carpeta del proyecto.
3. Ejecuta directamente el archivo `index.html` en tu navegador favorito. ¡No requiere de servidor web ni instalación de paquetes (`npm`)!

## 👨‍💻 Autor

- **Eduardo Cruz** 
- [Visita mi Portfolio Web](https://eduardocruzdev.netlify.app/)
