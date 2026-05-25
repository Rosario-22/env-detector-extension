const ambientes = {
  testing: {
    patron: /dev\./i,
    color: "#ef4444",
    texto: "TESTING"
  },
  staging: {
    patron: /stage\./i,
    color: "#f59e0b",
    texto: "STAGING"
  },
  produccion: {
    patron: null,
    color: "#10b981",
    texto: "PRODUCCIÓN"
  }
};

function detectarAmbiente(url) {
  for (const [nombre, config] of Object.entries(ambientes)) {
    if (config.patron && config.patron.test(url)) {
      return config;
    }
  }
  return ambientes.produccion;
}

function mostrarBadge(ambiente) {
  const badge = document.createElement("div");
  badge.textContent = ambiente.texto;

  badge.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    right: 20px;
    background: ${ambiente.color};
    color: white;
    font-family: 'Segoe UI', sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 20px;
    z-index: 99999;
    letter-spacing: 1px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    cursor: grab;
    user-select: none;
  `;
    

  let agarrandoX = 0;
  let agarrandoY = 0;

  badge.addEventListener("mousedown", (e) => {
    agarrandoX = e.clientX - badge.getBoundingClientRect().left;
    agarrandoY = e.clientY - badge.getBoundingClientRect().top;
    badge.style.cursor = "grabbing";
    document.addEventListener("mousemove", mover);
    document.addEventListener("mouseup", soltar);
  });

  function mover(e) {
    const nuevoX = e.clientX - agarrandoX;
    const nuevoY = e.clientY - agarrandoY;
    badge.style.right = "auto";
    badge.style.left = nuevoX + "px";
    badge.style.top  = nuevoY + "px";
  }

  function soltar() {
    badge.style.cursor = "grab";
    // Guarda la posición al soltar
    localStorage.setItem("badge-x", badge.style.left);
    localStorage.setItem("badge-y", badge.style.top);
    document.removeEventListener("mousemove", mover);
    document.removeEventListener("mouseup", soltar);
  }

  // Recupera la posición guardada si existe
  const guardadoX = localStorage.getItem("badge-x");
  const guardadoY = localStorage.getItem("badge-y");
  if (guardadoX && guardadoY) {
    badge.style.right = "auto";
    badge.style.left = guardadoX;
    badge.style.top  = guardadoY;
  }

  document.body.appendChild(badge);
}

function cambiarColorHeader(ambiente) {
  const intervalo = setInterval(() => {
    const navbar = document.querySelector(".q-header");
    if (navbar) {
      clearInterval(intervalo);

      const estilo = document.createElement("style");
      estilo.textContent = `
        .q-header { 
          background-color: ${ambiente.color} !important;
          background-image: none !important;
        }
      `;
      document.head.appendChild(estilo);
    }
  }, 300);
}
const ambiente = detectarAmbiente(window.location.href);
mostrarBadge(ambiente);
cambiarColorHeader(ambiente);