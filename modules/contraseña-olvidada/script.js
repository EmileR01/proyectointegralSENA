// Inicialización de Iconos Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

const forgotPasswordForm = document.getElementById('forgotPasswordForm');

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulación de envío de correo
    const emailInput = document.getElementById('email').value;
    
    if (emailInput) {
        alert("Se han enviado las instrucciones de recuperación a tu correo electrónico (Simulación).");
        // Redirigir al login
        window.location.href = '../inicio_sesion/index.html';
    }
});
