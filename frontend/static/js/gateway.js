/*const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

const SERVICES = isLocalhost
  ? {
      frontend: "http://127.0.0.1:5000",
      users:    "http://127.0.0.1:5001",
      auth:     "http://127.0.0.1:5002",
      dashboard:"http://127.0.0.1:5003"
    }
  : {
      frontend: "https://atale.comercial.cloud",
      users:    "https://atale.comercial.cloud/users",
      auth:     "https://atale.comercial.cloud/auth",
      dashboard:"https://atale.comercial.cloud/dashboard"
    };

async function apiRequest(service, endpoint, options = {}) {
  const res = await fetch(`${SERVICES[service]}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    credentials: "include",
    ...options
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }

  return await res.json();
}

const Gateway = {
  Auth: {
    login: (username, password) =>
      apiRequest("auth", "/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      }),

    register: (username, password, email) =>
      apiRequest("users", "/api/register", {
        method: "POST",
        body: JSON.stringify({ username, password, email })
      })
  },
  Users: {
    getProfile: (userId) =>
      apiRequest("users", `/api/users/${userId}`, { method: "GET" })
  },
  Dashboard: {
    getData: () =>
      apiRequest("dashboard", "/api/data", { method: "GET" })
  }
};

const Redirect = {
  toLogin: () => (window.location.href = "/login"),
  toRegister: () => (window.location.href = "/register"),
  toDashboard: () => (window.location.href = "/dashboard"),
  toIndex: () => (window.location.href = "/index")
};

export { Gateway, Redirect };
*/
const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

const SERVICES = isLocalhost
  ? {
      frontend: "http://127.0.0.1:5000",    // HTML servido por backend-index
      users:    "http://127.0.0.1:5001",    // Registro / Perfil
      auth:     "http://127.0.0.1:5002",    // Login
      dashboard:"http://127.0.0.1:5003"     // Dashboard
    }
  : {
      frontend: "https://atale.comercial.cloud",
      users:    "https://atale.comercial.cloud/users",
      auth:     "https://atale.comercial.cloud/auth",
      dashboard:"https://atale.comercial.cloud/dashboard"
    };

// Función genérica para llamar a APIs
async function apiRequest(service, endpoint, options = {}) {
  const res = await fetch(`${SERVICES[service]}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include",
    ...options
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return await res.json();
}

// Objeto Gateway
const Gateway = {
  Auth: {
    login: async (username, password) => {
      const result = await apiRequest("auth", "/api/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      });
      return result;
    },

    register: async (username, password) => {
      const result = await apiRequest("users", "/api/register", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username, password })
      });
      return result;
    }
  },

  Users: {
    getProfile: (userId) => apiRequest("users", `/api/users/${userId}`, { method: "GET" })
  },

  Dashboard: {
    getData: () => apiRequest("dashboard", "/api/data", { method: "GET" })
  }
};

// Redirecciones usando SPA (sin recargar la página)
import { loadPage } from './router.js'; // <-- NUEVO: importamos loadPage desde router.js

const Redirect = {
  toLogin: () => loadPage('/login'),       // <-- reemplaza window.location.href
  toRegister: () => loadPage('/register'),
  toDashboard: () => loadPage('/dashboard'),
  toIndex: () => loadPage('/')
};

export { Gateway, Redirect };
