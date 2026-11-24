function ordenarJuegos(opcion) {
    if (opcion === "") return; // Si no eligen nada, no hacemos nada

    // 1. Creamos un ARREGLO con todas las tarjetas de juegos
    const contenedor = document.querySelector('.lista-juegos');
    let tarjetas = Array.from(contenedor.querySelectorAll('.tarjeta-juego'));

    // 2. Usamos el método sort (que internamente usa if/else) para comparar precios
    tarjetas.sort((tarjetaA, tarjetaB) => {
        // Extraemos el precio, quitamos la "S/" y lo convertimos a número (ej: 199.90)
        let precioA = parseFloat(tarjetaA.querySelector('.compra span').innerText.replace('S/', '').trim());
        let precioB = parseFloat(tarjetaB.querySelector('.compra span').innerText.replace('S/', '').trim());

        // Estructura condicional IF (PPT Pág. 10)
        if (opcion === "menor") {
            return precioA - precioB; // Si A es menor, va primero
        } else if (opcion === "mayor") {
            return precioB - precioA; // Si B es menor, va primero (Mayor a menor)
        }
        return 0;
    });

    // 3. Usamos un bucle FOR...OF (PPT Pág. 18) para volver a pintar las tarjetas
    contenedor.innerHTML = ""; // Vaciamos la lista actual
    for (let tarjeta of tarjetas) {
        contenedor.appendChild(tarjeta); // Insertamos una por una en el nuevo orden
    }
    
    // Mostramos en consola (PPT Semana 11)
    console.log("Juegos ordenados de forma: " + opcion);
}
