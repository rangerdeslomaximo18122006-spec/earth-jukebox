# Earth Jukebox — Arquitectura y reparto de trabajo

## Objetivo
Convertir datos satelitales de la NASA en una pieza musical reproducible.
Pipeline: datos crudos → parámetros musicales → audio.

## Reparto de ramas (6 personas, 5 ramas + integración)

| Persona | Rama | Responsabilidad |
|---|---|---|
| 1 | vision-lightning | Descarga y limpieza de datos de rayos |
| 2 | vision-gedi | Descarga y limpieza de datos de vegetación |
| 3 | mapeo | Traduce datos limpios a parámetros musicales |
| 4 | audio | Genera el audio con ffmpeg desde Python |
| 5 | ui | Interfaz web: reproduce y visualiza |
| 6 | integracion | Mantiene main funcionando, resuelve conflictos |

## Decisión técnica: audio con ffmpeg, no Web Audio API
Nadie del equipo ha trabajado con síntesis de audio. Por eso:
- El audio se genera en Python llamando a ffmpeg (tonos, mezclas, filtros).
- La UI solo reproduce un archivo .wav ya generado.
- Web Audio API queda como exploración opcional, sin bloquear la entrega.

## Contrato de datos (LEER ANTES DE ESCRIBIR CÓDIGO)

### Salida de vision-lightning y vision-gedi
Ambas ramas entregan un JSON con esta forma exacta:

{
  "fuente": "lightning" | "gedi",
  "ventana": {"inicio": "2026-11-13T00:00:00Z", "fin": "2026-11-13T23:59:59Z"},
  "puntos": [
    {"t": 0.0, "lat": 9.93, "lon": -84.08, "intensidad": 0.72}
  ]
}

- "t": segundos desde el inicio de la ventana, normalizado 0.0 a 1.0.
- "intensidad": valor normalizado 0.0 a 1.0.
- Sin valores nulos. Sin campos extra.

### Salida de mapeo
Un JSON con la partitura, independiente de la fuente:

{
  "duracion_seg": 30,
  "notas": [
    {"inicio": 0.0, "dur": 0.4, "frecuencia_hz": 440.0, "amplitud": 0.6}
  ]
}

### Entrada de audio
Consume el JSON de mapeo. No lee datos satelitales directamente.
Salida: backend/salida/pieza.wav

### Entrada de ui
Consume backend/salida/pieza.wav y el JSON de mapeo para la visualización.

## Regla de integración
- Nadie hace merge directo a main.
- Cada rama hace pull request a main.
- La persona 6 revisa y mergea.
- Si main se rompe, se arregla antes de cualquier otra cosa.

## Horario sugerido
- 08:00 Acuerdo del contrato de datos (esta reunión, 5 min)
- 08:15 Trabajo en ramas
- 12:00 Primer punto de control: ¿cada rama tiene algo que corre?
- 14:00 Punto de decisión: si audio no funciona, se simplifica
- 16:00 Integración
- 17:00 Ensayo de la demo
