console.log("Sintetizador conectado");

// CAMBIO: volumen base mas alto (-12 en vez de -24) para que el
// desacorde de la capa 2 se oiga en la demo.
let volumen1 = new Tone.Volume(-12).toDestination();
let volumen2 = new Tone.Volume(-12).toDestination();
let volumen3 = new Tone.Volume(-12).toDestination();
let volumen4 = new Tone.Volume(-12).toDestination();
let volumen5 = new Tone.Volume(-12).toDestination();

let sintetizador1 = new Tone.Synth({ oscillator: { type: "sine" } }).connect(volumen1);
let sintetizador2 = new Tone.Synth({ oscillator: { type: "sawtooth" } }).connect(volumen2);
let sintetizador3 = new Tone.Synth({ oscillator: { type: "triangle" } }).connect(volumen3);
let sintetizador4 = new Tone.Synth({ oscillator: { type: "square" } }).connect(volumen4);
let sintetizador5 = new Tone.FMSynth().connect(volumen5);

let sintetizadores = [
    sintetizador1,
    sintetizador2,
    sintetizador3,
    sintetizador4,
    sintetizador5
];

let volumenes = [volumen1, volumen2, volumen3, volumen4, volumen5];

let controladoresVolumen = [
    document.getElementById("volumenCapa1"),
    document.getElementById("volumenCapa2"),
    document.getElementById("volumenCapa3"),
    document.getElementById("volumenCapa4"),
    document.getElementById("volumenCapa5")
];

for (let i = 0; i < controladoresVolumen.length; i++) {
    controladoresVolumen[i].addEventListener("input", function() {
        let valor = controladoresVolumen[i].value;
        volumenes[i].volume.value = -40 + (valor / 100) * 40;
    });
}

let escalaDoMayor = ["C4", "D4", "E4", "G4", "A4"];

function valorANota(valor) {
    let indice = Math.floor(valor * escalaDoMayor.length);
    indice = Math.min(4, Math.max(0, indice));
    return escalaDoMayor[indice];
}

function suena(valor, indiceCapa, esFrecuencia = false, volumen = 1, estado = "normal") {

    if (!sintetizadores[indiceCapa]) {
        console.warn("Capa fuera de rango:", indiceCapa);
        return;
    }

    let frecuencia;

    if (esFrecuencia === true) {
        frecuencia = Number(valor);
    } else {
        let nota = valorANota(valor);
        frecuencia = Tone.Frequency(nota).toFrequency();
    }

    if (!isFinite(frecuencia)) {
        console.warn("Frecuencia invalida:", valor);
        return;
    }

    let intensidad = Math.max(0, Math.min(1, volumen));

    // ALARMA: choque directo de semitono contra C4.
    if (estado === "alarma") {
        const referencia = Tone.Frequency("C4").toFrequency();
        frecuencia = referencia * Math.pow(2, 1 / 12);
        intensidad = Math.min(1, intensidad * 1.6);
    }

    sintetizadores[indiceCapa].triggerAttackRelease(frecuencia, "8n", undefined, intensidad);
}
