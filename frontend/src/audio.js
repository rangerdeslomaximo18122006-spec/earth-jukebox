import { ventanaParaVideo } from "./co2.js";
import { valorANota } from "./escalas.js";

const volumenCapas = [0.3, 0.5, 0.7, 0.9, 1.0];
let ctx = null;
let volumenMaestro = 0.8;
let eventos = [];
let timers = [];
let capasActivas = [true, true, true, true, true];

function asegurarContexto() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setVolumenMaestro(v) {
  volumenMaestro = Math.min(1, Math.max(0, v));
}

export function setCapaActiva(capa, activa) {
  capasActivas[capa - 1] = activa;
}

function disparar(e) {
  if (!capasActivas[e.capa - 1]) return;
  const c = asegurarContexto();

  let frecuencia = e.frecuencia ?? valorANota(e.valor ?? 0.5, e.capa);
  let volumen = (e.volumen ?? volumenCapas[e.capa - 1]) * volumenMaestro;

  if (e.estado === "alarma") {
    frecuencia = frecuencia / 2;
    volumen = Math.min(1, volumen * 1.4);
  }

  const osc = c.createOscillator();
  const gain = c.createGain();
  const pan = c.createStereoPanner();

  osc.type = "sine";
  osc.frequency.value = frecuencia;
  pan.pan.value = Math.min(1, Math.max(-1, e.panoramica ?? 0));

  const ahora = c.currentTime;
  const dur = e.duracion ?? 0.45;
  gain.gain.setValueAtTime(0.0001, ahora);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volumen), ahora + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ahora + dur);

  osc.connect(gain).connect(pan).connect(c.destination);
  osc.start(ahora);
  osc.stop(ahora + dur + 0.05);
}

export function cancelarPendientes() {
  timers.forEach(clearTimeout);
  timers = [];
}

export function reproducirDesde(desde) {
  cancelarPendientes();
  asegurarContexto();
  for (const e of eventos) {
    if (e.t < desde) continue;
    timers.push(setTimeout(() => disparar(e), (e.t - desde) * 1000));
  }
}

export function cargarEventos(duracionSeg = 30) {
  const puntos = ventanaParaVideo(duracionSeg);
  const lista = [];

  // Capa 1: CO2 real, con umbral.
  for (const p of puntos) {
    lista.push({
      capa: 1,
      t: p.t,
      valor: 0.5,
      frecuencia: null,
      volumen: 0.8,
      duracion: 0.45,
      panoramica: 0,
      estado: p.estado,
      ppm: p.ppm,
      desviacion: p.desviacion,
      year: p.year,
      month: p.month
    });
  }

  // Capas 2-5: paisaje sonoro, valores fijos declarados como tales.
  const fijos = [0.6, 0.4, 0.7, 0.5];
  for (let capa = 2; capa <= 5; capa++) {
    for (let i = 0; i < 15; i++) {
      lista.push({
        capa,
        t: i * 2,
        valor: fijos[capa - 2],
        frecuencia: null,
        volumen: volumenCapas[capa - 1],
        duracion: 0.45,
        panoramica: capa === 5 ? Math.sin(i) : 0,
        estado: "normal"
      });
    }
  }

  eventos = lista.sort((a, b) => a.t - b.t);
  return eventos;
}

export function engancharVideo(video) {
  video.addEventListener("play", () => reproducirDesde(video.currentTime));
  video.addEventListener("pause", cancelarPendientes);
  video.addEventListener("seeked", () => {
    cancelarPendientes();
    if (!video.paused) reproducirDesde(video.currentTime);
  });
}

export function forzarAlarma() {
  const e = eventos.find((ev) => ev.capa === 1 && ev.estado === "normal");
  if (e) e.estado = "alarma";
}
