/* Al hacer clic en una tarjeta de juego (menos en "Comprar") se abre su página de detalle */
document.querySelectorAll(".tarjeta-juego[data-id]").forEach(function (tarjeta) {
    tarjeta.addEventListener("click", function (e) {
        if (e.target.closest(".compra") || e.target.closest("a")) return;
        location.href = "juego.html?id=" + encodeURIComponent(tarjeta.dataset.id);
    });
});
