// Serie real de CO2, Mauna Loa (NOAA GML), jul 2022 - sep 2023.
// Cada punto trae su segundo exacto de video en el campo t.

const SERIE_CO2 = [
  { t: 0,  year: 2022, month: 7,  ppm: 418.41 },
  { t: 2,  year: 2022, month: 8,  ppm: 419.03 },
  { t: 4,  year: 2022, month: 9,  ppm: 419.30 },
  { t: 6,  year: 2022, month: 10, ppm: 418.97 },
  { t: 8,  year: 2022, month: 11, ppm: 419.51 },
  { t: 10, year: 2022, month: 12, ppm: 419.79 },
  { t: 12, year: 2023, month: 1,  ppm: 419.19 },
  { t: 14, year: 2023, month: 2,  ppm: 419.34 },
  { t: 16, year: 2023, month: 3,  ppm: 419.54 },
  { t: 18, year: 2023, month: 4,  ppm: 420.83 },
  { t: 20, year: 2023, month: 5,  ppm: 420.71 },
  { t: 22, year: 2023, month: 6,  ppm: 421.25 },
  { t: 24, year: 2023, month: 7,  ppm: 421.45 },
  { t: 26, year: 2023, month: 8,  ppm: 421.61 },
  { t: 28, year: 2023, month: 9,  ppm: 421.98 }
];

// 12 meses previos a jul 2022, para la media movil del primer punto.
const CONTEXTO_PREVIO = [
  416.96, 417.08, 417.15, 417.42, 417.63, 417.87,
  418.12, 418.28, 418.35, 418.51, 418.62, 418.79
];
