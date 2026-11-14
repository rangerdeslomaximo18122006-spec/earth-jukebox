// Datos reales de NOAA GML — Observatorio de Mauna Loa, Hawái.
// Media mensual de CO2 desestacionalizada (ppm).
// Fuente: https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv
// Ventana: julio 2022 – septiembre 2023.

export const SERIE_CO2 = [
  { year: 2022, month: 7,  ppm: 418.41 },
  { year: 2022, month: 8,  ppm: 419.03 },
  { year: 2022, month: 9,  ppm: 419.30 },
  { year: 2022, month: 10, ppm: 418.97 },
  { year: 2022, month: 11, ppm: 419.51 },
  { year: 2022, month: 12, ppm: 419.79 },
  { year: 2023, month: 1,  ppm: 419.19 },
  { year: 2023, month: 2,  ppm: 419.34 },
  { year: 2023, month: 3,  ppm: 419.54 },
  { year: 2023, month: 4,  ppm: 420.83 },
  { year: 2023, month: 5,  ppm: 420.71 },
  { year: 2023, month: 6,  ppm: 421.25 },
  { year: 2023, month: 7,  ppm: 421.45 },
  { year: 2023, month: 8,  ppm: 421.61 },
  { year: 2023, month: 9,  ppm: 421.98 }
];

// Contexto: 12 meses previos, para calcular la media móvil del primer punto.
export const CONTEXTO_CO2 = [
  416.60, 417.35, 417.51, 417.74, 417.96, 418.11,
  418.33, 418.53, 418.64, 418.72, 418.91, 419.17
];

export const DESVIACION_PPM = 1.5;
