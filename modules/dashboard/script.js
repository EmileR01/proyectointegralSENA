// Inicialización de Iconos Lucide
lucide.createIcons();

const stats = [
    { title: 'Total de cerdos', value: '1500', detail: '+2.5%', width: 'w-[88%]', tone: 'bg-emerald-500' },
    { title: 'Cerdos en crecimiento', value: '1200', detail: '80% del total', width: 'w-[80%]', tone: 'bg-sky-500' },
    { title: 'Listos para venta', value: '300', detail: '20% del total', width: 'w-[35%]', tone: 'bg-amber-400' }
];

const quickActions = [
    { label: 'Registrar nuevo cerdo', path: '../registro-peso/index.html' },
    { label: 'Ver inventario', path: '../reportes/index.html' },
    { label: 'Registrar alimentacion', path: '../alimentacion/index.html' },
    { label: 'Ver reportes de salud', path: '../vacunacion/index.html' }
];

const recentActivity = [
    { id: 1, title: 'Nuevo lote registrado', meta: 'Hace 2 horas', area: 'Sector B-04' },
    { id: 2, title: 'Vacunacion completada', meta: 'Hace 5 horas', area: 'Sector A-12' },
    { id: 3, title: 'Alerta de peso bajo', meta: 'Ayer', area: 'Corral 09' }
];

// 1. Renderizar Cuadrícula de Estadísticas
const statsGrid = document.getElementById('statsGrid');

stats.forEach(stat => {
    const card = document.createElement('div');
    card.className = 'p-6 rounded-[2rem] bg-white shadow-sm border border-slate-100 flex flex-col justify-between';
    card.innerHTML = `
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">${stat.title}</p>
        <div class="mt-4 flex items-end justify-between gap-4">
            <p class="text-4xl font-black text-slate-950">${stat.value}</p>
            <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                ${stat.detail}
            </span>
        </div>
        <div class="mt-5 h-3 rounded-full bg-slate-100">
            <div class="h-3 rounded-full ${stat.tone} ${stat.width}"></div>
        </div>
    `;
    statsGrid.appendChild(card);
});

// Tarjeta de Rendimiento de Crecimiento
const rendimientoCard = document.createElement('div');
rendimientoCard.className = 'p-6 rounded-[2rem] bg-white shadow-sm border border-slate-100';
rendimientoCard.innerHTML = `
    <div class="flex items-start justify-between">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Rendimiento Crecimiento</p>
        <div class="rounded-xl bg-blue-100 p-2 text-blue-600">
            <i data-lucide="trending-up" class="w-5 h-5"></i>
        </div>
    </div>
    <div class="mt-2 flex items-end justify-between gap-4">
        <p class="text-4xl font-black text-slate-950">820<span class="text-lg text-slate-500 font-bold">g/d</span></p>
        <span class="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Óptimo</span>
    </div>
    <div class="mt-4 h-10 w-full relative overflow-hidden rounded-lg">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline points="0,80 33,60 66,35 100,5" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="8 8" class="opacity-50" />
            <polyline points="0,90 33,70 66,45 100,10" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </div>
`;
statsGrid.appendChild(rendimientoCard);

// Tarjeta de Cumplimiento Sanitario
const sanidadCard = document.createElement('div');
sanidadCard.className = 'p-6 rounded-[2rem] bg-white shadow-sm border border-slate-100';
sanidadCard.innerHTML = `
    <div class="flex items-start justify-between">
        <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Cumplimiento Sanitario</p>
        <div class="rounded-xl bg-emerald-100 p-2 text-emerald-500">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
        </div>
    </div>
    <div class="mt-2 flex items-end justify-between gap-4">
        <p class="text-4xl font-black text-slate-950">85%</p>
        <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">ICA</span>
    </div>
    <div class="mt-5 h-3 rounded-full bg-slate-100">
        <div class="h-3 w-[85%] rounded-full bg-emerald-500"></div>
    </div>
`;
statsGrid.appendChild(sanidadCard);

// 2. Renderizar Acciones Rápidas
const quickActionsGrid = document.getElementById('quickActionsGrid');
quickActions.forEach(action => {
    const btn = document.createElement('a');
    btn.href = action.path;
    btn.className = 'px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors flex items-center justify-start text-left hover:scale-[1.02]';
    btn.textContent = action.label;
    quickActionsGrid.appendChild(btn);
});

// 3. Renderizar Tabla de Actividad
const activityTableBody = document.getElementById('activityTableBody');
recentActivity.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap font-bold text-slate-800">${row.title}</td>
        <td class="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">${row.meta}</td>
        <td class="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">${row.area}</td>
    `;
    activityTableBody.appendChild(tr);
});

// 4. Renderizar Sugerencia del Sistema
const suggestionCard = document.getElementById('systemSuggestionCard');

// Simulando el caso por defecto de Sugerencia del Sistema
suggestionCard.innerHTML = `
    <p class="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
        Sugerencia del sistema
    </p>
    <h3 class="mt-4 text-3xl font-black">Optimiza el feed del Lote #42</h3>
    <p class="mt-4 leading-7 text-slate-300">
        Basado en el crecimiento actual, conviene ajustar la racion para mejorar conversion y reducir desperdicio en la siguiente semana.
    </p>
    <a href="../alimentacion/index.html" class="inline-block mt-8 px-6 py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition">
        Ver detalles
    </a>
`;

// Renderizar nuevos íconos
lucide.createIcons();
