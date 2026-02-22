function nuevoUsuario() {
    alert("Aquí se abriría el formulario para crear un nuevo usuario");
}

function editar() {
    alert("Editar usuario");
}

function cambiarPass() {
    alert("Cambiar contraseña del usuario");
}

function guardarCambios() {
    const nueva = document.getElementById("nueva").value;
    const confirmar = document.getElementById("confirmar").value;

    if (nueva.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres");
        return;
    }

    if (nueva !== confirmar) {
        alert("Las contraseñas no coinciden");
        return;
    }

    alert("Contraseña actualizada correctamente");
}

