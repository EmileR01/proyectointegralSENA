// Inicialización de Iconos Lucide
lucide.createIcons();

const alerts = [
    { id: 1, type: 'critical', title: 'Caída de Consumo', desc: 'El Lote #42 redujo su consumo diario en un 15%.', time: 'Hace 2 horas' },
    { id: 2, type: 'preventive', title: 'Vacunación Próxima', desc: '14 hembras gestantes requieren vacuna contra Parvovirus.', time: 'Hoy' },
    { id: 3, type: 'preventive', title: 'Revisión de Inventario', desc: 'El alimento Pre-iniciador está por debajo del 20%.', time: 'Ayer' },
];

const kpiData = [
    { metrica: 'Conversión Alimenticia', actual: '2.4', objetivo: '2.3', variacion: '+4.3%', estado: 'Regular' },
    { metrica: 'Tasa de Mortalidad', actual: '1.2%', objetivo: '< 2.0%', variacion: '-0.5%', estado: 'Óptimo' },
    { metrica: 'Total Nacimientos', actual: '142', objetivo: '135', variacion: '+5.1%', estado: 'Óptimo' },
    { metrica: 'GDP Promedio (Ceba)', actual: '910 g/d', objetivo: '900 g/d', variacion: '+1.1%', estado: 'Óptimo' },
];

const alertsGrid = document.getElementById('alertsGrid');
const kpiTable = document.getElementById('kpiTable');

function renderAlerts() {
    alertsGrid.innerHTML = '';
    alerts.forEach(alert => {
        const isCritical = alert.type === 'critical';
        const colorBorder = isCritical ? 'bg-rose-500' : 'bg-amber-400';
        const bgColor = isCritical ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600';
        const iconName = isCritical ? 'alert-triangle' : 'info';

        const card = document.createElement('div');
        card.className = 'bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex relative group hover:shadow-md transition-shadow';
        card.innerHTML = `
            <div class="w-2 shrink-0 ${colorBorder}"></div>
            <div class="p-4 flex-1">
                <div class="flex justify-between items-start">
                    <div class="p-2 rounded-xl ${bgColor}">
                        <i data-lucide="${iconName}" class="w-[18px] h-[18px]"></i>
                    </div>
                    <span class="text-xs font-bold text-slate-400">${alert.time}</span>
                </div>
                <h4 class="font-bold text-slate-900 mt-3">${alert.title}</h4>
                <p class="text-sm text-slate-500 mt-1 line-clamp-2">${alert.desc}</p>
            </div>
        `;
        alertsGrid.appendChild(card);
    });
}

function renderKPIs() {
    kpiTable.innerHTML = '';
    kpiData.forEach(row => {
        // Logica de colores
        let varColor = 'text-emerald-600';
        if (row.variacion.startsWith('+') && row.metrica !== 'Conversión Alimenticia') {
            varColor = 'text-emerald-600';
        } else if (row.metrica === 'Conversión Alimenticia' && row.variacion.startsWith('+')) {
            varColor = 'text-rose-600';
        }
        
        const badgeColor = row.estado === 'Óptimo' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap font-bold text-slate-800">${row.metrica}</td>
            <td class="px-6 py-4 whitespace-nowrap font-black text-slate-900">${row.actual}</td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">${row.objetivo}</td>
            <td class="px-6 py-4 whitespace-nowrap font-bold ${varColor}">${row.variacion}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeColor}">
                    ${row.estado}
                </span>
            </td>
        `;
        kpiTable.appendChild(tr);
    });
}

renderAlerts();
renderKPIs();
lucide.createIcons();
