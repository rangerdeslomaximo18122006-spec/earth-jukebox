let botonesCapas = [
    document.getElementById("btnCapa1"),
    document.getElementById("btnCapa2"),
    document.getElementById("btnCapa3"),
    document.getElementById("btnCapa4"),
    document.getElementById("btnCapa5")
];

// estado false = silenciado, estado true = activado

let capasActivas = [false, false, false, false, false];

for (let i = 0; i < botonesCapas.length; i++) { 
    botonesCapas[i].addEventListener("click", function() {

        //Cambia el estado de la capa seleccionada
        capasActivas[i] = !capasActivas[i];
        

        //Etaa de verificacion de estado de cada capa
        if (capasActivas[i] == true) {
            console.log("Capa " + (i + 1) + " Activada");
            reproducirCapa(i);

        }   else {
            console.log("Capa " + (i + 1) + " Silenciada");
            for (let j = 0; j < temporizadores[i].length; j++) {
                clearTimeout(temporizadores[i][j]);
            }
            
            temporizadores[i].splice(0, temporizadores[i].length);

        }
    });
}

// Esta estapa ayudara a agrupar los datos de cualquier capa de entre 0 y 1


let datosCapa1 = [0.2, 0.4, 0.8, 0.5, 0.9];
let datosCapa2 = [0.1, 0.3, 0.6, 0.7, 0.4];
let datosCapa3 = [0.5, 0.2, 0.9, 0.1, 0.8]; 
let datosCapa4 = [0.3, 0.7, 0.4, 0.6, 0.2];
let datosCapa5 = [0.9, 0.5, 0.2, 0.8, 0.1];

let datosCapas = [
    datosCapa1, 
    datosCapa2, 
    datosCapa3, 
    datosCapa4, 
    datosCapa5
];

let temporizadores = [[], [], [], [], []];



function reproducirCapa(indiceCapa) { 
    let datos = datosCapas[indiceCapa];

    for (let i = 0; i < datos.length; i++) {
        console.log("Capa ", indiceCapa + 1, " dato ", datos[i]);
        
        let notaPendiente = setTimeout(function() {
                suena(datos[i]);
                }, i * 500);

        temporizadores[indiceCapa].push(notaPendiente);
        }
    }

//Este programa puede hacer:
//Activarse y programar sus notas.
//Reproducirlas con intervalos de 500 ms.
//Silenciarse y cancelar las notas pendientes.
//Limpiar su propio arreglo de temporizadores.