//definicion de cantidad de intentos 
let intentos = 6;

//definicion de la API
const API = "https://random-word-api.vercel.app/api?words=1&length=5"
fetch(API)
    //solicitar respuesta a la API en formato json
    .then(response => response.json())
    //se asigna la respuesta a la variable palabra despues de recibir la respuesta y se la pasa a mayuscula
    .then((response) => {
        palabra=response[0].toUpperCase();
    })
    //si se obtiene un error en la respuesta de la API se usa palabra aleatoria de un diccionario preestablecido
    .catch((err)=>{
        console.log("error en respuesta de la API, se procesa lista de palabras predeterminadas")
        let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
        let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
    })

//proceso de la funcion init una vez que la ventana carga
window.addEventListener('load', init);

//definicion de la funcion init
function init(){
    //declaracion y proceso de la funcion intentar
    function intentar(){
        const INTENTO = leerIntento();
            //impresion de mensaje en pantalla si la respuesta es correcta
            if (INTENTO === palabra ) {
                terminar("<h1>GANASTE!😀</h1>")
                return
            }
            //impresion del titulo de intentos si la respuesta es incorrecta
            var elemento = document.getElementById('titleintentos');
            elemento.style.display = 'block';
            //impresion de pista si la respuesta tiene una cantidad de letras diferente a la respuesta
            if (INTENTO.length != palabra.length) {
                var pista = document.getElementById('pista');
                pista.style.display = 'block';
            }
            const GRID = document.getElementById("grid");
            const ROW = document.createElement('div');
            ROW.className = 'row';
            //recorrido de la palabra e impresion en pantalla de la respuesta erronea
            for (let i in INTENTO) {
                const SPAN = document.createElement('span');
                SPAN.className = 'letter';
                if (INTENTO[i]===palabra[i]){ //VERDE
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#79b851';
                } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#f3c237';
                } else {      //GRIS
                    SPAN.innerHTML = INTENTO[i];
                    SPAN.style.backgroundColor = '#a4aec4';
                }
                ROW.appendChild(SPAN)
            }
            GRID.appendChild(ROW)
                intentos--
            //impresion en pantalla si se llega al limite de intentos (6)
            if (intentos==0){
                terminar("<h1>PERDISTE!😖</h1>")
            }
    }

    //asignacion y deteccion de click del boton intentar
    const button = document.getElementById("guess-button");
    button.addEventListener("click", intentar);


    //declaracion y proceso de la funcion leer intento
    function leerIntento(){
        let intento = document.getElementById("guess-input");
        intento = intento.value;
        intento = intento.toUpperCase(); 
        return intento;
    }
    //declaracion y proceso de la funcion terminar, poner botn en gris cuando se termina el juego
    function terminar(mensaje){
        const BOTON = document.getElementById("guess-button"); 
        const INPUT = document.getElementById("guess-input");
        INPUT.disabled = true;
        BOTON.disabled = true;
        BOTON.style.backgroundColor = "gray";
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = mensaje;
    }
}