console.log("Sintetizador conectado");

console.log(Tone);

let sintetizador = new Tone.Synth().toDestination();

let escalaDoMayor = ["C4", "D4", "E4", "G4", "A4"];


function suena(valor) {
    let indice = Math.floor(valor * 5);
    indice = Math.min(4, Math.max(0, indice));

    let nota = escalaDoMayor[indice];

    sintetizador.triggerAttackRelease(nota, "8n");
}