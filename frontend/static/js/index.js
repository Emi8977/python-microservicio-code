// Definimos la URL del backend según el entorno
const backendUrl = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost"
  ? "http://127.0.0.1:5000/api"        // Desarrollo local
  : "https://atale.comercial.cloud/api"; // Producción en Kubernetes

// Hacemos el fetch
fetch(backendUrl)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    document.getElementById("respuesta").innerText =
      `Respuesta del backend: ${data.message}`;
  })
  .catch(err => {
    document.getElementById("respuesta").innerText = "Error al conectar con backend";
    console.error(err);
  });

