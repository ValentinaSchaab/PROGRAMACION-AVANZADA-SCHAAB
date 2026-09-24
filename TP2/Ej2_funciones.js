console.log("-----P1-----");
// punto 1 funcion suma
function sumar(nro1, nro2) {
    return nro1 + nro2;
}

console.log(sumar(5, 3));
console.log(sumar(10, -2));
console.log(sumar(0, 0));

console.log("-----P2-----");
// punto 2 funcion multiplicacicon
function multiplicar(nro1, nro2) {
    return nro1 * nro2;
}

console.log(multiplicar(4, 3));
console.log(multiplicar(7, 0));
console.log(multiplicar(-2, 5))

console.log("-----P3-----");
// punto 3 funcion con parametro por defecto.
function saludar(nombre = "invitado") {
    return `Hola, ${nombre}`;
}
// si no pasas ningun valor a nombre, usa "invitado"

console.log(saludar("Martina"));
console.log(saludar());

console.log("-----P4-----");
// punto 4 funcion que devuelve un objeto
function crearPersona(nombre, edad) {
    return {
        nombre: nombre,
        edad: edad
    };
}

const persona1 = crearPersona("Lucas", 25);
console.log(persona1);

const persona2 = crearPersona("Sofía", 30);
console.log(persona2);

console.log("-----P5-----");
// punto 5 funcion que modifica un objeto
function actualizarEdad(persona, nuevaEdad) {
    persona.edad = nuevaEdad;
}
// no se pasa una copia, se pasa una referencia al mismo objeto en memoria.

console.log("Antes:", persona1);

actualizarEdad(persona1, 26);

console.log("Después:", persona1);

console.log("-----P6-----");
// punto 6 funcion recursiva.
function factorial(n) {
    if (n === 0 || n === 1) {
      return 1;
  }
  return n * factorial(n - 1);
}

console.log(factorial(5));
console.log(factorial(0));
console.log(factorial(3))

console.log("-----P7-----");
// punto 7 funcion con funcion interna
function despedir() {
  function adios() {
    return "Adiós, que tengas un buen día!";
  }
  return adios();
}
// sirve para cuando tenes q usar la funcion adentro, para no ensuciar el resto del codigo.

console.log(despedir())

console.log("-----P8-----");
// punto 8 funcion que usa otra funcion.
function procesarArray(array, funcion) {
  return array.map(funcion);
}
// map es metodo de arrays que aplica la funcion q le pasa a cada elemento
// y devuelve un array nuevo con los resultados, no modifica el original.

function multiplicarPorDos(numero) {
  return numero * 2;
}

const numeros = [1, 2, 3, 4, 5];
const resultado = procesarArray(numeros, multiplicarPorDos);
console.log(resultado);

console.log("-----P9-----");
// punto 9 funcion que devuelve otra funcion
function crearMultiplicador(x) {
  return function(numero) {
    return numero * x;
  };
}
// devuelve una funcion nueva q recuerda el valor de x

const multiplicarPor3 = crearMultiplicador(3);
console.log(multiplicarPor3(5));
console.log(multiplicarPor3(10));

const multiplicarPor10 = crearMultiplicador(10);
console.log(multiplicarPor10(4))

console.log("-----P10-----");
// punto 10 funcion anonima (sin nombre propio)
const sumarAnonima = function(a, b) {
  return a + b;
};
// en vez de nombrarla, la guardamos directamente en una variable, y a partir de ahi la llamamos.

console.log(sumarAnonima(4, 6));
console.log(sumarAnonima(-2, 8));