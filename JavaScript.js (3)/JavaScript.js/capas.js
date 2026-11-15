
let botonesCapas = [
    document.getElementById("btnCapa1"),
    document.getElementById("btnCapa2"),
    document.getElementById("btnCapa3"),
    document.getElementById("btnCapa4"),
    document.getElementById("btnCapa5")
];

// Todas las capas están disponibles para la reproducción general.
let capasActivas = [true, true, true, true, true];

let temporizadores = [[], [], [], [], []];

// Datos de demostración para las capas 1, 3, 4 y 5.
function serieDemo() {
    return [
        { t: 0,  valor: 0.2 },
        { t: 2,  valor: 0.4 },
        { t: 4,  valor: 0.6 },
        { t: 6,  valor: 0.8 },
        { t: 8,  valor: 1.0 },
        { t: 10, valor: 0.7 },
        { t: 12, valor: 0.3 },
        { t: 14, valor: 0.5 },
        { t: 16, valor: 0.9 },
        { t: 18, valor: 0.0 },
        { t: 20, valor: 0.0 },
        { t: 22, valor: 0.0 },
        { t: 24, valor: 0.0 },
        { t: 26, valor: 0.0 },
        { t: 28, valor: 0.0 }
    ];
}

let datosCapa1 = serieDemo().map(p => ({ ...p, valor: p.valor * 0.5 }));
let datosCapa3 = serieDemo().map(p => ({ ...p, valor: p.valor * 0.75 }));
let datosCapa4 = serieDemo().map(p => ({ ...p, valor: p.valor * 0.25 }));
let datosCapa5 = serieDemo().map(p => ({ ...p, valor: p.valor * 1.0 }));

// Capa 2: datos reales de CO2.
let datosCapa2 = eventosCO2().map(e => ({
    t: e.t,
    valor: e.valor,
    estado: e.estado
}));

let datosCapas = [
    datosCapa1,
    datosCapa2,
    datosCapa3,
    datosCapa4,
    datosCapa5
];

let volumenCapas = [0.65, 0.65, 0.65, 0.65, 0.65];

// Generar todos los eventos.
let listaEventos = generarEventos(datosCapas, volumenCapas);

console.log("Eventos generados:", listaEventos.length);

console.log(
    "Eventos en alarma:",
    listaEventos.filter(e => e.estado === "alarma")
);

// Cancelar la reproducción individual anterior.
function detenerCapasIndividuales() {

    for (let i = 0; i < temporizadores.length; i++) {

        temporizadores[i].forEach(t => clearTimeout(t));

        temporizadores[i] = [];
    }
}

// Reproducir exclusivamente una capa.
function reproducirCapa(indiceCapa) {

    let eventosCapa = listaEventos.filter(evento =>
        evento.capa === indiceCapa + 1
    );

    if (eventosCapa.length === 0) {
        return;
    }

    let tiempoInicial = eventosCapa[0].t;

    for (let i = 0; i < eventosCapa.length; i++) {

        let evento = eventosCapa[i];

        let temporizador = setTimeout(function() {

            suena(
                evento.frecuencia,
                indiceCapa,
                true,
                evento.volumen ?? 1,
                evento.estado ?? "normal"
            );

        }, (evento.t - tiempoInicial) * 1000);

        temporizadores[indiceCapa].push(temporizador);
    }
}
// Cada botón reproduce exclusivamente su propia capa.
for (let i = 0; i < botonesCapas.length; i++) {

    botonesCapas[i].addEventListener("click", function() {

        if (capasActivas[i] === true) {

            // Detener esta capa.
            temporizadores[i].forEach(t => clearTimeout(t));
            temporizadores[i] = [];

            volumenes[i].mute = true;
            capasActivas[i] = false;

            console.log("Capa " + (i + 1) + " detenida");

        } else {

            // Reproducir esta capa.
            volumenes[i].mute = false;
            capasActivas[i] = true;

            reproducirCapa(i);

            console.log("Capa " + (i + 1) + " reproduciendo");
        }

    });
}

