function irArriba() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    console.log("¡Subiendo al inicio!");
}

window.addEventListener("scroll", function() {
    const boton = document.getElementById("btn-ir-arriba");
    if (boton) {
        if (window.scrollY > 300) {
            boton.style.display = "block";
        } else {
            boton.style.display = "none";
        }
    }
});