const ambientes = {
  testing: {
    patron: /dev\.|test\./i,
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

function inyectarEnNavbar(ambiente) {
  const intervalo = setInterval(() => {
    const navbar = document.querySelector(".q-header");
    if (navbar) {
      clearInterval(intervalo);

      // Cambiamos el color del navbar
      const estilo = document.createElement("style");
      estilo.textContent = `
        .q-header {
          background-color: ${ambiente.color} !important;
          background-image: none !important;
        }
      `;
      document.head.appendChild(estilo);

      // Creamos el badge y lo metemos DENTRO del navbar
      const badge = document.createElement("div");
      badge.textContent = ambiente.texto;
      badge.style.cssText = `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.2);
        color: white;
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        font-weight: 700;
        padding: 6px 12px;
        border-radius: 20px;
        letter-spacing: 1px;
        top: 50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
      `;

      // El navbar necesita position relative para que el absolute funcione
      navbar.style.position = "relative";
      navbar.appendChild(badge);
    }
  }, 300);
}

const ambiente = detectarAmbiente(window.location.href);
inyectarEnNavbar(ambiente);