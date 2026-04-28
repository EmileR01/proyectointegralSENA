// Inicialización de Iconos Lucide
lucide.createIcons();

// Estado
let notifEmail = true;
let notifAlerts = true;

let teamData = [
    { id: 1, name: 'Dr. Alejandro Ruiz', role: 'Administrador', lastLogin: 'Hace 5 mins', status: 'Activo' },
    { id: 2, name: 'Dra. María Silva', role: 'Veterinario', lastLogin: 'Hace 2 horas', status: 'Activo' },
    { id: 3, name: 'Carlos Mendoza', role: 'Operario', lastLogin: 'Hace 1 día', status: 'Activo' },
    { id: 4, name: 'Luis Fernando', role: 'Operario', lastLogin: 'Hace 1 mes', status: 'Inactivo' }
];

let editingUserId = null;

// Referencias al DOM
const tablaUsuarios = document.getElementById('tablaUsuarios');
const modal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const modalTitle = document.querySelector('#modalTitle span');
const formName = document.getElementById('formName');
const formRole = document.getElementById('formRole');
const formStatus = document.getElementById('formStatus');

// Renderizar la tabla
function renderTable() {
    tablaUsuarios.innerHTML = '';
    
    teamData.forEach(user => {
        const tr = document.createElement('tr');
        
        // Colores según el rol
        let roleColorClass = 'bg-slate-100 text-slate-700';
        if (user.role === 'Administrador') roleColorClass = 'bg-indigo-100 text-indigo-700';
        else if (user.role === 'Veterinario') roleColorClass = 'bg-emerald-100 text-emerald-700';

        // Colores según el estado
        const statusColorClass = user.status === 'Activo' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';

        // Iniciales
        const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                        ${initials}
                    </div>
                    <span class="font-bold text-slate-800">${user.name}</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${roleColorClass}">
                    ${user.role}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                ${user.lastLogin}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColorClass}">
                    ${user.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button onclick="openModal(${user.id})" class="px-3 py-1.5 text-xs flex items-center gap-1.5 font-bold rounded-lg bg-slate-50 hover:bg-slate-200 text-slate-600 border border-slate-200 shadow-sm transition">
                    <i data-lucide="edit-2" class="w-3.5 h-3.5"></i> Editar
                </button>
            </td>
        `;
        tablaUsuarios.appendChild(tr);
    });

    // Re-renderizar iconos generados dinámicamente
    lucide.createIcons();
}

// Abrir Modal
window.openModal = function(id = null) {
    if (id) {
        editingUserId = id;
        const user = teamData.find(u => u.id === id);
        modalTitle.textContent = 'Editar Usuario';
        formName.value = user.name;
        formRole.value = user.role;
        formStatus.value = user.status;
    } else {
        editingUserId = null;
        modalTitle.textContent = 'Nuevo Usuario';
        formName.value = '';
        formRole.value = 'Operario';
        formStatus.value = 'Activo';
    }
    modal.classList.add('active');
};

// Cerrar Modal
function closeModal() {
    modal.classList.remove('active');
    editingUserId = null;
}

document.getElementById('btnNuevoUsuario').addEventListener('click', () => openModal());
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('cancelModalBtn').addEventListener('click', closeModal);

// Guardar Usuario
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = formName.value;
    const role = formRole.value;
    const status = formStatus.value;

    if (editingUserId) {
        teamData = teamData.map(u => u.id === editingUserId ? { ...u, name, role, status } : u);
    } else {
        teamData.push({
            id: Date.now(),
            name: name || 'Nuevo Usuario',
            role,
            lastLogin: 'Nunca',
            status
        });
    }

    renderTable();
    closeModal();
});

// Toggles de Notificaciones
const btnToggleEmail = document.getElementById('toggleNotifEmail');
const btnToggleAlerts = document.getElementById('toggleNotifAlerts');

function updateToggleVisual(btn, state) {
    const circle = btn.querySelector('.toggle-circle');
    if (state) {
        btn.classList.remove('bg-slate-200');
        btn.classList.add('bg-emerald-500');
        circle.classList.remove('translate-x-1');
        circle.classList.add('translate-x-7');
    } else {
        btn.classList.add('bg-slate-200');
        btn.classList.remove('bg-emerald-500');
        circle.classList.add('translate-x-1');
        circle.classList.remove('translate-x-7');
    }
}

btnToggleEmail.addEventListener('click', () => {
    notifEmail = !notifEmail;
    updateToggleVisual(btnToggleEmail, notifEmail);
});

btnToggleAlerts.addEventListener('click', () => {
    notifAlerts = !notifAlerts;
    updateToggleVisual(btnToggleAlerts, notifAlerts);
});

// Actualizar Contraseña
document.getElementById('btnUpdatePassword').addEventListener('click', () => {
    const currentPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;

    if (!currentPass || !newPass) {
        alert('Por favor completa ambos campos de contraseña.');
        return;
    }

    alert('Credenciales actualizadas exitosamente.');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
});

// Inicializar tabla al cargar
renderTable();
