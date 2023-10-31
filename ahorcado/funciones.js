init();
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
  var longitud_palabra = palabra.length;
  var control_jugar = false;

  //variable que guarda la cantidad de simbolos de una palabra solo para pruebas
  var a = longitud_simbolos(longitud_palabra);

  console.log(`${a}`);

  //desde aqui iniciar el codigo para jugar validando si tiene 1 sola letra y si es aprobada
  while (control_jugar != true) {
    var letra = prompt(`Ingresa una letra`);
    if (validores_letra(letra) == true) {
      if (palabra.includes(letra) == true) {
        console.clear();
        console.log(
          longitud_simbolos(
            longitud_palabra,
            letra,
            letra_existe(palabra, letra)
          )
        );
      }else{
        console.log("Error arreglar")
      }
    }
  }
}

//funcion para calcular los simolos
function longitud_simbolos(longitud_palabra, letra, posicion) {
  var simbolos = "";
  if (letra == null || letra == NaN || posicion =http://127.0.1.1:4444/ahorcado/index.html= null || posicion == NaN) {
    for (let a = 0; a < longitud_palabra; a++) {
      simbolos = simbolos + " _ ";
    }
    return simbolos;
  } else {
    //error de programa
    for (var a = 0; a < longitud_palabra; a++) {
      if (a == posicion[a]) {
        simbolos = simbolos + letra + " _ ";
      }
    }
  }
}

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

function letra_existe(palabra, letra) {
  var palabra = "casa";
  var letra = "a";
  var posicion = [];
  for (var a = 0; a < palabra.length; a++) {
    if (palabra[a] == letra) {
      posicion.push(a);
    }
  }
  return posicion;
}
