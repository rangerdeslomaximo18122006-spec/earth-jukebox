console.log("JukeBox Conectado");

let estadoJukebox = document.getElementById("estado");
let botonReproducir = document.getElementById("botonReproducir");
let botonDetener = document.getElementById("botonDetener");

estadoJukebox.textContent = "JukeBox Conectado";

let temporizadoresMelodia = [];
let temporizadorFinalizacion = null;
let reproduciendo = false;

function detenerMelodia(mensaje) {

    for (let i = 0; i < temporizadores.length; i++) {
        temporizadores[i].forEach(t => clearTimeout(t));
        temporizadores[i] = [];
    }

    temporizadoresMelodia.forEach(t => clearTimeout(t));
    temporizadoresMelodia = [];

    if (temporizadorFinalizacion) {
        clearTimeout(temporizadorFinalizacion);
        temporizadorFinalizacion = null;
    }

    reproduciendo = false;
    estadoJukebox.textContent = mensaje;

    botonReproducir.disabled = false;
    botonDetener.disabled = true;

    botonesCapas.forEach(boton => { boton.disabled = false; });
}

function reproducirMelodia() {

    if (reproduciendo || listaEventos.length === 0) {
        return;
    }

    reproduciendo = true;

    botonReproducir.disabled = true;
    botonDetener.disabled = false;

    temporizadoresMelodia.forEach(t => clearTimeout(t));
    for (let i = 0; i < temporizadores.length; i++) {
    temporizadores[i].forEach(t => clearTimeout(t));
    temporizadores[i] = [];

    capasActivas[i] = true;
    volumenes[i].mute = false;
}
    temporizadoresMelodia = [];

    botonesCapas.forEach(boton => { boton.disabled = true; });

    let eventosOrdenados = [...listaEventos].sort((a, b) => {
        if (a.t !== b.t) return a.t - b.t;
        return a.capa - b.capa;
    });

    for (let i = 0; i < eventosOrdenados.length; i++) {

        let evento = eventosOrdenados[i];

        // CAMBIO: respeta el silenciado de cada capa.
        if (capasActivas[evento.capa - 1] === false) {
            continue;
        }

        let temporizador = setTimeout(function() {

            suena(
                evento.frecuencia,
                evento.capa - 1,
                true,
                evento.volumen ?? 1,
                evento.estado ?? "normal"
            );

            console.log(
                "Capa:", evento.capa,
                "t:", evento.t.toFixed(1),
                "Estado:", evento.estado ?? "normal"
            );

        }, evento.t * 1000);

        temporizadoresMelodia.push(temporizador);
    }

    // CAMBIO: 30.5 s cubre el ultimo evento (28 + 2 de desfase).
    temporizadorFinalizacion = setTimeout(function() {
        detenerMelodia("Reproducción finalizada");
    }, 30500);
}

botonReproducir.addEventListener("click", async function() {
    await Tone.start();
    reproducirMelodia();
});

botonDetener.addEventListener("click", function() {
    detenerMelodia("JukeBox Detenido");
});
