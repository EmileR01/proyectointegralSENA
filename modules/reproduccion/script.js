// ===== BUSCADOR =====
const buscador = document.querySelector(".buscador input");
const filas = document.querySelectorAll(".tabla tbody tr");

buscador.addEventListener("keyup", () => {
  const texto = buscador.value.toLowerCase();

  filas.forEach(fila => {
    const idAnimal = fila.children[0].textContent.toLowerCase();
    fila.style.display = idAnimal.includes(texto) ? "" : "none";
  });
});

// ===== TABS =====
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("activo"));
    tab.classList.add("activo");
  });
});

// ===== VER DETALLES =====
const links = document.querySelectorAll(".tabla a");

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Aquí se mostrarán los detalles del evento reproductivo");
  });
});