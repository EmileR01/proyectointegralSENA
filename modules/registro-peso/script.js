// Inicialización de Iconos Lucide
lucide.createIcons();

let animals = [
    { id: 'L-001', etapa: 'pre_ceba', pesos: [{ fecha: '2026-04-10', peso: 20 }, { fecha: '2026-04-20', peso: 24 }] }, // 400g/day
    { id: 'L-002', etapa: 'levante', pesos: [{ fecha: '2026-04-05', peso: 50 }, { fecha: '2026-04-25', peso: 68 }] }, // 900g/day
    { id: 'L-003', etapa: 'ceba_finalizacion', pesos: [{ fecha: '2026-04-10', peso: 110 }, { fecha: '2026-04-25', peso: 115 }] }, // 333g/day (Bad)
    { id: 'L-004', etapa: 'pre_ceba', pesos: [{ fecha: '2026-04-15', peso: 15 }, { fecha: '2026-04-25', peso: 19.5 }] }, // 450g/day
];

let currentFilter = 'todas';

// Referencias del DOM
const weightTable = document.getElementById('weightTable');
const averageWeightEl = document.getElementById('averageWeight');
const filtersContainer = document.getElementById('filtersContainer');

// Referencias del Modal
const weightModal = document.getElementById('weightModal');
const weightForm = document.getElementById('weightForm');
const formAnimalId = document.getElementById('formAnimalId');
const formEtapa = document.getElementById('formEtapa');
const formPeso = document.getElementById('formPeso');
const formFecha = document.getElementById('formFecha');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancelModal = document.getElementById('btnCancelModal');

const gdpCritica = 700; // Gramos/día
const gdpExcelente = 900; // Gramos/día

function getLatestWeight(pesos) {
    if (pesos.length === 0) return 0;
    const sorted = [...pesos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    return sorted[sorted.length - 1].peso;
}

function computeGDP(pesos) {
    if (pesos.length < 2) return null;
    const sorted = [...pesos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    const latest = sorted[sorted.length - 1];
    const prev = sorted[sorted.length - 2];
    
    const diffDays = (new Date(latest.fecha) - new Date(prev.fecha)) / (1000 * 60 * 60 * 24);
    if (diffDays <= 0) return 0;
    
    return Math.round(((latest.peso - prev.peso) / diffDays) * 1000);
}

function renderTable() {
    weightTable.innerHTML = '';
    
    const filteredAnimals = currentFilter === 'todas' 
        ? animals 
        : animals.filter(a => a.etapa === currentFilter);

    // Calcular y renderizar promedio
    let avg = 0;
    if (filteredAnimals.length > 0) {
        const total = filteredAnimals.reduce((acc, curr) => acc + getLatestWeight(curr.pesos), 0);
        avg = (total / filteredAnimals.length).toFixed(1);
    }
    averageWeightEl.textContent = `${avg} kg`;

    filteredAnimals.forEach(animal => {
        const latestWeight = getLatestWeight(animal.pesos);
        const gdp = computeGDP(animal.pesos);
        
        let gdpHtml = `<span class="text-slate-400 text-sm font-medium italic">Sin historial</span>`;
        
        if (gdp !== null) {
            let colorClass = "text-slate-600 bg-slate-100";
            let iconName = "activity";
            
            if (gdp < gdpCritica) {
                colorClass = "text-rose-700 bg-rose-100 border border-rose-200";
                iconName = "trending-down";
            } else if (gdp >= gdpExcelente) {
                colorClass = "text-emerald-700 bg-emerald-100 border border-emerald-200 shadow-sm shadow-emerald-500/20";
                iconName = "arrow-up-right";
            } else {
                colorClass = "text-blue-700 bg-blue-50 border border-blue-100";
                iconName = "trending-up";
            }

            gdpHtml = `
                <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold ${colorClass}">
                    <i data-lucide="${iconName}" class="w-[18px] h-[18px]" style="stroke-width: 3"></i>
                    ${gdp} g/día
                </div>
            `;
        }

        const etapaDisplay = animal.etapa.replace('_', ' ');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-slate-800 font-bold">${animal.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="capitalize text-slate-600 font-semibold text-sm px-3 py-1 bg-slate-100 rounded-lg">
                    ${etapaDisplay}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="font-black text-slate-800 text-lg">${latestWeight} kg</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${gdpHtml}
            </td>
        `;
        weightTable.appendChild(tr);
    });

    lucide.createIcons();
}

// Filtros
filtersContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const filterBtns = filtersContainer.querySelectorAll('button');
        filterBtns.forEach(btn => {
            btn.className = 'filter-btn px-5 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap text-slate-500 hover:bg-slate-100 hover:text-slate-800';
        });

        e.target.className = 'filter-btn px-5 py-2.5 rounded-xl font-bold text-sm transition-colors whitespace-nowrap bg-slate-900 text-white shadow-md';
        
        currentFilter = e.target.getAttribute('data-filter');
        renderTable();
    }
});

// Modal Logic
function openModal() {
    weightModal.classList.add('active');
    const today = new Date().toISOString().split('T')[0];
    formFecha.value = today;
}

function closeModal() {
    weightModal.classList.remove('active');
    weightForm.reset();
}

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
btnCancelModal.addEventListener('click', closeModal);

weightForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const animalId = formAnimalId.value;
    const etapa = formEtapa.value;
    const peso = parseFloat(formPeso.value);
    const fecha = formFecha.value;

    const existingAnimal = animals.find(a => a.id === animalId);
    
    if (existingAnimal) {
        existingAnimal.pesos.push({ fecha, peso });
        // Actualizamos la etapa si la cambiaron
        existingAnimal.etapa = etapa;
    } else {
        animals.push({
            id: animalId,
            etapa: etapa,
            pesos: [{ fecha, peso }]
        });
    }

    renderTable();
    closeModal();
});

// Inicializar
renderTable();