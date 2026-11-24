/* =====================================================================
   VENTANA DE PAGO CON YAPE
   ===================================================================== */

const CONFIG_PAGO = {
    qrImagen: "yape-qr.png",       
    yapeNumero: "990023438",     
    titular: "Nombre del titular", 
    whatsapp: ""                   
};

(function () {
    let producto = null;

    function formato(n) {
        return "S/ " + Number(n).toFixed(2);
    }

    function crearVentana() {
        const v = document.createElement("div");
        v.className = "pago-ventana";
        v.id = "pago-ventana";
        v.innerHTML = `
        <div class="pago-caja" role="dialog" aria-modal="true" aria-labelledby="pago-titulo">
            <button type="button" class="pago-cerrar" id="pago-cerrar" aria-label="Cerrar">✕</button>

            <div id="pago-paso-1">
                <div class="pago-cabecera">
                    <span class="pago-yape">Yape</span>
                    <h2 id="pago-titulo">Pagar con Yape</h2>
                </div>

                <div class="pago-resumen">
                    <img id="pago-img" alt="">
                    <div>
                        <p class="pago-nombre" id="pago-nombre"></p>
                        <p class="pago-monto" id="pago-monto"></p>
                    </div>
                </div>

                <div class="pago-cuerpo">
                    <div class="pago-qr">
                        <img id="pago-qr-img" alt="Código QR de Yape">
                        <div class="pago-qr-vacio" id="pago-qr-vacio">
                            <span>Coloca tu imagen QR como</span><strong id="pago-qr-archivo"></strong>
                        </div>
                        <p class="pago-numero">
                            <span id="pago-yape-numero"></span><br>
                            <small id="pago-titular"></small>
                        </p>
                    </div>

                    <div class="pago-pasos">
                        <ol>
                            <li>Abre <b>Yape</b> y escanea el código QR.</li>
                            <li>Yapea el monto exacto: <b id="pago-monto-2"></b></li>
                            <li>Completa tus datos y pulsa <b>«Ya pagué»</b>.</li>
                        </ol>

                        <form id="pago-form">
                            <label for="pago-nombre-cliente">Tu nombre</label>
                            <input type="text" id="pago-nombre-cliente" required placeholder="Nombre y apellido">

                            <label for="pago-correo">Correo (donde recibirás tu compra)</label>
                            <input type="email" id="pago-correo" required placeholder="tucorreo@ejemplo.com">

                            <label for="pago-codigo">Código de operación de Yape</label>
                            <input type="text" id="pago-codigo" required placeholder="Ej: 12345678" inputmode="numeric">

                            <button type="submit" class="boton pago-enviar">Ya pagué</button>
                        </form>
                    </div>
                </div>
            </div>

            <div id="pago-paso-2" style="display:none">
                <div class="pago-ok">
                    <div class="pago-ok-icono">✓</div>
                    <h2>¡Pedido recibido!</h2>
                    <p>Código de pedido: <strong id="pago-pedido"></strong></p>
                    <p>Verificaremos tu pago de Yape y te enviaremos tu compra al correo
                       <strong id="pago-ok-correo"></strong>.</p>
                    <a href="#" id="pago-whatsapp" class="boton" target="_blank" rel="noopener" style="display:none">Avisar por WhatsApp</a>
                    <button type="button" class="pago-btn-secundario" id="pago-ok-cerrar">Cerrar</button>
                </div>
            </div>
        </div>`;
        document.body.appendChild(v);

        document.getElementById("pago-cerrar").addEventListener("click", cerrar);
        document.getElementById("pago-ok-cerrar").addEventListener("click", cerrar);
        v.addEventListener("click", function (e) { if (e.target === v) cerrar(); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
        document.getElementById("pago-form").addEventListener("submit", enviarPedido);

        const qr = document.getElementById("pago-qr-img");
        qr.addEventListener("error", function () {
            qr.style.display = "none";
            document.getElementById("pago-qr-vacio").style.display = "flex";
        });
        qr.addEventListener("load", function () {
            qr.style.display = "block";
            document.getElementById("pago-qr-vacio").style.display = "none";
        });
    }

    function abrir(p) {
        producto = p;
        if (!document.getElementById("pago-ventana")) crearVentana();

        document.getElementById("pago-paso-1").style.display = "";
        document.getElementById("pago-paso-2").style.display = "none";

        const img = document.getElementById("pago-img");
        img.src = p.imagen || "";
        img.style.display = p.imagen ? "" : "none";

        document.getElementById("pago-nombre").textContent = p.nombre;
        document.getElementById("pago-monto").textContent = formato(p.precio);
        document.getElementById("pago-monto-2").textContent = formato(p.precio);
        document.getElementById("pago-yape-numero").textContent = "Yape: " + CONFIG_PAGO.yapeNumero;
        document.getElementById("pago-titular").textContent = CONFIG_PAGO.titular;
        document.getElementById("pago-qr-archivo").textContent = CONFIG_PAGO.qrImagen;
        document.getElementById("pago-qr-img").src = CONFIG_PAGO.qrImagen;

        try {
            const s = JSON.parse(
                sessionStorage.getItem("sesion") ||
                localStorage.getItem("sesion") ||
                "null"
            );
            if (s) {
                document.getElementById("pago-nombre-cliente").value = s.nombre || "";
                document.getElementById("pago-correo").value = s.correo || "";
            }
        } catch (e) {}
        document.getElementById("pago-codigo").value = "";

        document.getElementById("pago-ventana").classList.add("activa");
        document.body.classList.add("sin-scroll");
    }

    function cerrar() {
        const v = document.getElementById("pago-ventana");
        if (v) v.classList.remove("activa");
        document.body.classList.remove("sin-scroll");
    }

    function enviarPedido(e) {
        e.preventDefault();

        const pedido = {
            codigo: "PX-" + Date.now().toString(36).toUpperCase().slice(-6),
            producto: producto.nombre,
            imagen: producto.imagen || "",
            precio: producto.precio,
            cliente: document.getElementById("pago-nombre-cliente").value.trim(),
            correo: document.getElementById("pago-correo").value.trim(),
            operacion: document.getElementById("pago-codigo").value.trim(),
            fecha: new Date().toISOString(),
            estado: "pendiente de verificación"
        };

        try {
            const lista = JSON.parse(localStorage.getItem("pedidos") || "[]");
            lista.push(pedido);
            localStorage.setItem("pedidos", JSON.stringify(lista));
        } catch (err) {}

        document.getElementById("pago-pedido").textContent = pedido.codigo;
        document.getElementById("pago-ok-correo").textContent = pedido.correo;

        const wa = document.getElementById("pago-whatsapp");
        if (CONFIG_PAGO.whatsapp) {
            const texto = "Hola, acabo de pagar por Yape.\n" +
                "Pedido: " + pedido.codigo + "\n" +
                "Producto: " + pedido.producto + "\n" +
                "Monto: " + formato(pedido.precio) + "\n" +
                "Código de operación: " + pedido.operacion + "\n" +
                "Nombre: " + pedido.cliente;
            wa.href = "https://wa.me/" + CONFIG_PAGO.whatsapp + "?text=" + encodeURIComponent(texto);
            wa.style.display = "inline-block";
        } else {
            wa.style.display = "none";
        }

        document.getElementById("pago-paso-1").style.display = "none";
        document.getElementById("pago-paso-2").style.display = "";
    }

    document.addEventListener("click", function (e) {
        const boton = e.target.closest(".compra button, [data-comprar]");
        if (!boton) return;
        e.preventDefault();
        e.stopPropagation();

        // --- CÓDIGO DE DESCUENTO ---
        let codigo = prompt("🎮 ¡Hola Gamer!\nIngresa un código de descuento:");
        
        if (codigo !== null) { 
            if (codigo.toUpperCase() === "GAMER10") {
                alert("✅ ¡Descuento del 10% aplicado exitosamente!");
                console.log("Código aplicado: GAMER10");
            } else {
                alert("❌ Código inválido. Se cobrará el precio completo.");
                console.log("Intento inválido: " + codigo);
            }
        }
        // ---------------------------

        // Abrimos la ventana de pago (CORREGIDO: Aquí faltaba esta parte)
        if (boton.dataset.nombre) {
            abrir({
                nombre: boton.dataset.nombre,
                precio: parseFloat(boton.dataset.precio),
                imagen: boton.dataset.imagen
            });
            return;
        }

        const tarjeta = boton.closest(".tarjeta-juego, .tarjeta-streaming");
        if (!tarjeta) return;

        const img = tarjeta.querySelector("img");
        const h3 = tarjeta.querySelector("h3");
        const nombre = h3
            ? h3.textContent.trim()
            : (img ? img.alt.replace(/^Logo de /, "") : "Producto") + " - " +
              (tarjeta.querySelector("p") ? tarjeta.querySelector("p").textContent.trim() : "");
        const precio = parseFloat(
            tarjeta.querySelector(".compra span").textContent.replace(",", ".").replace(/[^\d.]/g, "")
        );

        abrir({ nombre: nombre, precio: precio, imagen: img ? img.getAttribute("src") : "" });
    }, true);

    window.PixelPagos = { abrir: abrir, cerrar: cerrar };
})();
