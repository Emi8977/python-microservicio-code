// router.js
console.log("✅ Router cargado");

const appContainer = document.getElementById("app");

// Mapa de rutas → archivos HTML de tu frontend
const routes = {
  "/": "/templates/index.html",
  "/login": "/templates/login.html",
  "/register": "/templates/register.html",
  "/dashboard": "/templates/dashboard.html"
};

// Función que carga y renderiza una página dentro de #app
async function renderPage(path) {
  try {
    const file = routes[path] || routes["/"];
    const res = await fetch(file);
    if (!res.ok) throw new Error(`No se pudo cargar ${file}`);

    const html = await res.text();
    appContainer.innerHTML = html;

    // Reinyectar lógica JS de cada vista (si la tuvieras separada)
    if (path === "/login") import("/static/js/login.js").catch(() => {});
    if (path === "/register") import("/static/js/register.js").catch(() => {});
    if (path === "/dashboard") import("/static/js/dashboard.js").catch(() => {});

  } catch (err) {
    console.error("❌ Error en renderPage:", err);
    appContainer.innerHTML = `
      <h2>Error cargando la página</h2>
      <p>${err.message}</p>
    `;
  }
}

// Intercepta clicks en todos los <a href="/...">
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (href && href.startsWith("/")) {
    e.preventDefault();
    window.history.pushState({}, "", href);
    renderPage(href);
  }
});

// Maneja botón atrás/adelante del navegador
window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

// Inicializa la página actual cuando carga el sitio
renderPage(window.location.pathname);
