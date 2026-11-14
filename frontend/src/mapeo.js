// Convierte una fila del CSV en un evento de audio
export function mapearFila(fila) {
  return {
    capa: Number(fila.capa),
    t: Number(fila.t),
    frecuencia: Number(fila.frecuencia_hz),
    volumen: Number(fila.volumen),
    duracion: Number(fila.duracion_seg),
    panoramica: Number(fila.pan)
  };
}

// Convierte el CSV completo en eventos agrupados por capa
export function mapearCSV(texto) {
  const lineas = texto.trim().split(/\r?\n/);
  const cabecera = lineas[0].split(",").map(s => s.trim());
  const eventos = [[], [], [], [], []];

  for (let i = 1; i < lineas.length; i++) {
    if (!lineas[i].trim()) continue;
    const valores = lineas[i].split(",");
    const fila = {};
    cabecera.forEach((col, j) => { fila[col] = valores[j]; });

    const evento = mapearFila(fila);
    eventos[evento.capa - 1].push(evento);
  }

  return eventos;
}
