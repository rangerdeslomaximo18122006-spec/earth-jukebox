console.log("JukeBox Conectado");



let estadoJukebox = document.getElementById("estado");

estadoJukebox.textContent = "JukeBox Conectado";

let botonReproducir = document.getElementById("botonReproducir");

botonReproducir.addEventListener("click", function() {
    estadoJukebox.textContent = "Reproduciendo Musica";
    Tone.start();
    
});