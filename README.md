# Calculadora Web

Una calculadora web moderna, funcional y responsiva, disenada para ofrecer una experiencia de usuario equivalente a la de una aplicacion nativa, tanto en entornos de escritorio como en dispositivos moviles.

El proyecto ha sido desarrollado desde cero utilizando tecnologias web estandar (Vanilla HTML, CSS y JavaScript), sin dependencias ni frameworks externos, enfocandose en el rendimiento, la accesibilidad y un codigo limpio y modular.

**[Ver en vivo (Demo)](https://eduardocruzdev-calculadora.netlify.app/)**

---

## Caracteristicas Principales

*   **Diseno Adaptativo (Responsive):**
    *   **Escritorio:** La interfaz se renderiza en un panel flotante y ergonomico, inspirado en las proporciones de la calculadora nativa de sistemas operativos de escritorio.
    *   **Dispositivos Moviles:** La calculadora se expande automaticamente para ocupar el 100% de la pantalla. Implementa ajustes especificos para respetar los margenes de seguridad de sistemas operativos modernos (`safe-area-insets`) y se adapta dinamicamente al cambiar a orientacion horizontal modificando su cuadricula a un layout de 5x4.
*   **Soporte de Teclado Fisico:** Integracion completa con eventos de teclado. Permite realizar calculos de manera fluida utilizando el teclado numerico, operadores, la tecla de retroceso para borrar digitos individuales y la tecla de intro para accionar el calculo final.
*   **Auto-Ajuste Dinamico de Fuente:** El tamano de los caracteres en la pantalla principal de resultados se reduce automaticamente a medida que aumenta la longitud de la cifra. Esto garantiza que los numeros extensos nunca se desborden del contenedor visual.
*   **Formateo de Numeros (Estandar Europeo):** Aplicacion en tiempo real de separadores de miles mediante puntos y separacion decimal mediante coma, mejorando significativamente la legibilidad de cifras de gran tamano.
*   **Memoria de Operaciones en Cadena:** Presionar el boton de igualdad de forma consecutiva almacena en memoria el ultimo operador y el ultimo valor introducido, permitiendo aplicar calculos incrementales de forma automatica (por ejemplo: 5 + 3 = 8, = 11, = 14).
*   **Control de Precision y Manejo de Errores:**
    *   El motor central previene los errores de precision en coma flotante inherentes a JavaScript truncando y redondeando los resultados internos a un maximo estricto de dos decimales.
    *   Manejo de operaciones matematicas invalidas, bloqueando divisiones por cero mediante retornos de error controlados en la interfaz.
*   **Borrado Continuo Asincrono:** En lugar de requerir multiples pulsaciones manuales para eliminar varios digitos, el usuario puede mantener presionado el boton de borrado para accionar una limpieza de caracteres de forma rapida y continua. Esta funcion tiene soporte cruzado para eventos de raton y pantallas tactiles.
*   **Interacciones Nativas (UX):** Desactivacion total de la seleccion de texto en los paneles y botones, eliminacion del retraso habitual de 300 milisegundos en interfaces tactiles web, y prevencion de accesos directos indeseados del navegador al interactuar con el teclado.

---

## Arquitectura y Decisiones Tecnicas

### HTML5
*   Estructura semantica clara y anidada logicamente.
*   Uso extendido de etiquetas meta para forzar el renderizado a pantalla completa e inhibir el zoom accidental en dispositivos moviles.

### CSS3
*   **CSS Grid:** Utilizado como pilar fundamental para establecer la cuadricula bidimensional de los botones. Esto simplifica enormemente la reestructuracion del teclado numerico cuando el dispositivo cambia de orientacion.
*   **Flexbox:** Empleado para la alineacion dinamica de los componentes secundarios dentro de la pantalla, como el historial y el resultado principal.
*   **Unidades Relativas Modernas:** Uso intensivo de funciones CSS como `clamp()` para interpolar margenes y tamanos de fuente de forma fluida dependiendo de las dimensiones absolutas de la ventana de renderizado.

### JavaScript (ES6+)
*   **Arquitectura "Divide y Venceras":** El codigo esta estrictamente separado por bloques logicos de responsabilidad. El gestor principal de eventos captura las entradas y delega la ejecucion a controladores especificos, lo que convierte a la aplicacion en altamente escalable e inmune a las tipicas estructuras condicionales anidadas de forma infinita.
*   **Expresiones Regulares (RegEx):** Implementadas de manera eficiente y aislada en el motor de formateo visual para inyectar los separadores de millar leyendo los segmentos numericos de atras hacia adelante.
*   **Controladores de Intervalo:** Integracion avanzada de funciones temporales nativas de JavaScript acopladas a limpiezas de contexto para gestionar los bucles de interaccion asincronos exigidos por el borrado continuo.

---

## Instalacion y Uso Local

El proyecto no cuenta con dependencias externas, modulos NPM, ni requiere un proceso de compilacion o transpilacion.

1. Clona el repositorio en un directorio local:
   ```bash
   git clone https://github.com/EduardoCruzmunioz/calculadora.git
   ```
2. Accede al directorio recien clonado:
   ```bash
   cd calculadora
   ```
3. Ejecuta directamente el archivo `index.html` en el navegador de tu eleccion.

---

## Autor

**Eduardo Cruz**
Visita mi Portfolio en: https://eduardocruzdev.netlify.app/
