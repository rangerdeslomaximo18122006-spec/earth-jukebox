// Pentatónica de Do mayor, una octava por capa
export const ESCALAS = {
  1: [130.81, 146.83, 164.81, 196.00, 220.00], // Do3 — CO2
  2: [261.63, 293.66, 329.63, 392.00, 440.00], // Do4 — Night Lights
  3: [523.25, 587.33, 659.25, 783.99, 880.00], // Do5 — GEDI
  4: [293.66, 329.63, 392.00, 440.00, 523.25], // Do4 desplazada — Aerosols
  5: [1046.50, 1174.66, 1318.51, 1567.98, 1760.00] // Do6 — Lightning
};

// Convierte un valor 0-1 en una nota de la capa
export function valorANota(valor, capa) {
  const escala = ESCALAS[capa];
  const indice = Math.min(Math.floor(valor * escala.length), escala.length - 1);
  return escala[indice];
}

