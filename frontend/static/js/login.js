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
      const res = await fetch("http://localhost:5002/login", {
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
        window.location.href = "/dashboard";
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
