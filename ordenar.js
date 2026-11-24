function ordenarJuegos(opcion) {
    if (opcion === "") return;

    const contenedor = document.querySelector('.lista-juegos');
    let tarjetas = Array.from(contenedor.querySelectorAll('.tarjeta-juego'));

    tarjetas.sort((tarjetaA, tarjetaB) => {
        let precioA = parseFloat(tarjetaA.querySelector('.compra span').innerText.replace('S/', '').trim());
        let precioB = parseFloat(tarjetaB.querySelector('.compra span').innerText.replace('S/', '').trim());

        if (opcion === "menor") {
            return precioA - precioB;
        } else if (opcion === "mayor") {
            return precioB - precioA;
        }
        return 0;
    });

    contenedor.innerHTML = "";
    for (let tarjeta of tarjetas) {
        contenedor.appendChild(tarjeta);
    }
    console.log("Ordenado: " + opcion);
}