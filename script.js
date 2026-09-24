// --- REFERENCIAS AL DOM ---
const pantallaHistorial = document.querySelector(".screen-history");
const pantallaResultado = document.querySelector(".screen-result");
const botones = document.querySelectorAll(".btn");
const botonBorrar = document.getElementById("btn-delete");

// --- ESTADO DE LA CALCULADORA ---
let acumulador = "";
let primerNumero = null;
let operador = null;
let historial = "";
let ultimoValor = "";
let resultadoMostrado = false;
let ultimoOperando = null;
let intervaloBorrado;
let tiempoEsperaBorrado;

// --- FUNCIONES DE UTILIDAD VISUAL Y LÓGICA ---
const ajustarTamañoFuente = () => {
  let tamañoFuente = 50;
  pantallaResultado.style.fontSize = `${tamañoFuente}px`;
  while (pantallaResultado.scrollWidth > pantallaResultado.clientWidth && tamañoFuente > 14) {
    tamañoFuente -= 1;
    pantallaResultado.style.fontSize = `${tamañoFuente}px`;
  }
};

const actualizarPantalla = (texto) => {
  if (texto === "Error" || texto === "0" || texto === "") {
    pantallaResultado.textContent = texto === "" ? "0" : texto;
  } else {
    const partes = texto.split(".");
    let entero = partes[0];
    const esNegativo = entero.startsWith("-");
    if (esNegativo) entero = entero.slice(1);
    
    const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const finalEntero = (esNegativo ? "-" : "") + enteroFormateado;
    
    if (partes.length > 1) {
      pantallaResultado.textContent = finalEntero + "," + partes[1];
    } else if (texto.includes(".")) {
      pantallaResultado.textContent = finalEntero + ",";
    } else {
      pantallaResultado.textContent = finalEntero;
    }
  }
  ajustarTamañoFuente();
};

const resetear = () => {
  acumulador = "";
  primerNumero = null;
  operador = null;
  historial = "";
  ultimoValor = "";
  resultadoMostrado = false;
  ultimoOperando = null;
  pantallaHistorial.textContent = "";
  actualizarPantalla("0");
};

const calcular = (a, b, op) => {
  let res;
  switch (op) {
    case "+": res = a + b; break;
    case "-": res = a - b; break;
    case "*": res = a * b; break;
    case "÷": 
      if (b === 0) return "Error";
      res = a / b; break;
    default: res = b; break;
  }
  return Math.round(res * 100) / 100; // Limitar a 2 decimales el cálculo
};

// --- MANEJADORES DE ACCIONES (DIVIDE Y VENCERÁS) ---
const manejarNumero = (valor) => {
  if (resultadoMostrado) resetear();
  if (acumulador.length >= 32) return;
  if (acumulador.includes(".")) {
    if (acumulador.split(".")[1].length >= 2) return; // Límite visual de 2 decimales
  }
  acumulador += valor;
  actualizarPantalla(acumulador);
  ultimoValor = valor;
};

const manejarDecimal = () => {
  if (resultadoMostrado) resetear();
  if (acumulador.includes(".")) return;
  if (acumulador.length >= 32) return;
  acumulador = acumulador === "" ? "0." : acumulador + ".";
  actualizarPantalla(acumulador);
  ultimoValor = ".";
};

const manejarSigno = () => {
  if (acumulador === "") return;
  acumulador = String(-Number(acumulador));
  actualizarPantalla(acumulador);
  ultimoValor = "sign";
};

const manejarOperador = (valor) => {
  const esOperador = ["+", "-", "*", "÷"].includes(ultimoValor);
  
  if (esOperador) {
    historial = historial.slice(0, -2) + ` ${valor} `;
    operador = valor;
    pantallaHistorial.textContent = historial.replace(/\./g, ",");
    ultimoValor = valor;
    return;
  }

  if (resultadoMostrado) {
    operador = valor;
    historial = `${primerNumero} ${valor} `;
    acumulador = "";
    pantallaHistorial.textContent = historial.replace(/\./g, ",");
    actualizarPantalla(String(primerNumero));
    ultimoValor = valor;
    resultadoMostrado = false;
    return;
  }

  if (acumulador === "") return;

  if (primerNumero === null) {
    primerNumero = Number(acumulador);
  } else {
    const total = calcular(primerNumero, Number(acumulador), operador);
    if (total === "Error") return resetear(), actualizarPantalla("Error");
    primerNumero = total;
  }

  operador = valor;
  historial = `${primerNumero} ${operador} `;
  pantallaHistorial.textContent = historial.replace(/\./g, ",");
  actualizarPantalla(String(primerNumero));
  acumulador = "";
  ultimoValor = valor;
};

const manejarIgual = () => {
  if (operador === null || primerNumero === null) return;

  let segundoNumero;
  if (acumulador !== "") {
    segundoNumero = Number(acumulador);
    ultimoOperando = segundoNumero;
  } else if (ultimoOperando !== null) {
    segundoNumero = ultimoOperando;
  } else {
    segundoNumero = primerNumero;
    ultimoOperando = segundoNumero;
  }

  const total = calcular(primerNumero, segundoNumero, operador);
  if (total === "Error") return resetear(), actualizarPantalla("Error");

  const primerStr = String(primerNumero).replace(".", ",");
  const ultimoStr = String(segundoNumero).replace(".", ",");
  pantallaHistorial.textContent = `${primerStr} ${operador} ${ultimoStr}`;
  actualizarPantalla(String(total));

  primerNumero = total;
  acumulador = "";
  resultadoMostrado = true;
};

const manejarBorrado = () => {
  if (resultadoMostrado) return resetear();
  if (acumulador !== "") {
    acumulador = acumulador.slice(0, -1);
    actualizarPantalla(acumulador === "-" || acumulador === "" ? "0" : acumulador);
    if (acumulador === "-") acumulador = "";
  }
  ultimoValor = "del";
};

// --- ENRUTADOR PRINCIPAL ---
const procesarEntrada = (valor) => {
  if (valor === "ac") return resetear();
  if (valor === "del") return; // Gestionado por eventos prolongados
  if (valor === "sign") return manejarSigno();
  if (valor === ".") return manejarDecimal();
  if (valor === "equals") return manejarIgual();
  if (["+", "-", "*", "÷"].includes(valor)) return manejarOperador(valor);
  if (!isNaN(valor)) return manejarNumero(valor);
};

// --- LISTENERS DE EVENTOS ---
botones.forEach(boton => boton.addEventListener("click", () => procesarEntrada(boton.value)));

// Botón de borrar (mantener pulsado)
const iniciarBorradoContinuo = (e) => {
  e.preventDefault();
  manejarBorrado();
  tiempoEsperaBorrado = setTimeout(() => intervaloBorrado = setInterval(manejarBorrado, 100), 400);
};

const detenerBorradoContinuo = () => {
  clearTimeout(tiempoEsperaBorrado);
  clearInterval(intervaloBorrado);
};

botonBorrar.addEventListener("touchstart", iniciarBorradoContinuo);
botonBorrar.addEventListener("touchend", detenerBorradoContinuo);
botonBorrar.addEventListener("touchcancel", detenerBorradoContinuo);
botonBorrar.addEventListener("mousedown", iniciarBorradoContinuo);
botonBorrar.addEventListener("mouseup", detenerBorradoContinuo);
botonBorrar.addEventListener("mouseleave", detenerBorradoContinuo);

// Teclado físico
document.addEventListener("keydown", (e) => {
  const tecla = e.key;
  if (tecla >= "0" && tecla <= "9") document.getElementById(`btn-${tecla}`).click();
  else if (tecla === "Backspace") manejarBorrado();
  else if (tecla === "," || tecla === ".") document.getElementById("btn-decimal").click();
  else if (tecla === "Enter" || tecla === "=") { e.preventDefault(); document.getElementById("btn-equals").click(); }
  else if (tecla === "+") document.getElementById("btn-add").click();
  else if (tecla === "-") document.getElementById("btn-subtract").click();
  else if (tecla === "*") document.getElementById("btn-multiply").click();
  else if (tecla === "/") { e.preventDefault(); document.getElementById("btn-divide").click(); }
  else if (tecla === "Escape") document.getElementById("btn-clear").click();
});
