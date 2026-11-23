// --- 1. FUNCIÓN PARA EL BOTÓN IR ARRIBA (onclick) ---
function irArriba() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    console.log("¡Subiendo al inicio!");
}

// --- 2. MOSTRAR EL BOTÓN SOLO AL HACER SCROLL ---
window.addEventListener("scroll", function() {
    const boton = document.getElementById("btn-ir-arriba");
    
    // Si el botón existe en la página (para evitar errores en otras páginas)
    if (boton) {
        // Si bajamos más de 300px, lo mostramos. Si no, lo ocultamos.
        if (window.scrollY > 300) {
            boton.style.display = "block";
        } else {
            boton.style.display = "none";
        }
    }
});

// --- 3. FUNCIÓN PARA EL SELECTOR DE PRECIO (onchange) ---
function ordenarPrecio(opcion) {
    if (opcion === "") return;
    console.log("Has seleccionado ordenar por precio: " + opcion);
}
