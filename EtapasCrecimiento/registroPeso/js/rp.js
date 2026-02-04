// Cargar historial al iniciar
document.addEventListener("DOMContentLoaded", cargarHistorial);

function guardarPeso() {
  const fecha = document.querySelector('input[type="date"]').value;
  const peso = document.querySelector('input[type="number"]').value;
  const animal = document.querySelector('input[type="text"]').value;

  if (!fecha || !peso || !animal) {
    alert("Completa todos los campos");
    return;
  }

  const registro = {
    fecha,
    peso,
    animal
  };

  let registros = JSON.parse(localStorage.getItem("pesos")) || [];
  registros.unshift(registro);
  localStorage.setItem("pesos", JSON.stringify(registros));

  limpiarCampos();
  cargarHistorial();
}

// Mostrar historial
function cargarHistorial() {
  const contenedor = document.querySelector(".historial");
  contenedor.innerHTML = "";

  let registros = JSON.parse(localStorage.getItem("pesos")) || [];

  registros.slice(0, 5).forEach(r => {
    const fila = document.createElement("div");

    fila.innerHTML = `
      <span>${r.animal} · ${r.fecha}</span>
      <strong>${r.peso} kg</strong>
    `;

    contenedor.appendChild(fila);
  });
}

// Limpiar inputs
function limpiarCampos() {
  document.querySelector('input[type="date"]').value = "";
  document.querySelector('input[type="number"]').value = "";
  document.querySelector('input[type="text"]').value = "";
}