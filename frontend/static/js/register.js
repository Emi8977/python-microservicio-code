document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Evita el envío clásico

            const username = registerForm.username.value.trim();
            const password = registerForm.password.value.trim();

            // Validaciones básicas
            if (!username || !password) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            if (password.length < 4) {
                alert('La contraseña debe tener al menos 4 caracteres.');
                return;
            }

            try {
                const response = await fetch('/api/register', { //cambiamos /localhost por /api
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                // Manejo de respuestas
                const contentType = response.headers.get('content-type');
                const isJson = contentType && contentType.includes('application/json');

                if (response.ok) {
                    const data = isJson ? await response.json() : {};
                    alert(data.message || 'Registro exitoso');
                    window.location.href = '/api/login'; // Redirige a login
                } else {
                    const errorData = isJson ? await response.json() : { message: await response.text() };
                    alert(errorData.message || 'Error al registrar');
                }

            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('Error inesperado al registrar');
            }
        });
    }
});
