/* =====================================================================
   MODO OSCURO / MODO CLARO
   Guarda la elección en el navegador para que se mantenga
   al cambiar de página (tienda, detalle y perfil).
   ===================================================================== */

// Se aplica apenas carga la página para evitar un parpadeo
if (localStorage.getItem('tema') === 'claro') {
    document.documentElement.classList.add('modo-claro');
}

document.addEventListener('DOMContentLoaded', function () {
    const botonTema = document.getElementById('boton-tema');
    if (!botonTema) return;

    // Muestra el ícono según el modo actual
    function actualizarIcono() {
        const claro = document.documentElement.classList.contains('modo-claro');
        botonTema.textContent = claro ? '🌙' : '☀️';
        botonTema.title = claro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro';
    }

    botonTema.addEventListener('click', function () {
        const claro = document.documentElement.classList.toggle('modo-claro');
        localStorage.setItem('tema', claro ? 'claro' : 'oscuro');
        actualizarIcono();
    });

    actualizarIcono();
});
