document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-contacto");

    if (!formulario) return;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombre = document.getElementById("contacto-nombre").value.trim();
        const correo = document.getElementById("contacto-correo").value.trim();
        const asunto = document.getElementById("contacto-asunto").value.trim();
        const tipo = document.getElementById("contacto-tipo").value;
        const mensaje = document.getElementById("contacto-mensaje").value.trim();

        if (!nombre || !correo || !asunto || !tipo || !mensaje) {
            alert("Por favor, completa todos los campos del formulario.");
            return;
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoCorreo.test(correo)) {
            alert("Ingresa un correo electrónico válido.");
            return;
        }

        if (mensaje.length < 10) {
            alert("El mensaje debe tener al menos 10 caracteres.");
            return;
        }

        if (confirm("¿Enviar mensaje?")) {
            alert("¡Gracias por contactarte con Pixel Store! Tu mensaje fue registrado en esta demostración.");
            formulario.reset();
        }
    });
});
