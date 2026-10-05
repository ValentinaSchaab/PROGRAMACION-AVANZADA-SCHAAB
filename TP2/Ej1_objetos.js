console.log("-----P1-----");
// punto 1 crear objeto basico
const libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  añoDePublicacion: 1967
};

console.log(libro.titulo);
console.log(libro.autor);
console.log(libro.añoDePublicacion);

console.log("-----P2-----");
// punto 2 anidacion de objeto
const estudiante = {
    nombre: "Valentina",
    edad: 22,
    direccion: {
        calle: "Av. monumento 123",
        ciudad: "Concepcion del Uruguay",
        pais: "Argentina"
    }
};

console.log("Direccion completa:");
console.log(estudiante.direccion);

console.log("-----P3-----");
// punto 3 metodos en objetos
libro.descripcion = function() {
    return `"${libro.titulo}" fue escrito por ${libro.autor}`;
};

console.log(libro.descripcion());

console.log("-----P4-----");
// punto 4 iteracion sobre propiedades de una objeto
const producto = {
    nombre: "Notebook",
    precio: 1500000,
    disponible: true
};

// recorre los nombres de las propiedades del objeto una por una.
for (let clave in producto) {
    console.log(clave, ":", producto[clave]);
}

console.log("-----P5-----");
// punto 5 actualizacion de propiedades
console.log("Antes:", producto);

producto.precio = 2000000;

console.log("Despues:", producto);

console.log("-----P6-----");
// punto 6 comprobacion de propiedades
function tienePropiedad(objeto, nombrePropiedad) {
    return objeto.hasOwnProperty(nombrePropiedad);
}
// has0wnProperty es un metodo q devuelve true o false segun si esa prop existe en el obj
console.log(tienePropiedad(producto, "precio"));      // true
console.log(tienePropiedad(producto, "descuento"));   // false

console.log("-----P7-----");
// punto 7 eliminacion de propiedades
console.log("Objeto antes: ", producto);

delete producto.disponible;

console.log("Despues:", producto);

console.log("-----P8-----");
// punto 8 combinar objetos
const persona1 = {
    nombre: "Ana",
    edad : 28
};

const persona2 = {
    ciudad: "buenos aires",
    profesion: "ingeniera" 
};

const personaCombinada = Object.assign({}, persona1, persona2);
// copia las propiedades de uno o mas objetos dentro de dest. (destino, ob1, ob2)
// si tuvieran una prop con el mismo nombre, gana la del ultimo objeto
console.log(personaCombinada);

console.log("-----P9-----");
// punto 9 copiar objetos
const copiaEstudiante = JSON.parse(JSON.stringify(estudiante));

// json.stringify convierte el obj en un texto string
//json.parse toma ese tedxto y lo convierte de nuevo en obj, pero como un obj nuevo.
// si haces const copiaestudiante = estudiante no copia nada, seria otro nombre q apunta al mismo objeto.
copiaEstudiante.direccion.ciudad = "Rosario";

console.log("Original:", estudiante.direccion.ciudad);
console.log("Copia:", copiaEstudiante.direccion.ciudad);

console.log("-----P10-----");
// punto 10 metodos getters y setters
// getter(Get) se ejecuta al leer una propiedad, se usa sin llamarla con ()
// setter(set) se ejecuta al asignar un valor a una propiedad, permite validar o transformar el dato antes de guardarlo.
// se usan para controlar el acceso a una propiedad por fuera dejando la logica interna oculta pero sin cambiar como se usa la prop desde afuera.

// creamos una versión nueva de libro con Object.defineProperty, para no romper el libro que ya tengo.
let _año = libro.añoDePublicacion;

Object.defineProperty(libro, "añoDePublicacion", {
  get: function() {
    return _año;
  },
  set: function(nuevoAño) {
    _año = nuevoAño;
  }
});

console.log("Año antes:", libro.añoDePublicacion);

libro.añoDePublicacion = 2020;

console.log("Año después:", libro.añoDePublicacion);