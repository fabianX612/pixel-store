// --- 1. FUNCIÓN PARA EL BOTÓN IR ARRIBA (onclick) ---
function irArriba() {
    // Hace que la ventana suba suavemente hasta la posición 0 (arriba del todo)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    console.log("El usuario hizo clic en 'Ir arriba'. ¡Volviendo al inicio!");
}

// --- 2. MOSTRAR EL BOTÓN SOLO CUANDO HACEMOS SCROLL HACIA ABAJO ---
window.onscroll = function() {
    const boton = document.getElementById("btn-ir-arriba");
    
    // Si bajamos más de 300 píxeles, mostramos el botón
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        boton.style.display = "block";
    } else {
        boton.style.display = "none";
    }
};

// --- 3. FUNCIÓN PARA EL SELECTOR DE PRECIO (onchange) ---
function ordenarPrecio(opcion) {
    if (opcion === "") {
        console.log("El usuario seleccionó: 'Ordenar por precio' (Sin ordenar)");
        return;
    }

    if (opcion === "menor") {
        console.log("El usuario seleccionó: Ordenar de MENOR a MAYOR precio.");
        // Aquí a futuro podrías agregar la lógica para ordenar tus tarjetas de juegos
    } else if (opcion === "mayor") {
        console.log("El usuario seleccionó: Ordenar de MAYOR a MENOR precio.");
    }
}
