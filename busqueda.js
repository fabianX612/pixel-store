
const buscador = document.getElementById("buscador");
const filtroCategorias = document.getElementById("filtro-categorias");
const filtroPrecio = document.getElementById("filtro-precio");
const botonBuscar = document.querySelector(".boton-buscar");

const tarjetas = document.querySelectorAll(".tarjeta-juego");

// Convierte el texto a minúsculas y elimina tildes
function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Comprueba si un juego pertenece a la categoría elegida
function coincideCategoria(texto, categoria) {
    if (categoria === "") {
        return true;
    }

    const contenido = normalizar(texto);

    const categorias = {
        carreras: ["carreras", "racing"],
        aventura: ["aventura", "rogue like", "dungeon crawler"],
        disparos: ["disparos", "shooter"],
        deportes: ["deportes"],
        accion: ["accion"],
        terror: ["terror", "supervivencia"]
    };

    return categorias[categoria].some(palabra =>
        contenido.includes(normalizar(palabra))
    );
}

// Aplica la búsqueda y los filtros
function filtrarJuegos() {
    const nombreBuscado = normalizar(buscador.value.trim());
    const categoriaElegida = filtroCategorias.value;
    const precioElegido = filtroPrecio.value;

    let encontrados = 0;

    tarjetas.forEach(tarjeta => {
        const nombre = normalizar(
            tarjeta.querySelector("h3").textContent
        );

        const descripcion = normalizar(
            tarjeta.querySelector("p").textContent
        );

        const textoCompleto = nombre + " " + descripcion;

        const textoPrecio = tarjeta
            .querySelector(".compra span")
            .textContent;

        const precio = parseFloat(
            textoPrecio.replace(",", ".").replace(/[^\d.]/g, "")
        );

        const coincideNombre =
            nombreBuscado === "" ||
            textoCompleto.includes(nombreBuscado);

        const coincideTipo =
            coincideCategoria(textoCompleto, categoriaElegida);

        let coincidePrecio = true;

        if (precioElegido !== "") {
            const [minimo, maximo] = precioElegido
                .split("-")
                .map(Number);

            if (minimo === 0) {
                coincidePrecio = precio >= 0 && precio <= 50;
            } else {
                coincidePrecio =
                    precio > minimo - 1 && precio <= maximo;
            }
        }

        const mostrar =
            coincideNombre && coincideTipo && coincidePrecio;

        tarjeta.style.display = mostrar ? "" : "none";

        if (mostrar) {
            encontrados++;
        }
    });

    let mensaje = document.getElementById("resultado-busqueda");

    if (!mensaje) {
        mensaje = document.createElement("p");
        mensaje.id = "resultado-busqueda";
        mensaje.style.marginBottom = "20px";

        document.querySelector(".buscador-filtros")
            .insertAdjacentElement("afterend", mensaje);
    }

    mensaje.textContent = encontrados === 0
        ? "No se encontraron videojuegos con esos filtros."
        : "Videojuegos encontrados: " + encontrados;
}

// Buscar al pulsar el botón
botonBuscar.addEventListener("click", filtrarJuegos);

// También permite pulsar Enter en el buscador
buscador.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        filtrarJuegos();
    }
});

// Actualiza los resultados al cambiar los filtros
filtroCategorias.addEventListener("change", filtrarJuegos);
filtroPrecio.addEventListener("change", filtrarJuegos);
