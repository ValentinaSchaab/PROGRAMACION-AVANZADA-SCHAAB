console.log("-----P1-----");
// punto 1 agregar y eliminar elementos.
const frutas = ["manzana", "banana", "pera"];

console.log("Original:", frutas);

frutas.push("naranja");
console.log("Después de push:", frutas);

frutas.pop();
console.log("Después de pop:", frutas);

console.log("-----P2-----");
// punto 2 array bidimensional.
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matriz[1][1]);

console.log("-----P3-----");
// punto 3 iterar sobre un array
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

console.log("-----P4-----");
// punto 4 uso de map
function elevarAlCuadrado(numeros) {
  return numeros.map(numero => numero * numero);
}

console.log(elevarAlCuadrado([1, 2, 3, 4, 5]));

console.log("-----P5-----");
// punto 5 uso de filter (filtrar mayores de)
function filtrarMayoresDe(numeros, valorReferencia) {
  return numeros.filter(numero => numero > valorReferencia);
}
// .filter() recorre cada elemento del array y evalúa una condición.

console.log(filtrarMayoresDe([3, 8, 15, 2, 20, 7], 10));

console.log("-----P6-----");
// punto 6 uso de reduce (sumar elementos)
function sumarElementos(numeros) {
  return numeros.reduce((acumulador, numero) => acumulador + numero, 0);
}
// reduce recorre el array y va acumulando un resultado, hasta quedarse con un solo valor final.

console.log(sumarElementos([1, 2, 3, 4, 5]));

console.log("-----P7-----");
// punto 7 uso de some
const numeros = [3, 7, 5, 12, 8];
//some revisa si al menos un elemento del array cumple la condicion.

console.log(numeros.some(numero => numero > 10));

console.log("-----P8-----");
// punto 8 uso de every
const numeros2 = [4, 8, 15, 16, 23];
// every revisa si todos los elementos del array cumplen la condicion

console.log(numeros2.every(numero => numero > 0));

console.log("-----P9-----");
// punto 9 uso de find (array de objetos)

const personas = [
  { nombre: "Lucas", edad: 22 },
  { nombre: "Marina", edad: 35 },
  { nombre: "Diego", edad: 28 },
  { nombre: "Sofía", edad: 41 }
];

const mayorDe30 = personas.find(persona => persona.edad > 30);
console.log(mayorDe30);

console.log("-----P10-----");
// punto 10 uso de sort (ordenar alfabeticamente)
const palabras = ["banana", "kiwi", "naranja", "arándano", "mango"];

console.log("Antes:", palabras);

palabras.sort();
// sort ordena los elementos del arrays directamente sobre el original

console.log("Después:", palabras);
