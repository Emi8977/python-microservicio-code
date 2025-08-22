/*
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
*/
/*
import { Gateway, Redirect } from "./gateway.js";


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value.trim();

        if (!username || !password) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const res = await Gateway.Auth.register(username, password);
            alert(res.message || "Usuario registrado exitosamente");
            Redirect.toLogin();
        } catch (err) {
            alert(err.message || "Error al registrar usuario");
        }
    });
});
*/
import { Gateway, Redirect } from "./gateway.js";

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = registerForm.username.value.trim();
            const password = registerForm.password.value.trim();

            if (!username || !password) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            try {
                // Usamos el Gateway para registrar al usuario
                const data = await Gateway.Auth.register(username, password);

                // Registro exitoso
                alert(data.message || 'Usuario registrado exitosamente');
                Redirect.toLogin(); // Redirige a login
            } catch (err) {
                console.error(err);
                alert(err.message || 'Error inesperado al registrar');
            }
        });
    }
});


