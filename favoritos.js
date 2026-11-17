const botonesFav = document.querySelectorAll('.btn-fav');
const totalFav = document.getElementById('total-fav');
let cantidad = 0;

botonesFav.forEach(function (boton) {
    boton.addEventListener('click', function (e) {
        e.stopPropagation();   

        boton.classList.toggle('activo');

        if (boton.classList.contains('activo')) {
            boton.textContent = '♥';
            cantidad = cantidad + 1;
        } else {
            boton.textContent = '♡';
            cantidad = cantidad - 1;
        }

        totalFav.textContent = cantidad;
    });
});
