import { SERIE_CO2, CONTEXTO_CO2, DESVIACION_PPM } from "./datos_co2.js";

// Serie completa: 12 meses de contexto + los 15 de la ventana.
const serie = [
  ...CONTEXTO_CO2.map((ppm) => ({ ppm })),
  ...SERIE_CO2
];

const OFFSET = CONTEXTO_CO2.length; // 12

export function mediaMovil(i, ventana = 12) {
  const desde = Math.max(0, i - ventana);
  const tramo = serie.slice(desde, i);
  if (tramo.length === 0) return serie[i].ppm;
  return tramo.reduce((a, b) => a + b.ppm, 0) / tramo.length;
}

export function evaluarUmbral(i) {
  const media = mediaMovil(i);
  const desviacion = serie[i].ppm - media;
  return {
    estado: Math.abs(desviacion) > DESVIACION_PPM ? "alarma" : "normal",
    desviacion,
    media
  };
}

// Reparte los 15 puntos en el tiempo del video.
export function ventanaParaVideo(duracionSeg = 30) {
  const n = SERIE_CO2.length;
  return SERIE_CO2.map((p, j) => {
    const i = OFFSET + j;
    const { estado, desviacion, media } = evaluarUmbral(i);
    return {
      t: (j / (n - 1)) * (duracionSeg - 2),
      year: p.year,
      month: p.month,
      ppm: p.ppm,
      desviacion,
      media,
      estado
    };
  });
}

// Para la interfaz: el texto que se muestra en pantalla.
export function etiquetaPunto(p) {
  return `${p.ppm.toFixed(1)} ppm · ${p.estado === "alarma" ? "ALARMA" : "normal"}`;
}
