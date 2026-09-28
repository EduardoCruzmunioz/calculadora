// --- FRAMEWORK DE TESTS UNITARIOS BÁSICO ---
const assert = (condicion, mensaje) => {
  if (!condicion) {
    console.error(`❌ TEST FALLIDO: ${mensaje}`);
  } else {
    console.log(`✅ TEST PASADO: ${mensaje}`);
  }
};

const correrTest = (nombre, secuencia, resultadoEsperado) => {
  resetear(); // Asegurarnos de limpiar el estado antes de cada test

  // Ejecutamos la secuencia de botones simulando la entrada del usuario
  secuencia.forEach(boton => procesarEntrada(boton));

  const resultadoReal = pantallaResultado.textContent.replace(",", ".");
  
  assert(
    resultadoReal === resultadoEsperado, 
    `[${nombre}] Esperaba ${resultadoEsperado}, pero obtuve ${resultadoReal}`
  );
};

// --- SUITE DE TESTS ---
const ejecutarTests = () => {
  console.log("🚀 Iniciando suite de tests unitarios...");

  // Test 1: Operación básica
  correrTest("Suma básica", ["4", "3", "+", "3", "equals"], "46");

  // Test 2: Cambio de signo tras un operador (43 + -3)
  correrTest("Suma con número negativo (43 + -3)", ["4", "3", "+", "sign", "3", "equals"], "40");

  // Test 3: Cambio de signo antes de operar
  correrTest("Restar número negativo (-5 - -3)", ["sign", "5", "-", "sign", "3", "equals"], "-2");

  // Test 4: Módulo (%)
  correrTest("Módulo (345 % 43)", ["3", "4", "5", "%", "4", "3", "equals"], "1");

  // Test 5: Operaciones encadenadas sin pulsar igual
  correrTest("Encadenamiento (5 * 4 - 2)", ["5", "*", "4", "-", "2", "equals"], "18");

  // Test 6: Decimales y límite de 2 decimales
  correrTest("Límite decimal (10 / 3)", ["1", "0", "÷", "3", "equals"], "3.33");

  // Test 7: División por cero
  correrTest("División por cero", ["5", "÷", "0", "equals"], "Error");

  // Test 8: Reescritura de operador (Pulsar + y luego -)
  correrTest("Reemplazo de operador", ["1", "0", "+", "-", "2", "equals"], "8");
  
  // Test 9: Comas múltiples bloqueadas
  correrTest("Comas múltiples", ["1", ".", ".", "5", "+", "2", "equals"], "3.5");

  console.log("🏁 Tests finalizados.");
};

// Ejecutar automáticamente al cargar
setTimeout(ejecutarTests, 500);
