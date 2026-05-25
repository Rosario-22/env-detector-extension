// Los 3 ambientes con sus colores de semáforo
const ambientes = {
  testing: {
    patron: /dev\.|test\./i,
    color: "#ef4444",
    razon: 'La URL contiene "dev." o "test." → Testing'
  },
  staging: {
    patron: /stage\./i,
    color: "#f59e0b",
    razon: 'La URL contiene "stage." → Staging'
  },
  produccion: {
    patron: null,
    color: "#10b981",
    razon: 'No se encontró "dev." ni "stage." → Producción'
  }
};

// Detecta el ambiente según la URL
function detectarAmbiente(url) {
  for (const [nombre, config] of Object.entries(ambientes)) {
    if (config.patron && config.patron.test(url)) {
      return { nombre, ...config };
    }
  }
  return { nombre: "produccion", ...ambientes.produccion };
}

// Pinta el popup con el resultado
function actualizarUI(ambiente, url) {
  document.getElementById("franja").style.background = ambiente.color;
  document.getElementById("icono").textContent = ambiente.icono;
  document.getElementById("ambiente").textContent = ambiente.nombre.toUpperCase();
  document.getElementById("ambiente").style.color = ambiente.color;
  document.getElementById("url").textContent = url.length > 50 ? url.substring(0, 50) + "..." : url;
  document.getElementById("razon").textContent = ambiente.razon;
  document.getElementById("razon").style.borderColor = ambiente.color;
}

// Punto de entrada: lee la pestaña activa y arranca
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const url = tabs[0].url;

  if (!url || url.startsWith("chrome://")) {
    document.getElementById("icono").textContent = "🔒";
    document.getElementById("ambiente").textContent = "PÁGINA INTERNA";
    document.getElementById("razon").textContent = "No aplica la detección.";
    return;
  }

  const ambiente = detectarAmbiente(url);
  actualizarUI(ambiente, url);
});