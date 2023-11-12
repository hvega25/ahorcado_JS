
//funcion principal que es la que decide el curso del juego
function init() {
  var control_switch = false;
  var partidas_jugadas =0;
  localStorage.setItem('jugadas', partidas_jugadas);
  localStorage.setItem('jugadas', 0);
  while (control_switch != true) {
    menu();
    var opcion = parseInt(prompt(`Ingresa tu opción del menu del 1 al 3`));
    if (opcion >= 1 && opcion <= 3) {
      switch (opcion) {
        case 1:
          partidas_jugadas++;
          jugar();
          localStorage.setItem('jugadas', partidas_jugadas);
          break;
        case 2:
        estadisticas();
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

//Función para acortar código solo muestra un menu
function menu() {
  console.log(`Opciones
   1. Iniciar el juego
   2. Estadisticas
   3. Salir
   `);
}

//Función que despliega el juego
function jugar() {
  var palabra = prompt(`Ingresa una palabra`);
  var control_jugar = false;
  var intentos = 0;
  var ganadas = 0;
  var perdidas =0;

  //variable que guarda la palabra transformada de string en un array para su facil calculo
  var palabraL = conversion_palabra(palabra.toLocaleLowerCase());
  console.log(`Que empiece el juego!!!`);
  imprimir_guiones(`${palabraL[1]}`);
  var letras_usadas = [];
  //desde aqui iniciar el codigo para jugar validando si tiene 1 sola letra y si es aprobada
  while (control_jugar != true) {
    var letra = prompt(`Ingresa una letra`);
    if (intentos < 8) {
      if (palabraL[0].includes(letra.toLocaleLowerCase()) && validores_letra(letra.toLocaleLowerCase()) == true) {
        var actualizada = actualizar_palabra(palabraL, letra.toLocaleLowerCase());
        imprimir_guiones(`${palabraL[1]}`);
        console.log(`Intento ${intentos}/8 Letra falladas: ${letras_usadas}`);
        if (validar_guion(actualizada[1]) != true) {
          console.log(`Felicidades has ganado`);
          control_jugar = true;
          ganadas++;
          localStorage.setItem('ganadas', ganadas);
        }
      }else{
        imprimir_guiones(`${palabraL[1]}`);
        intentos++;
        letras_usadas.push(letra);
        console.log(`Intento ${intentos}/8 Letra falladas: ${letras_usadas}`);
      }
    }else{
      perdidas++;
      localStorage.setItem('perdidas', perdidas);
      console.log(`Has muerto deadge`);
      control_jugar = true;
    }
  }
}

//valida si es una letra valida es decir si es una letra de la a a la z en mayuscula y miniscula
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

//Método que convierte la palabra de String a Arrat y a su vez otra palabra que es un incognita
function conversion_palabra(palabra) {
  var arrayPalabra = [];
  var arrayEncriptado = [];
  var retorno = [];

  for (var a = 0; a < palabra.length; a++) {
    arrayPalabra.push(palabra.charAt(a));
    arrayEncriptado[a] = "_";
  }

  retorno.push(arrayPalabra);
  retorno.push(arrayEncriptado);

  return retorno;
}

//Función que actualiza la palabra colocando la letra en el guion si esta coincide con la palabra a buscar
function actualizar_palabra(palabraL, letra) {
  var longitud = palabraL[0].length;
  var palabra_normal = palabraL[0];
  var encriptada = palabraL[1];

  for (var k = 0; k < longitud; k++) {
    if (encriptada[k] == "_") {
      if (palabra_normal[k] == letra) {
        encriptada[k] = letra;
      } else {
        encriptada[k] = "_";
      }
    }
  }
  palabraL[1] = encriptada;

  return palabraL;
}

//Método que valida si en la palabra existen letras sin acertar
function validar_guion(p) {
  for (var d = 0; d < p.length; d++) {
    if (p[d] == "_") {
      return true;
    }
  }
  return false;
}

//Método que imprime los guiones de la palabra en consola para indicarle al usuario cuantas letras tiene que adivinar
function imprimir_guiones(pal) {
  var simbolos = "";

  simbolos = pal;
  console.log(simbolos);
}


function estadisticas(){
var play = localStorage.getItem('jugadas');
var win = localStorage.getItem('ganadas');
var los = localStorage.getItem('perdidas');

console.log(`Total de partidas: ${play}
Partidas ganadas: ${win}
Partidas perdidas: ${los}`);
}