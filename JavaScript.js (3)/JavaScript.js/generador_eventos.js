console.log("Generador de eventos conectado");

const DURACION_TOTAL = 30;   // segundos para los 75 eventos
const PASO = 0.4;            // 30 / 75 = 0.4 s entre eventos consecutivos

function generarEventos(datosCapas, volumenCapas) {

    let eventos = [];

    // CAMBIO: recorrido por rondas (evento j de cada capa), no por capas.
    const maxEventos = Math.max(...datosCapas.map(d => d.length));

    for (let j = 0; j < maxEventos; j++) {

        for (let i = 0; i < datosCapas.length; i++) {

            let datos = datosCapas[i];
            let muestra = datos[j];

            // Si una capa tiene menos eventos, se salta esa ronda.
            if (!muestra) continue;

            let valor = Math.max(0, Math.min(1, muestra.valor));
            let estado = muestra.estado ?? "normal";

            let indiceGlobal = j * datosCapas.length + i;

            let evento = {
                capa: i + 1,
                t: indiceGlobal * PASO,          // CAMBIO: tiempo secuencial intercalado
                valor: valor,
                frecuencia: Tone.Frequency(valorANota(valor)).toFrequency(),
                volumen: volumenCapas[i] ?? 1,
                duracion: 0.45,
                panoramica: (i === 4 && datos.length > 1)
                    ? -1 + (j / (datos.length - 1)) * 2
                    : 0,
                estado: estado
            };

            eventos.push(evento);
        }
    }

    return eventos;
}
