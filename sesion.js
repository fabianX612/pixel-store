const modal = document.getElementById('ventana-sesion');
const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');
const mensaje = document.getElementById('mensaje-sesion');
const enlaceMenu = document.getElementById('abrir-sesion');

// Lee la lista de usuarios guardados en el navegador
function leerUsuarios() {
    try {
        return JSON.parse(localStorage.getItem('usuarios') || '[]');
    } catch (e) {
        return [];
    }
}

function mostrarMensaje(texto, ok) {
    mensaje.textContent = texto;
    mensaje.style.color = ok ? '#4cd964' : '#ff6b6b';
}

// Cambia el texto del menú según haya sesión o no
function actualizarMenu() {
    let actual = null;
    try {
        actual = JSON.parse(localStorage.getItem('sesion') || 'null');
    } catch (e) {}
    enlaceMenu.textContent = actual ? 'Hola, ' + actual.nombre + ' (Salir)' : 'Iniciar sesión';
}

// Clic en el menú: abre la ventana o cierra la sesión
enlaceMenu.addEventListener('click', function (e) {
    e.preventDefault();
    if (localStorage.getItem('sesion')) {
        localStorage.removeItem('sesion');
        actualizarMenu();
    } else {
        mensaje.textContent = '';
        modal.classList.add('activa');
    }
});

// Cerrar con la X o haciendo clic fuera de la caja
document.getElementById('cerrar-sesion').addEventListener('click', function () {
    modal.classList.remove('activa');
});
modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('activa');
});

// Cambiar entre ingresar y registrarse
document.getElementById('ir-registro').addEventListener('click', function (e) {
    e.preventDefault();
    formLogin.style.display = 'none';
    formRegistro.style.display = 'flex';
    mensaje.textContent = '';
});
document.getElementById('ir-login').addEventListener('click', function (e) {
    e.preventDefault();
    formRegistro.style.display = 'none';
    formLogin.style.display = 'flex';
    mensaje.textContent = '';
});

// Registrar usuario
formRegistro.addEventListener('submit', function (e) {
    e.preventDefault();
    const usuarios = leerUsuarios();
    const correo = document.getElementById('reg-correo').value.trim().toLowerCase();

    if (usuarios.some(function (u) { return u.correo === correo; })) {
        mostrarMensaje('Ese correo ya está registrado', false);
        return;
    }

    usuarios.push({
        nombre: document.getElementById('reg-nombre').value.trim(),
        correo: correo,
        clave: document.getElementById('reg-clave').value
    });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    formRegistro.reset();

    // Pasa al formulario de ingreso con el mensaje de éxito
    formRegistro.style.display = 'none';
    formLogin.style.display = 'flex';
    mostrarMensaje('Cuenta creada. Ahora inicia sesión', true);
});

// Iniciar sesión
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

    localStorage.setItem('sesion', JSON.stringify({ nombre: usuario.nombre, correo: usuario.correo }));
    modal.classList.remove('activa');
    formLogin.reset();
    mensaje.textContent = '';
    actualizarMenu();
});

actualizarMenu();