// Inicialización de Iconos Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular proceso de autenticación rápido
    const btnSubmit = loginForm.querySelector('button[type="submit"]');
    const originalText = btnSubmit.textContent;
    btnSubmit.textContent = 'Autenticando...';
    btnSubmit.disabled = true;

    setTimeout(() => {
        // Redirigir al dashboard después de un momento
        window.location.href = '../dashboard/index.html';
    }, 600);
});
