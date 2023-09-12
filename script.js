//definicion de cantidad de intentos y palabra a ser adivinada (agregar mas palabras al diccionario de desearse)
let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

//proceso de la funcion init una vez que la ventana carga
window.addEventListener('load', init);

//definicion de la funcion init
function init(){
        console.log('Esto se ejecuta solo cuando se carga la pagina web')
   
    //declaracion y proceso de la funcion intentar
    function intentar(){
        const INTENTO = leerIntento();
            if (INTENTO === palabra ) {
                terminar("<h1>GANASTE!😀</h1>")
                return
            }
            var elemento = document.getElementById('titleintentos');
            elemento.style.display = 'block';
            
            if (INTENTO.length != palabra.length) {
                var pista = document.getElementById('pista');
                pista.style.display = 'block';
            }
            const GRID = document.getElementById("grid");
            const ROW = document.createElement('div');
            ROW.className = 'row';
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
    //declaracion y proceso de la funcion terminar
    function terminar(mensaje){
        const BOTON = document.getElementById("guess-button"); 
        const INPUT = document.getElementById("guess-input");
        INPUT.disabled = true;
        BOTON.disabled = true;
        let contenedor = document.getElementById('guesses');
        contenedor.innerHTML = mensaje;
    }
}