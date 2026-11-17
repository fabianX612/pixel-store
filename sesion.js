// ===== ELEMENTOS PRINCIPALES =====
const modal = document.getElementById('ventana-sesion');
const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');
const formRecuperar = document.getElementById('form-recuperar');
const mensaje = document.getElementById('mensaje-sesion');
const enlaceMenu = document.getElementById('abrir-sesion');
const menuUsuario = document.getElementById('menu-usuario');
const spanNombre = document.getElementById('nombre-usuario');
const btnSalir = document.getElementById('cerrar-sesion-usuario');

// ===== LEER USUARIOS GUARDADOS =====
function leerUsuarios() {
    try {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    } catch (error) {
        return [];
    }
}

// ===== MOSTRAR MENSAJES =====
function mostrarMensaje(texto, correcto) {
    mensaje.textContent = texto;
    mensaje.style.color = correcto ? '#4cd964' : '#ff6b6b';
}

// ===== OBTENER SESION ACTUAL =====
function obtenerSesion() {
    try {
        return JSON.parse(
            sessionStorage.getItem('sesion') ||
            localStorage.getItem('sesion') ||
            'null'
        );
    } catch (error) {
        return null;
    }
}

// ===== ACTUALIZAR MENU DE USUARIO =====
function actualizarMenu() {
    const actual = obtenerSesion();

    if (actual) {
        enlaceMenu.style.display = 'none';
        menuUsuario.style.display = 'flex';
        spanNombre.textContent = actual.nombre || 'Usuario';
    } else {
        enlaceMenu.style.display = 'inline';
        menuUsuario.style.display = 'none';
    }
}

// ===== CAMBIAR FORMULARIOS =====
function mostrarFormulario(formulario) {
    formLogin.style.display = 'none';
    formRegistro.style.display = 'none';
    formRecuperar.style.display = 'none';
    formulario.style.display = 'flex';
    mensaje.textContent = '';
}

// ===== ABRIR VENTANA DE INICIO DE SESION =====
enlaceMenu.addEventListener('click', function (e) {
    e.preventDefault();
    mostrarFormulario(formLogin);
    modal.classList.add('activa');
});

// ===== CERRAR SESION DESDE EL MENU =====
if (btnSalir) {
    btnSalir.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('sesion');
        sessionStorage.removeItem('sesion');
        actualizarMenu();
    });
}

// ===== CERRAR VENTANA =====
document.getElementById('cerrar-sesion').addEventListener('click', function () {
    modal.classList.remove('activa');
});

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.classList.remove('activa');
    }
});

// ===== MOSTRAR Y OCULTAR CONTRASEÑA =====
document.querySelectorAll('.ver-clave').forEach(function (boton) {
    boton.addEventListener('click', function () {
        const campo = document.getElementById(boton.dataset.campo);
        if (!campo) return;

        if (campo.type === 'password') {
            campo.type = 'text';
            boton.textContent = 'Ocultar';
        } else {
            campo.type = 'password';
            boton.textContent = 'Mostrar';
        }
    });
});

// ===== IR A REGISTRO =====
document.getElementById('ir-registro').addEventListener('click', function (e) {
    e.preventDefault();
    formRegistro.reset();
    mostrarFormulario(formRegistro);
});

// ===== VOLVER A LOGIN =====
document.getElementById('ir-login').addEventListener('click', function (e) {
    e.preventDefault();
    formLogin.reset();
    mostrarFormulario(formLogin);
});

document.getElementById('volver-login').addEventListener('click', function (e) {
    e.preventDefault();
    formRecuperar.reset();
    mostrarFormulario(formLogin);
});

// ===== IR A RECUPERAR CONTRASEÑA =====
document.getElementById('ir-recuperar').addEventListener('click', function (e) {
    e.preventDefault();
    formRecuperar.reset();
    mostrarFormulario(formRecuperar);
});

// ===== REGISTRAR USUARIO =====
formRegistro.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuarios = leerUsuarios();
    const nombre = document.getElementById('reg-nombre').value.trim();
    const correo = document.getElementById('reg-correo').value.trim().toLowerCase();
    const clave = document.getElementById('reg-clave').value;
    const confirmar = document.getElementById('reg-confirmar').value;

    if (clave.length < 6) {
        mostrarMensaje('La contraseña debe tener al menos 6 caracteres', false);
        return;
    }
    if (clave !== confirmar) {
        mostrarMensaje('Las contraseñas no coinciden', false);
        return;
    }
    if (usuarios.some(function (usuario) { return usuario.correo === correo; })) {
        mostrarMensaje('Ese correo ya está registrado', false);
        return;
    }

    usuarios.push({ nombre: nombre, correo: correo, clave: clave });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    formRegistro.reset();
    mostrarFormulario(formLogin);
    mostrarMensaje('Cuenta creada. Ahora inicia sesión', true);
});

// ===== INICIAR SESION =====
formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = document.getElementById('login-correo').value.trim().toLowerCase();
    const clave = document.getElementById('login-clave').value;
    const usuario = leerUsuarios().find(function (u) {
        return u.correo === correo && u.clave === clave;
    });

    if (!usuario) {
        mostrarMensaje('Correo o contraseña incorrectos', false);
        return;
    }

    const datosSesion = { nombre: usuario.nombre, correo: usuario.correo };
    const recordar = document.getElementById('recordar-sesion').checked;

    localStorage.removeItem('sesion');
    sessionStorage.removeItem('sesion');

    if (recordar) {
        localStorage.setItem('sesion', JSON.stringify(datosSesion));
    } else {
        sessionStorage.setItem('sesion', JSON.stringify(datosSesion));
    }

    formLogin.reset();
    modal.classList.remove('activa');
    mensaje.textContent = '';
    actualizarMenu();
});

// ===== RECUPERAR CONTRASEÑA (SIMULACION LOCAL) =====
formRecuperar.addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = document.getElementById('rec-correo').value.trim().toLowerCase();
    const clave = document.getElementById('rec-clave').value;
    const confirmar = document.getElementById('rec-confirmar').value;
    const usuarios = leerUsuarios();
    const posicion = usuarios.findIndex(function (u) { return u.correo === correo; });

    if (posicion === -1) {
        mostrarMensaje('No existe una cuenta con ese correo', false);
        return;
    }
    if (clave.length < 6) {
        mostrarMensaje('La contraseña debe tener al menos 6 caracteres', false);
        return;
    }
    if (clave !== confirmar) {
        mostrarMensaje('Las contraseñas no coinciden', false);
        return;
    }

    usuarios[posicion].clave = clave;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    formRecuperar.reset();
    mostrarFormulario(formLogin);
    mostrarMensaje('Contraseña actualizada correctamente', true);
});

// ===== INICIO =====
actualizarMenu();
