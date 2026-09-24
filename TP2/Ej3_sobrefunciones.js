console.log("-----P1-----");
// punto 1 consumo de datos desde una API
async function obtenerUsuarios() {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios = await respuesta.json();
  console.log(usuarios);
  return usuarios;
}
// async antes de function marca q esa funcion va a trabajar con operaciones q tardan
// await pausa la ejecucion de esa funcion hasta q la operacion termine y tenga una rta
// fetch url hace la peticion HTTP y devuelve una respuesta cruda
// respuesta.json convierte esa rta en un objeto/array de js q podes usar

obtenerUsuarios();

console.log("-----P2-----");
// punto 2 procesamiento de datos de una API
async function imprimirNombresDeUsuarios() {
  const usuarios = await obtenerUsuarios();
  const nombres = usuarios.map(usuario => usuario.name);
  console.log(nombres);
}
// usuarios.map recorre el array de usuarios y devuelve un array nuevo solo con la propiedad name de cada uno.

imprimirNombresDeUsuarios();

console.log("-----P3-----");
// punto 3 autenticacion simulada
 function autenticarUsuario(credenciales) {
  const usuarioValido = {
    usuario: "admin",
    contraseña: "1234"
  };

  if (
    credenciales.usuario === usuarioValido.usuario &&
    credenciales.contraseña === usuarioValido.contraseña
  ) {
    return true;
  }
  return false;
}
// definimos un usuariovalido fijo en el codigo para simular una base de datos.
// la funcion compara ambos campos contra los del usuario validio.

console.log(autenticarUsuario({ usuario: "admin", contraseña: "1234" }));
console.log(autenticarUsuario({ usuario: "admin", contraseña: "wrong" }));
console.log(autenticarUsuario({ usuario: "otro", contraseña: "1234" }));

console.log("-----P4-----");
// punto 4 transformacion de datos
function mapearUsuarios(usuarios) {
  return usuarios.map(usuario => ({
    nombre: usuario.name,
    email: usuario.email
  }));
}

async function probarMapeo() {
  const usuarios = await obtenerUsuarios();
  const usuariosMapeados = mapearUsuarios(usuarios);
  console.log(usuariosMapeados);
}

probarMapeo();

console.log("-----P5-----");
// punto 5 validacion de formularios
function validarFormulario(formulario) {
  if (
    formulario.nombre && formulario.nombre.trim() !== "" &&
    formulario.email && formulario.email.trim() !== "" &&
    formulario.password && formulario.password.trim() !== ""
  ) {
    return true;
  }
  return false;
}

console.log(validarFormulario({ nombre: "Ana", email: "ana@mail.com", password: "1234" }));
console.log(validarFormulario({ nombre: "", email: "ana@mail.com", password: "1234" }));
console.log(validarFormulario({ nombre: "Ana", email: "ana@mail.com", password: "" }));

console.log("-----P6-----");
// punto 6 paginacion de datos
function obtenerPagina(datos, numeroPagina) {
  const elementosPorPagina = 5;
  const inicio = (numeroPagina - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  return datos.slice(inicio, fin);
}
// slice es un metodo de arrays q devuelve una porcion del array, desde el indice inicio incluido hasta fin sin incluir, sin modif el array original

const numerosDelUno = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log(obtenerPagina(numerosDelUno, 1));
console.log(obtenerPagina(numerosDelUno, 2));
console.log(obtenerPagina(numerosDelUno, 3));

console.log("-----P7-----");
// punto 7 envio de datos a una API
async function enviarDatos(data) {
  const respuesta = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  const resultado = await respuesta.json();
  console.log(resultado);
}
// - fetch(url) solo = GET (leer). Para ENVIAR datos se agrega:
//   method: "POST", headers (avisa que es JSON), body: JSON.stringify(data)
// - El body siempre viaja como texto, por eso se usa JSON.stringify()
// - jsonplaceholder es de prueba: no guarda nada, solo simula la respuesta

enviarDatos({
  title: "Mi primer post",
  body: "Este es el contenido de prueba",
  userId: 1
});

console.log("-----P8-----");
// punto 8 busqueda de usuarios
function buscarUsuarioPorEmail(usuarios, email) {
  return usuarios.find(usuario => usuario.email === email);
}

async function probarBusqueda() {
  const usuarios = await obtenerUsuarios();
  const encontrado = buscarUsuarioPorEmail(usuarios, "Sincere@april.biz");
  console.log(encontrado);
}

probarBusqueda();

console.log("-----P9-----");
// punto 9 generacion de token de autenticacion
function generarToken(usuario) {
  const datos = JSON.stringify(usuario);
  const token = Buffer.from(datos).toString("base64");
  return token;
}

const usuarioEjemplo = { id: 1, nombre: "Ana", email: "ana@mail.com" };
const tokenGenerado = generarToken(usuarioEjemplo);
console.log(tokenGenerado);

console.log("-----P10-----");
// punto 10 actualizacion de informacion del usuario.
function actualizarUsuario(usuario, cambios) {
  return { ...usuario, ...cambios };
}

const usuarioOriginal = { id: 1, nombre: "Ana", email: "ana@mail.com" };
const usuarioActualizado = actualizarUsuario(usuarioOriginal, { email: "ana.nueva@mail.com", edad: 30 });

console.log("Original:", usuarioOriginal);
console.log("Actualizado:", usuarioActualizado);