// Variables y scope
// Variables -> Contenedor de informacion, en algunos casos se puede modificar su contenido
// La variable generalmente tiene un tipo de dato especifico

// JS -> Tipado dinamico, es interpretado (no es compilado)
// TS -> Tipado dinamico opcional, tipado busca mas rigidez, transpilado (TS -> JS)

// var - no usar var
var nombre = "javier"
// Se puede redeclarar
var nombre = 5
console.log(nombre + 10)

// Scope -> el ambito, o alcance donde una variable puede ser: leida, usada, reasignada

// let
let apellido = "lopez"
// No Se puede redeclarar
// let apellido = "garcia"

if(true){
    apellido = "di gangi"
    console.log(apellido, "dentro del bloque")
}
    console.log(apellido, "fuera del bloque")

    if(true){
    apellido = "di gangi"
    console.log(`${apellido} dentro del bloque`)
}

// Const -> constante
// El scope es igual que en let
// No puede ser redeclarada, no puede ser redefinida
// No se le puede asignar nuevo valor, No se puede volver a crear de 0
// Los tipos de datos que no se pueden redefinir son: boolean, string, number
// Tipos de datos que si se pueden modificar: arrays [], objetos { clave: valor }
// Casos de uso: puerto, ip, importacion, 
const num = 10
// num = 20

const zapatilla = { color: "negro", marca: "vans" }
// dot notation
zapatilla.color = "rojo"
console.log(zapatilla)

// array es based zero
const zapatillas = [ { color: "negro", marca: "vans" }, { color: "rojo", marca: "fila" } ]
zapatillas[1].color = "azul"
console.log(zapatillas)
