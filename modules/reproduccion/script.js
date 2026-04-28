// Inicialización de Iconos Lucide
lucide.createIcons();

// Mock Data
const summaryStats = [
    { title: 'Hembras en Gestación', value: '42', icon: 'activity', tone: 'text-fuchsia-500', bg: 'bg-fuchsia-100' },
    { title: 'Próximos Partos (7d)', value: '8', icon: 'calendar-days', tone: 'text-pink-500', bg: 'bg-pink-100' },
    { title: 'Tasa de Destete', value: '92%', icon: 'percent', tone: 'text-purple-500', bg: 'bg-purple-100' }
];

let reproductionEvents = [
    { id: 1, hembra: 'H-001', fechaServicio: '2026-01-15', tipo: 'Inseminación', fechaParto: '2026-05-09', estado: 'Gestante', diasGestacion: 108 },
    { id: 2, hembra: 'H-045', fechaServicio: '2026-02-02', tipo: 'Monta Natural', fechaParto: '2026-05-27', estado: 'Gestante', diasGestacion: 90 },
    { id: 3, hembra: 'H-112', fechaServicio: '2026-04-10', tipo: 'Inseminación', fechaParto: '2026-08-02', estado: 'Servida', diasGestacion: 15 },
    { id: 4, hembra: 'H-089', fechaServicio: '2025-12-20', tipo: 'Monta Natural', fechaParto: '2026-04-12', estado: 'Lactante', diasGestacion: null }
];

// Constants from Standards
const duracionPromedioDias = 114;
const minEdadDias = 220; // 220 días para el primer servicio
const ventanaAlertaMaternidadDias = 7;

// DOM Elements
const summaryStatsGrid = document.getElementById('summaryStatsGrid');
const reproductionTable = document.getElementById('reproductionTable');

const serviceModal = document.getElementById('serviceModal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancelModal = document.getElementById('btnCancelModal');
const serviceForm = document.getElementById('serviceForm');

const formHembraId = document.getElementById('formHembraId');
const formEdadDias = document.getElementById('formEdadDias');
const alertaMadurez = document.getElementById('alertaMadurez');
const formFechaServicio = document.getElementById('formFechaServicio');
const formEstimadoParto = document.getElementById('formEstimadoParto');

function renderSummary() {
    summaryStatsGrid.innerHTML = '';
    summaryStats.forEach(stat => {
        const card = document.createElement('div');
        card.className = `p-6 bg-white border border-slate-100 shadow-sm rounded-[2rem] flex items-center gap-5 hover:shadow-md hover:shadow-slate-200/50 transition-shadow cursor-default`;
        card.innerHTML = `
            <div class="p-4 rounded-2xl ${stat.bg}">
                <i data-lucide="${stat.icon}" class="w-8 h-8 ${stat.tone}"></i>
            </div>
            <div>
                <p class="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500 mb-1">
                    ${stat.title}
                </p>
                <p class="text-4xl font-black text-slate-900">
                    ${stat.value}
                </p>
            </div>
        `;
        summaryStatsGrid.appendChild(card);
    });
}

function getBadgeStyle(estado) {
    switch(estado) {
        case 'Gestante': return 'bg-fuchsia-100 text-fuchsia-700';
        case 'Lactante': return 'bg-emerald-100 text-emerald-700';
        case 'Descarte': return 'bg-rose-100 text-rose-700';
        case 'Servida': return 'bg-blue-100 text-blue-700';
        default: return 'bg-slate-100 text-slate-600'; // Vacia, Destetada
    }
}

function renderProgressBar(dias) {
    if (!dias) return '';
    const progress = Math.min(Math.round((dias / duracionPromedioDias) * 100), 100);
    const isAlert = dias >= (duracionPromedioDias - ventanaAlertaMaternidadDias);
    const colorClass = isAlert ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'bg-fuchsia-500';
    
    return `
        <div class="w-full max-w-[120px] mt-2">
            <div class="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                <span>${dias}d</span>
                <span>${duracionPromedioDias}d</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div class="h-1.5 rounded-full ${colorClass} transition-all duration-500" style="width: ${progress}%"></div>
            </div>
        </div>
    `;
}

function renderTable() {
    reproductionTable.innerHTML = '';
    reproductionEvents.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap font-bold text-slate-800">${row.hembra}</td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">${row.fechaServicio}</td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">${row.tipo}</td>
            <td class="px-6 py-4 whitespace-nowrap font-bold text-slate-800">${row.fechaParto}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div>
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${getBadgeStyle(row.estado)}">
                        ${row.estado}
                    </span>
                    ${row.estado === 'Gestante' ? renderProgressBar(row.diasGestacion) : ''}
                </div>
            </td>
        `;
        reproductionTable.appendChild(tr);
    });
    lucide.createIcons();
}

// Inicializar
renderSummary();
renderTable();

// Lógica de Modal y Formulario
function openModal() {
    serviceModal.classList.add('active');
    alertaMadurez.classList.add('hidden');
    formEstimadoParto.value = '';
}

function closeModal() {
    serviceModal.classList.remove('active');
    serviceForm.reset();
}

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
btnCancelModal.addEventListener('click', closeModal);

// Event Listeners para cálculos automáticos en el form
formFechaServicio.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value) {
        const fecha = new Date(value);
        fecha.setUTCDate(fecha.getUTCDate() + duracionPromedioDias);
        formEstimadoParto.value = fecha.toISOString().split('T')[0];
    } else {
        formEstimadoParto.value = '';
    }
});

formEdadDias.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value && value < minEdadDias) {
        alertaMadurez.classList.remove('hidden');
        alertaMadurez.classList.add('flex');
        alertaMadurez.querySelector('span').textContent = `Alerta de Madurez: Hembra por debajo de los ${minEdadDias} días reglamentarios`;
    } else {
        alertaMadurez.classList.add('hidden');
        alertaMadurez.classList.remove('flex');
    }
});

// Enviar
serviceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newEvent = {
        id: Date.now(),
        hembra: formHembraId.value,
        fechaServicio: formFechaServicio.value,
        tipo: 'Inseminación', // Asumido por defecto para la demo
        fechaParto: formEstimadoParto.value,
        estado: 'Gestante',
        diasGestacion: 1 // Día 1 de gestación al registrar el servicio
    };

    reproductionEvents.unshift(newEvent);
    renderTable();
    closeModal();
});