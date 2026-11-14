# Earth Jukebox — Arquitectura y reparto de trabajo

## Objetivo
Convertir visualizaciones de datos de la NASA en una pieza musical reproducible.
Pipeline: recurso visual → extracción de variables → parámetros musicales → audio.

## Fuentes de datos (oficiales del reto)
Los recursos del reto son visualizaciones y animaciones del Scientific
Visualization Studio (SVS), no datasets científicos crudos.

Capas activas (3):
- GEDI Forest Height — altura de dosel
- Lightning Events from the ISS — destellos
- DYAMOND Global CO2 — concentración de CO2

Capas opcionales (solo si sobra tiempo):
- Change in Night Lights
- GEOS Aerosols

NO se requiere cuenta de Earthdata. NO se procesa HDF5.
El procesamiento es sobre video/imagen con OpenCV y ffmpeg.

## Reparto de ramas (6 personas)

| Persona | Rama | Responsabilidad |
|---|---|---|
| 1 | feature/vision-lightning | Extrae eventos de destello del video de rayos |
| 2 | feature/vision-gedi | Extrae valores de altura de dosel del mapa GEDI |
| 3 | feature/mapeo | Traduce variables extraídas a parámetros musicales |
| 4 | feature/audio | Genera el audio con ffmpeg desde Python |
| 5 | feature/ui | Interfaz web: reproduce y visualiza |
| 6 | feature/integracion | Mantiene main, README y script del pipeline completo |

## Decisión técnica: audio con ffmpeg, no Web Audio API
Nadie del equipo ha trabajado con síntesis de audio. Por eso:
- El audio se genera en Python llamando a ffmpeg (tonos, mezclas, filtros).
- La UI solo reproduce un archivo .wav ya generado.
- Web Audio API queda como exploración opcional, sin bloquear la entrega.
- ffmpeg verificado: genera 3 s de audio en 0.01 s (speed=295x).

## Jerarquía de capas (IMPORTANTE)
Cinco capas simultáneas con mapeos independientes suenan a ruido, no a música.
Por eso hay una capa maestra:

- GEDI DEFINE la tonalidad y el tempo base de la pieza.
- Lightning se subordina: los destellos caen sobre el pulso de GEDI.
- CO2 modula dinámica y tensión armónica, sin cambiar la tonalidad.

Ninguna otra capa puede alterar la tonalidad ni el tempo.

## Contrato de datos (LEER ANTES DE ESCRIBIR CÓDIGO)

### Salida de vision-gedi y vision-lightning
Ambas ramas entregan un JSON con esta forma exacta:

{
  "fuente": "gedi" | "lightning",
  "recurso": "nombre_del_archivo.mp4",
  "fps": 30,
  "frames": 900,
  "series": [
    {"frame": 0, "t": 0.0, "valor": 0.42}
  ]
}

- "t": tiempo en segundos desde el inicio del recurso.
- "valor": normalizado 0.0 a 1.0.
- Sin valores nulos. Sin campos extra.
- vision-lightning añade "eventos": lista de frames donde hay destello.

Un JSON con la partitura, independiente de la fuente:

{
  "notas": [
    {"inicio": 0.0, "dur": 0.4, "frecuencia_hz": 440.0, "amplitud": 0.6}
  ],
  "percusión": [
    {"inicio": 1.2, "amplitud": 0.8}
### Entrada de audio
Consume el JSON de mapeo. No lee recursos visuales directamente.
Salida: backend/salida/pieza.wav

### Entrada de ui
Consume backend/salida/pieza.wav y el JSON de mapeo para la visualización.

## Nota sobre la escala de GEDI
La tabla original decía "5 notas en 2 octavas (C4-C6)". Dos octavas son 25
semitonos, no 5 notas. La implementación correcta es:
5 grados pentatónicos repetidos en dos octavas = 10 alturas posibles.
- Cada rama hace pull request a main.
- La persona 6 revisa y mergea.
- Si main se rompe, se arregla antes de cualquier otra cosa.

## Horario
- 08:00 Acuerdo del contrato de datos
- 08:15 Trabajo en ramas
- 12:00 Punto de control: cada rama tiene algo que corre
- 14:00 Punto de decisión: si audio no funciona, se simplifica
- 16:00 Integración
- 17:00 Ensayo de la demo

## Regla de integración
- Nadie hace merge directo a main.
  ]
}

  "duracion_seg": 30,
  "tonalidad": "C",
  "tempo_bpm": 90,

