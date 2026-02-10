document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');
    const inputUsuario = document.getElementById('Usuario');
    const inputContrasena = document.getElementById('contraseña');
    const boton = document.querySelector('button');

    if (!form || !inputUsuario || !inputContrasena || !boton) {
        return;
    }

    const mensaje = document.createElement('p');
    mensaje.id = 'mensaje-login';
    mensaje.style.marginTop = '12px';
    mensaje.style.fontSize = '0.95rem';
    mensaje.style.fontWeight = '600';
    boton.insertAdjacentElement('afterend', mensaje);

    const usuariosValidos = [
        { usuario: 'admin@sena.edu.co', contrasena: '12345' },
        { usuario: 'usuario@sena.edu.co', contrasena: 'Proyecto2026*' }
    ];

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contrasenaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    function setMensaje(texto, ok) {
        mensaje.textContent = texto;
        mensaje.style.color = ok ? '#0f7a3f' : '#b00020';
    }

    const dashboardUrl = '../Dashboard/index.html';

    function validar() {
        const usuario = inputUsuario.value.trim();
        const contrasena = inputContrasena.value;

        if (!usuario || !contrasena) {
            setMensaje('Por favor ingresa usuario y contraseña.', false);
            return false;
        }

        if (!correoRegex.test(usuario)) {
            setMensaje('El usuario debe ser un correo válido.', false);
            return false;
        }

        if (!contrasenaRegex.test(contrasena)) {
            setMensaje('La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo.', false);
            return false;
        }

        const coincide = usuariosValidos.some(
            (u) => u.usuario === usuario && u.contrasena === contrasena
        );

        if (!coincide) {
            setMensaje('Usuario o contraseña incorrectos.', false);
            return false;
        }

        setMensaje('Inicio de sesión correcto.', true);
        return true;
    }

    function manejarEnvio(event) {
        event.preventDefault();
        if (validar()) {
            window.location.href = dashboardUrl;
        }
    }

    form.addEventListener('submit', manejarEnvio);
    boton.addEventListener('click', manejarEnvio);
});
