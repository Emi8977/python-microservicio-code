// Contenedor donde se renderizarán las páginas
console.log("router cargado ✅");
const appContainer = document.getElementById("app");

// Mapea rutas a endpoints de tu backend-index
const routes = {
  "/": "/",
  "/login": "/login",
  "/register": "/register",
  "/dashboard": "/dashboard"
};

// Función que carga y renderiza una página
async function renderPage(path) {
  try {
    const endpoint = routes[path] || "/";
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`No se pudo cargar ${path}`);
    const html = await res.text();
    appContainer.innerHTML = html;

    // Aquí podés volver a inicializar tu JS de la página
    if (path === "/login") import("/static/js/login.js");
    if (path === "/register") import("/static/js/register.js");
    if (path === "/dashboard") import("/static/js/dashboard.js");
  } catch (err) {
    appContainer.innerHTML = `<h2>Error cargando la página</h2><p>${err.message}</p>`;
  }
}

// Captura clicks en todos los enlaces internos
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

// Soporte para botón “atrás” / “adelante”
window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});

// Inicializa la página al cargar
renderPage(window.location.pathname);
