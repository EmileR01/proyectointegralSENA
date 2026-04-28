// Inicialización de Iconos Lucide
lucide.createIcons();

// Mock Data de Inventario y Consumo
let inventoryStats = [
    { type: 'Pre-iniciador', stock: 450, capacity: 500, unit: 'kg', tone: 'bg-orange-500' },
    { type: 'Iniciador', stock: 800, capacity: 1000, unit: 'kg', tone: 'bg-amber-500' },
    { type: 'Levante', stock: 1200, capacity: 2000, unit: 'kg', tone: 'bg-blue-500' },
    { type: 'Ceba', stock: 300, capacity: 2000, unit: 'kg', tone: 'bg-rose-500' } // Low stock example
];

let dailyConsumption = [
    { id: 1, fecha: '2026-04-25', tipo: 'Levante', cantidad: '150', destino: 'Lote #42' },
    { id: 2, fecha: '2026-04-25', tipo: 'Pre-iniciador', cantidad: '25', destino: 'Corral 09' },
    { id: 3, fecha: '2026-04-24', tipo: 'Ceba', cantidad: '200', destino: 'Sector A-12' },
    { id: 4, fecha: '2026-04-24', tipo: 'Iniciador', cantidad: '80', destino: 'Lote #15' }
];

// Elementos del DOM
const inventoryGrid = document.getElementById('inventoryGrid');
const consumptionTable = document.getElementById('consumptionTable');

// Modal Elements
const supplyModal = document.getElementById('supplyModal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancelModal = document.getElementById('btnCancelModal');
const supplyForm = document.getElementById('supplyForm');

const formDate = document.getElementById('formDate');
const formType = document.getElementById('formType');
const formAmount = document.getElementById('formAmount');
const formTarget = document.getElementById('formTarget');

function renderInventory() {
    inventoryGrid.innerHTML = '';
    
    inventoryStats.forEach(stat => {
        const percentage = Math.round((stat.stock / stat.capacity) * 100);
        const isLow = percentage <= 20;

        const card = document.createElement('div');
        card.className = 'p-6 bg-white border border-slate-100 shadow-sm rounded-3xl relative overflow-hidden group';
        
        card.innerHTML = `
            <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <i data-lucide="database" class="w-20 h-20"></i>
            </div>
            <p class="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-1">
                ${stat.type}
            </p>
            <div class="flex items-end gap-2 mb-4 relative z-10">
                <span class="text-4xl font-black ${isLow ? 'text-rose-500' : 'text-slate-900'}">
                    ${stat.stock}
                </span>
                <span class="text-slate-500 font-medium mb-1">${stat.unit}</span>
            </div>

            <div class="flex justify-between text-xs font-bold text-slate-400 mb-2 relative z-10">
                <span>Capacidad: ${stat.capacity}${stat.unit}</span>
                <span>${percentage}%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5 relative z-10">
                <div class="h-2.5 rounded-full ${stat.tone}" style="width: ${percentage}%"></div>
            </div>
            ${isLow ? `
                <div class="mt-4 flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-50 p-2 rounded-lg relative z-10">
                    <i data-lucide="trending-down" class="w-4 h-4"></i>
                    Stock crítico. Reabastecer.
                </div>
            ` : ''}
        `;
        
        inventoryGrid.appendChild(card);
    });
    lucide.createIcons();
}

function renderTable() {
    consumptionTable.innerHTML = '';
    
    dailyConsumption.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">${row.fecha}</td>
            <td class="px-6 py-4 whitespace-nowrap font-bold text-slate-800">${row.tipo}</td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">${row.cantidad} kg</td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-600 font-medium">${row.destino}</td>
        `;
        consumptionTable.appendChild(tr);
    });
}

// Inicializar la interfaz
renderInventory();
renderTable();

// Lógica del Modal
function openModal() {
    supplyModal.classList.add('active');
    
    // Set today's date by default
    const today = new Date().toISOString().split('T')[0];
    formDate.value = today;
}

function closeModal() {
    supplyModal.classList.remove('active');
    supplyForm.reset();
}

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
btnCancelModal.addEventListener('click', closeModal);

// Enviar Formulario
supplyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newConsumption = {
        id: Date.now(),
        fecha: formDate.value,
        tipo: formType.value,
        cantidad: formAmount.value,
        destino: formTarget.value
    };
    
    // Añadir al inicio del array
    dailyConsumption.unshift(newConsumption);
    
    // Restar del inventario
    const inventoryItem = inventoryStats.find(item => item.type === newConsumption.tipo);
    if (inventoryItem) {
        inventoryItem.stock = Math.max(0, inventoryItem.stock - Number(newConsumption.cantidad));
    }
    
    // Actualizar UI
    renderInventory();
    renderTable();
    closeModal();
});
