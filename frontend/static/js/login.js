/* const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const API_BASE_URL = isLocalhost
  ? 'http://127.0.0.1:5002'
  : 'https://atale.comercial.cloud';


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const payload = {
      username: formData.get("username"),
      password: formData.get("password")
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        msg.style.color = "green";
        msg.innerText = "Login exitoso";
        alert("Login exitoso");

        // Redirigir al dashboard
        if (window.location.hostname === 'localhost') {
          window.location.href = `${window.location.origin}/dashboard`;
        } else {
          window.location.href = `${window.location.origin}/dashboard`;
        }
      } else {
        const errorData = await res.json();
        msg.style.color = "red";
        msg.innerText = errorData.message || "Error en login";
        alert("Error en login");
      }
    } catch (error) {
      msg.style.color = "red";
      msg.innerText = "Error de conexión al servidor";
      console.error(error);
    }
  });
});

*/
/*
import { Gateway } from "./gateway.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    try {
      // Llamada a la API de login
      const result = await Gateway.Auth.login(username, password);

      // Mostrar mensaje de éxito
      msg.style.color = "green";
      msg.innerText = "Login exitoso";

      // Redirigir a dashboard.html (archivo físico)
      window.location.href = "/dashboard.html";

    } catch (err) {
      // Mostrar mensaje de error
      msg.style.color = "red";
      msg.innerText = err.message;
    }
  });
});
*/
import { Gateway } from "./gateway.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;

    try {
      // 🔹 Llamada a la API de login usando Gateway corregido
      const result = await Gateway.Auth.login(username, password);

      // Mostrar mensaje de éxito
      msg.style.color = "green";
      msg.innerText = "Login exitoso";

      // 🔹 Redirige a dashboard.html (archivo físico)
      window.location.href = "/dashboard.html";

    } catch (err) {
      // Mostrar mensaje de error
      msg.style.color = "red";
      msg.innerText = err.message;
    }
  });
});


