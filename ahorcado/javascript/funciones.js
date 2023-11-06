
//funcion principal que es la que decide el curso del juego
function init() {
  var control_switch = false;
  menu();

  var opcion = parseInt(prompt(`Ingresa tu opción del menu del 1 al 3`));
  while (control_switch != true) {
    if (opcion >= 1 && opcion <= 3) {
      switch (opcion) {
        case 1:
          jugar();
          break;
        case 2:
          break;
        case 3:
          control_switch = true;
          break;
      }
    } else {
      console.log("No se ha ingresado una opción del 1 al 3");
      opcion = parseInt(prompt(`Ingresa de nuevo`));
    }
  }
}

//funcion para acortar codigo solo muestra un menu
function menu() {
  console.log(`Opciones
    1. Iniciar el juego
    2. Estadisticas
    3. Salir
    `);
}

//funcion para imprimir los simbolos
function jugar() {
  var palabra = prompt(`Ingresa una palabra`);
  var control_jugar = false;
  var intentos = 0;
  var aux = "";

  console.log(`Que empiece el juego!!!`);

  //desde aqui iniciar el codigo para jugar validando si tiene 1 sola letra y si es aprobada
  while (control_jugar != true) {
    var letra = prompt(`Ingresa una letra`);
    //valida si es una letra y si existe en la palabra

    if (
      validores_letra(letra) == true &&
      palabra.includes(letra) == true &&
      aux.includes(" _ ") == true
    ) {
      for (var f = 0; f < aux.length; f++) {}
    } else {
      console.log("no es letra valida");
    } //fin de comprobacion de si una letra valida
  }
}

//funcion para calcular los simolos
function dibuja_palabra(palabra) {
  var simbolos = "";
  for (var g = 0; g < palabra.length; g++) {
    simbolos = simbolos + " _ ";
  }

  return simbolos;
}

//valida si es una letra valida
function validores_letra(letra) {
  if (
    letra.length <= 1 &&
    (letra.charCodeAt(0) >= 97 ||
      letra.charCodeAt(0) <= 122 ||
      letra.charCodeAt(0) >= 65 ||
      letra.charCodeAt(0) <= 90)
  ) {
    return true;
  } else {
    return false;
  }
}

function prueba(palabra, letra) {
  var simbolos = "";
  var aux = palabra;
  for (var a = 0; a < aux.length; a++) {
    if(aux[a] == letra ){
        simbolos = simbolos +" "+ letra;
    }else{
      simbolos += " _ ";
    } 
  }

  console.log(simbolos);
}

function cambio (){}


var palabra = "banana";
var letra = "a";
var g =  prueba(palabra, letra);