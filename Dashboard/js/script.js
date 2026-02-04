document.addEventListener('DOMContentLoaded', () => {
    const datos = {
        totalCerdos: 1500,
        variacionTotal: 2.5,
        enCrecimiento: 1200,
        listosVenta: 300
    };

    const totalEl = document.getElementById('stat-total');
    const totalVarEl = document.getElementById('stat-total-var');
    const growthEl = document.getElementById('stat-growth');
    const growthVarEl = document.getElementById('stat-growth-var');
    const readyEl = document.getElementById('stat-ready');
    const readyVarEl = document.getElementById('stat-ready-var');
    const barTotal = document.getElementById('bar-total');
    const barGrowth = document.getElementById('bar-growth');
    const barReady = document.getElementById('bar-ready');

    if (!totalEl || !totalVarEl || !growthEl || !growthVarEl || !readyEl || !readyVarEl) {
        return;
    }

    const total = Math.max(0, datos.totalCerdos);
    const crecimiento = Math.max(0, datos.enCrecimiento);
    const listos = Math.max(0, datos.listosVenta);

    const porcentajeCrecimiento = total > 0 ? Math.round((crecimiento / total) * 100) : 0;
    const porcentajeListos = total > 0 ? Math.round((listos / total) * 100) : 0;

    totalEl.textContent = total;
    totalVarEl.textContent = `${datos.variacionTotal > 0 ? '+' : ''}${datos.variacionTotal}%`;
    growthEl.textContent = crecimiento;
    growthVarEl.textContent = `${porcentajeCrecimiento}% del total`;
    readyEl.textContent = listos;
    readyVarEl.textContent = `${porcentajeListos}% del total`;

    if (barTotal) {
        barTotal.style.setProperty('--fill', '75%');
    }

    if (barGrowth) {
        barGrowth.style.setProperty('--fill', `${porcentajeCrecimiento}%`);
    }

    if (barReady) {
        barReady.style.setProperty('--fill', `${porcentajeListos}%`);
    }
});
