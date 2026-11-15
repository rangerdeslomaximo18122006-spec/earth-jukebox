// Sin export: se carga como script clasico desde index.html.

// Desviacion tipica de la serie respecto a su tendencia (~1.2 ppm).
// Por encima de este valor el mes es un pico estacional, no ruido.
const DESVIACION_PPM = 1.2;   // CAMBIO: era 1.5

const VENTANA_MESES = 12;
const MIN_PUNTOS = 3;

function mediaMovil(serie, indice) {
  const inicio = Math.max(0, indice - VENTANA_MESES);
  const ventana = serie.slice(inicio, indice);

  if (ventana.length < MIN_PUNTOS) {
    return null;
  }

  const suma = ventana.reduce((acc, p) => acc + p.ppm, 0);
  return suma / ventana.length;
}

function evaluarUmbral(serie) {
  return serie.map((punto, i) => {
    const media = mediaMovil(serie, i);

    if (media === null) {
      return { ...punto, media: null, desviacion: 0, estado: "normal" };
    }

    const desviacion = punto.ppm - media;

    return {
      ...punto,
      media: Number(media.toFixed(2)),
      desviacion: Number(desviacion.toFixed(2)),
      estado: desviacion > DESVIACION_PPM ? "alarma" : "normal"
    };
  });
}

function normalizarCO2(ppm) {
  const MIN = 418;
  const MAX = 422;
  return Math.min(1, Math.max(0, (ppm - MIN) / (MAX - MIN)));
}

function eventosCO2() {
  const serieEvaluada = evaluarUmbral(SERIE_CO2);
  return serieEvaluada.map((p) => ({
    capa: 2,
    t: p.t,
    valor: normalizarCO2(p.ppm),
    estado: p.estado,
    duracion: 2,
    panoramica: 0
  }));
}

// CAMBIO: verificacion visible en consola al cargar.
console.log(
  "CO2 alarmas en t =",
  eventosCO2().filter(e => e.estado === "alarma").map(e => e.t)
);

