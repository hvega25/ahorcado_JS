//Función que despliega el juego
function jugar() {
  var intentos = 0;
  var ganadas = 0;
  var perdidas = 0;

  localStorage.setItem("intentos", intentos);
  localStorage.setItem("ganadas", ganadas);
  localStorage.setItem("perdidas", perdidas);
  var partidas_jugadas = 0;
  localStorage.setItem("jugadas", partidas_jugadas);

  nuevoJuego();
}

function nuevoJuego() {
  var palabra = prompt(`Ingresa una palabra`);

  //variable que guarda la palabra transformada de string en un array para su facil calculo
  var palabra_array = conversion_palabra(palabra.toLocaleLowerCase());
  localStorage.setItem("palabra_normal", palabra_array[0]);
  localStorage.setItem("encriptada", palabra_array[1]);
  console.log(localStorage.getItem("palabra_normal"));
  console.log(localStorage.getItem("encriptada"));
  let alfabeto = "abcdefghijklmnñopqrstuvwxyz";
  var mostrar = document.getElementById("abecedario");
  let boton1 = "";

  for (var i = 0; i < alfabeto.length; i++) {
    boton1 += `<button id="${alfabeto[i]}"  onclick="letra_pulsada('${alfabeto[i]}')" > ${alfabeto[i]} </button>`;
  }
  mostrar.innerHTML = boton1;
  imprimir_guiones(localStorage.getItem("encriptada"));
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
function actualizar_palabra(letra) {
  var palabraNormal = localStorage.getItem("palabra_normal");
  var encriptada = localStorage.getItem("encriptada");

  // Convertir la cadena encriptada en un array de caracteres
  var encriptadaArray = encriptada.split("");

  for (var k = 0; k < palabraNormal.length; k++) {
    if (encriptadaArray[k] == "_") {
      if (palabraNormal[k] == letra) {
        encriptadaArray[k] = letra;
      } else {
        encriptadaArray[k] = "_";
      }
    }
  }

  // Convertir el array de nuevo a una cadena y almacenarla en localStorage
  localStorage.setItem("encriptada", encriptadaArray.join(""));
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
  var mostrar = document.getElementById("mostra_palabra");

  for (var i = 0; i < pal.length; i++) {
    if (pal[i] != ",") {
      simbolos = simbolos + " " + pal[i];
    }
  }

  mostrar.innerHTML = simbolos;
}

//funcion que imprime estadisticas
function estadisticas() {
  var play = localStorage.getItem("jugadas");
  var win = localStorage.getItem("ganadas");
  var los = localStorage.getItem("perdidas");

  var nuevaVentana = window.open("", "_blank");
  nuevaVentana.document.write("<h1>Partidas jugadas: </h1>");
  nuevaVentana.document.write("<p>" + play + "</p>");

  nuevaVentana.document.write("<h2>Partidas ganadas: </h2>");
  nuevaVentana.document.write("<p>" + win + "</p>");

  nuevaVentana.document.write("<h2>Partidas perdidas: </h2>");
  nuevaVentana.document.write("<p>" + los + "</p>");
  window.addEventListener("beforeunload", limpiarLocalStorage);
}

function limpiarLocalStorage() {
  localStorage.clear();
}

//función que verifica si la letra pulsada corresponde a la palabra a buscar
function letra_pulsada(letra) {
  var play = localStorage.getItem("jugadas");
  var win = localStorage.getItem("ganadas");
  var los = localStorage.getItem("perdidas");
  var int = localStorage.getItem("intentos");
  var letra_fallada = document.getElementById("lletrasUtilitzades");
  var fallada = document.getElementById("falladas");

  var palabra_normal_recuperada = localStorage.getItem("palabra_normal");
  var palabra_encriptada_recuperada = localStorage.getItem("encriptada");




  if (palabra_encriptada_recuperada.includes("_")) {
    if (palabra_normal_recuperada.includes(letra)) {
      if (int < 7) {
        actualizar_palabra(letra);
        imprimir_guiones(localStorage.getItem("encriptada"));
        document.getElementById(`${letra}`).disabled = true;
      } else {
        int = 0;
        localStorage.setItem("intentos", int);
        play = parseInt(play) + 1;
        localStorage.setItem("jugadas", play);
        los = parseInt(los) + 1;
        localStorage.setItem("perdidas", los);
        alert("Has perdido");
        nuevoJuego();
      }
    } else {
      document.getElementById(`${letra}`).disabled = true;
      fallada.innerHTML = "Letras falladas";
      var contenidoActual = letra_fallada.innerHTML;
      letra_fallada.innerHTML = contenidoActual + `<span> ${letra} </span>`;
      int = parseInt(int) + 1;
      imaAhorcado(int);
    }

    localStorage.setItem("intentos", int);
  } else {
    int = 0;
    localStorage.setItem("intentos", int);
    play = parseInt(play) + 1;
    win = parseInt(win) + 1;
    localStorage.setItem("jugadas", play);
    localStorage.setItem("ganadas", win);

    alert("Has ganado");
    nuevoJuego();
  }
}

function imaAhorcado(fallos) {
 
  var rutaImagen = "/ahorcado/imagenes/penjat_" + fallos + ".png";

  // Actualiza la fuente de la imagen
  document.getElementById("imatgePenjat").src = rutaImagen;
}