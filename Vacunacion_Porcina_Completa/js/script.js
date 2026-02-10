const contenedor = document.getElementById("contenedorVacunas");
const modal = document.getElementById("modal");

const nombre = document.getElementById("nombre");
const porcino = document.getElementById("porcino");
const fecha = document.getElementById("fecha");
const dosis = document.getElementById("dosis");
const responsable = document.getElementById("responsable");
const estado = document.getElementById("estado");
const buscador = document.querySelector(".busqueda");

// = DATOS =
let vacunas = JSON.parse(localStorage.getItem("vacunas")) || [];
let editIndex = null;

function render(lista = vacunas){
    contenedor.innerHTML = "";
    lista.forEach((v,i)=>{
        if(v.eliminada) return;

        contenedor.innerHTML += `
        <section class="cuadro1">
            <p><b>${v.nombre}</b></p>
            <p>Porcino: ${v.porcino}</p>
            <p>Aplicación: ${v.fecha}</p>
            <p>Próxima dosis: ${v.dosis} cm</p>
            <p>Responsable: ${v.responsable}</p>
            <p class="${v.estado === "Completada" ? "final" : "final2"}">
                ${v.estado}
            </p>
            <button onclick="editar(${i})"></button>
            <button onclick="eliminar(${i})"></button>
        </section>`;
    });
}
render();

function abrirFormulario(){
    modal.classList.remove("oculto");
}
function cerrarFormulario(){
    modal.classList.add("oculto");
    limpiarFormulario();
}

function guardar(){
    if(!nombre.value || !porcino.value || !dosis.value){
        alert("Completa los campos obligatorios");
        return;
    }

    const vacuna = {
        nombre: nombre.value,
        porcino: porcino.value,
        fecha: fecha.value,
        dosis: Number(dosis.value),
        responsable: responsable.value,
        estado: estado.value,
        eliminada:false
    };

    if(editIndex !== null){
        vacunas[editIndex] = vacuna;
        editIndex = null;
    } else {
        vacunas.push(vacuna);
    }

    localStorage.setItem("vacunas", JSON.stringify(vacunas));
    cerrarFormulario();
    render();
}

function editar(i){
    const v = vacunas[i];
    nombre.value = v.nombre;
    porcino.value = v.porcino;
    fecha.value = v.fecha;
    dosis.value = v.dosis;
    responsable.value = v.responsable;
    estado.value = v.estado;
    editIndex = i;
    abrirFormulario();
}

function eliminar(i){
    vacunas[i].eliminada = true;
    localStorage.setItem("vacunas", JSON.stringify(vacunas));
    render();
}

function mostrarTodas(){ render(vacunas); }
function mostrarCompletadas(){
    render(vacunas.filter(v=>v.estado==="Completada" && !v.eliminada));
}
function mostrarPendientes(){
    render(vacunas.filter(v=>v.estado==="Pendiente" && !v.eliminada));
}

// = BUSCADOR =
buscador.addEventListener("input", e=>{
    const t = e.target.value.toLowerCase();
    render(vacunas.filter(v=>
        !v.eliminada &&
        (v.nombre.toLowerCase().includes(t) ||
         v.porcino.toLowerCase().includes(t))
    ));
});

// = Papelera =
function verPapelera(){
    contenedor.innerHTML = "";

    const eliminadas = vacunas.filter(v => v.eliminada);

    if(eliminadas.length === 0){
        contenedor.innerHTML = "<p>Papelera vacía</p>";
        return;
    }

    eliminadas.forEach((v, i) => {
        contenedor.innerHTML += `
            <section class="cuadro1">
                <p><b> ${v.nombre}</b></p>
                <p>Porcino: ${v.porcino}</p>
                <p>Dosis: ${v.dosis} cc</p>

                <button onclick="recuperarVacuna(${i})">♻️ Recuperar</button>
            </section>
        `;
    });
}
function recuperarVacuna(index){
    // Buscar las eliminadas
    const eliminadas = vacunas.filter(v => v.eliminada);

    // Recuperamos la correcta
    eliminadas[index].eliminada = false;

    // Guardamos cambios
    localStorage.setItem("vacunas", JSON.stringify(vacunas));

    // Volvemos a la vista normal
    render();
}
function vistaCalendario() {
    contenedor.innerHTML = "";

    const porFecha = {};

    vacunas.forEach(v => {
        if (v.eliminada) return;
        if (!v.fecha) return;

        if (!porFecha[v.fecha]) {
            porFecha[v.fecha] = [];
        }
        porFecha[v.fecha].push(v);
    });

    if (Object.keys(porFecha).length === 0) {
        contenedor.innerHTML = "<p>No hay vacunas con fecha asignada</p>";
        return;
    }

    for (const fecha in porFecha) {
        contenedor.innerHTML += `
            <section class="cuadro1">
                <p class="titulos"> ${fecha}</p>
                ${porFecha[fecha].map(v => `
                    <p class="descripciones">
                         ${v.porcino} –  ${v.nombre} (${v.dosis} cc)
                    </p>
                `).join("")}
            </section>
        `;
    }
}

function salir(){
    alert("Sesión finalizada");
}

function limpiarFormulario(){
    nombre.value = "";
    porcino.value = "";
    fecha.value = "";
    dosis.value = "";
    responsable.value = "";
    estado.value = "Completada";
}