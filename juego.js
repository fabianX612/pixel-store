
(function () {
    const contenedor = document.getElementById("detalle");
    const id = new URLSearchParams(location.search).get("id");
    const juego = JUEGOS.find(function (j) { return j.id === id; });

    function esc(t) {
        const d = document.createElement("div");
        d.textContent = t;
        return d.innerHTML;
    }

    function formato(n) {
        return "S/ " + Number(n).toFixed(2);
    }

    /* ---------- JUEGO NO ENCONTRADO ---------- */
    if (!juego) {
        contenedor.innerHTML =
            '<div class="detalle-vacio">' +
            "<h2>Juego no encontrado</h2>" +
            '<p><a class="boton" href="index.html#juegos">Volver a la tienda</a></p>' +
            "</div>";
        return;
    }

    document.title = juego.nombre + " - Pixel Store";

    /* ---------- GALERÍA: video + portada + capturas ---------- */
    const medios = [];
    if (juego.video) medios.push({ tipo: "video", src: juego.video });
    medios.push({ tipo: "imagen", src: juego.portada });
    (juego.capturas || []).forEach(function (c) { medios.push({ tipo: "imagen", src: c }); });

    // Convierte un link de YouTube al formato "embed"
    function youtubeEmbed(url) {
        const m = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
        return m ? "https://www.youtube.com/embed/" + m[1] + "?rel=0" : null;
    }

    /* ---------- HTML DE LA PÁGINA ---------- */
    const etiquetas = juego.etiquetas.map(function (t) {
        return '<span class="etiqueta">' + esc(t) + "</span>";
    }).join("");

    const parrafos = juego.descripcion.map(function (p) {
        return "<p>" + esc(p) + "</p>";
    }).join("");

    const miniaturas = medios.map(function (m, i) {
        return '<button type="button" class="miniatura" data-indice="' + i + '" aria-label="Ver elemento ' + (i + 1) + '">' +
            '<img src="' + esc(m.tipo === "video" ? juego.portada : m.src) + '" alt="">' +
            (m.tipo === "video" ? '<span class="miniatura-play">▶</span>' : "") +
            "</button>";
    }).join("");

    const oferta = juego.id === "left-4-dead-2"
        ? '<span class="etiqueta-oferta">OFERTA</span>'
        : "";

    contenedor.innerHTML =
        '<div class="migas"><a href="index.html#juegos">← Volver a la tienda</a> / ' + esc(juego.categoria) + "</div>" +
        '<h2 class="detalle-titulo">' + esc(juego.nombre) + "</h2>" +

        '<div class="detalle-grid">' +

            /* IZQUIERDA: fotos y video */
            '<div class="detalle-media">' +
                '<div class="visor">' +
                    '<button type="button" class="visor-flecha izq" id="visor-ant" aria-label="Anterior">‹</button>' +
                    '<div class="visor-contenido" id="visor-contenido"></div>' +
                    '<button type="button" class="visor-flecha der" id="visor-sig" aria-label="Siguiente">›</button>' +
                "</div>" +
                '<div class="miniaturas" id="miniaturas">' + miniaturas + "</div>" +
            "</div>" +

            /* DERECHA: info y compra */
            '<aside class="detalle-lateral">' +
                '<img class="capsula" src="' + esc(juego.portada) + '" alt="Portada de ' + esc(juego.nombre) + '">' +
                '<p class="resumen">' + esc(juego.resumen) + "</p>" +
                '<dl class="ficha">' +
                    "<dt>Desarrollador</dt><dd>" + esc(juego.desarrollador) + "</dd>" +
                    "<dt>Lanzamiento</dt><dd>" + esc(juego.lanzamiento) + "</dd>" +
                    "<dt>Categoría</dt><dd>" + esc(juego.categoria) + "</dd>" +
                "</dl>" +
                '<div class="etiquetas">' + etiquetas + "</div>" +

                '<div class="caja-compra">' +
                    oferta +
                    '<span class="precio-grande">' + formato(juego.precio) + "</span>" +
                    '<button type="button" class="boton boton-comprar" data-comprar' +
                        ' data-nombre="' + esc(juego.nombre) + '"' +
                        ' data-precio="' + juego.precio + '"' +
                        ' data-imagen="' + esc(juego.portada) + '">Comprar ahora</button>' +
                    "<small>Pago con Yape</small>" +
                "</div>" +
            "</aside>" +

        "</div>" +

        '<section class="detalle-descripcion">' +
            "<h3>Acerca de este juego</h3>" + parrafos +
        "</section>";

    /* ---------- VISOR DE GALERÍA ---------- */
    const visor = document.getElementById("visor-contenido");
    const botonesMini = document.querySelectorAll(".miniatura");
    let actual = 0;

    function mostrar(i) {
        actual = (i + medios.length) % medios.length;
        const m = medios[actual];
        visor.innerHTML = "";

        if (m.tipo === "video") {
            const embed = youtubeEmbed(m.src);
            if (embed) {
                const f = document.createElement("iframe");
                f.src = embed;
                f.title = "Tráiler de " + juego.nombre;
                f.allow = "accelerometer; autoplay; encrypted-media; picture-in-picture";
                f.allowFullscreen = true;
                visor.appendChild(f);
            } else {
                const v = document.createElement("video");
                v.src = m.src;
                v.controls = true;
                v.poster = juego.portada;
                visor.appendChild(v);
            }
        } else {
            const img = document.createElement("img");
            img.src = m.src;
            img.alt = juego.nombre;
            visor.appendChild(img);
        }

        botonesMini.forEach(function (b, n) {
            b.classList.toggle("activa", n === actual);
        });
    }

    botonesMini.forEach(function (b) {
        b.addEventListener("click", function () { mostrar(Number(b.dataset.indice)); });
    });
    document.getElementById("visor-ant").addEventListener("click", function () { mostrar(actual - 1); });
    document.getElementById("visor-sig").addEventListener("click", function () { mostrar(actual + 1); });

    // Con una sola imagen no hacen falta flechas ni miniaturas
    if (medios.length === 1) {
        document.getElementById("visor-ant").style.display = "none";
        document.getElementById("visor-sig").style.display = "none";
        document.getElementById("miniaturas").style.display = "none";
    }

    mostrar(0);

    /* ---------- OTROS JUEGOS ---------- */
    const inicio = JUEGOS.indexOf(juego);
    const sugeridos = [];
    for (let k = 1; sugeridos.length < 4 && k < JUEGOS.length; k++) {
        sugeridos.push(JUEGOS[(inicio + k) % JUEGOS.length]);
    }

    document.getElementById("otros-juegos").innerHTML = sugeridos.map(function (j) {
        return '<a class="tarjeta-mini" href="juego.html?id=' + encodeURIComponent(j.id) + '">' +
            '<img src="' + esc(j.portada) + '" alt="Portada de ' + esc(j.nombre) + '">' +
            "<h4>" + esc(j.nombre) + "</h4>" +
            "<span>" + formato(j.precio) + "</span>" +
            "</a>";
    }).join("");
})();
