// Inicialización de Iconos Lucide
lucide.createIcons();

// Datos de Prueba de Registros
let healthRecords = [
    { id: 1, fecha: '2026-04-20', idCerdo: '2024-001', diagnostico: 'Control rutinario', tratamiento: 'Vacuna Parvovirus', responsable: 'Juan Pérez' },
    { id: 2, fecha: '2026-04-22', idCerdo: '2024-042', diagnostico: 'Diarrea leve', tratamiento: 'Rehidratación y antibiótico', responsable: 'María Gómez' }
];

// Datos de Prueba de Medicamentos
const topMedicines = [
    { name: "Vacuna Parvovirus", dose: "2ml IM" },
    { name: "Rehidratación y antibiótico", dose: "5ml SC / 2ml IM" },
    { name: "Ivermectina 1%", dose: "1ml/33kg SC" },
    { name: "Hierro Dextrano", dose: "2ml IM (Día 3)" },
    { name: "Amoxicilina L.A.", dose: "1ml/10kg IM" }
];

// Elementos del DOM
const healthTable = document.getElementById('healthTable');
const healthModal = document.getElementById('healthModal');
const healthForm = document.getElementById('healthForm');

const btnOpenModal = document.getElementById('btnOpenModal');
const btnCancelModal = document.getElementById('btnCancelModal');

const formIdCerdo = document.getElementById('formIdCerdo');
const formFecha = document.getElementById('formFecha');
const formDiagnostico = document.getElementById('formDiagnostico');
const formTratamiento = document.getElementById('formTratamiento');
const formDosis = document.getElementById('formDosis');
const formResponsable = document.getElementById('formResponsable');

function renderTable() {
    healthTable.innerHTML = '';
    healthRecords.forEach(record => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">${record.fecha}</td>
            <td class="px-6 py-4 whitespace-nowrap font-black text-slate-800">${record.idCerdo}</td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">${record.diagnostico}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg font-bold text-sm">
                    ${record.tratamiento}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">${record.responsable}</td>
        `;
        healthTable.appendChild(tr);
    });
}

function initMedicines() {
    topMedicines.forEach(med => {
        const option = document.createElement('option');
        option.value = med.name;
        option.textContent = med.name;
        formTratamiento.appendChild(option);
    });
}

// Controladores de Eventos
formTratamiento.addEventListener('change', (e) => {
    const selectedName = e.target.value;
    const selectedMedicine = topMedicines.find(m => m.name === selectedName);
    if (selectedMedicine) {
        formDosis.value = selectedMedicine.dose;
    } else {
        formDosis.value = '';
    }
});

function openModal() {
    healthModal.classList.add('active');
    formFecha.value = new Date().toISOString().split('T')[0];
}

function closeModal() {
    healthModal.classList.remove('active');
    healthForm.reset();
    formDosis.value = '';
}

btnOpenModal.addEventListener('click', openModal);
btnCancelModal.addEventListener('click', closeModal);

healthForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newRecord = {
        id: Date.now(),
        fecha: formFecha.value,
        idCerdo: formIdCerdo.value,
        diagnostico: formDiagnostico.value,
        tratamiento: formTratamiento.value,
        responsable: formResponsable.value
    };

    healthRecords.push(newRecord);
    renderTable();
    closeModal();
});

// Inicialización
initMedicines();
renderTable();