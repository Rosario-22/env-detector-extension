# 🚦 env-detector-extension

Extensión de navegador que detecta y resalta el ambiente actual (dev, staging, producción) según la URL. Hecha con vanilla JS.

---

## ¿Qué hace?

Cuando abrís una página, la extensión lee la URL y muestra visualmente en qué ambiente estás:

- Un **badge arrastrable** siempre visible en la página
- El **navbar cambia de color** según el ambiente

| Ambiente | URL contiene | Color |
|---|---|---|
| Testing | `dev.` o `test.` | 🔴 Rojo |
| Staging | `stage.` | 🟡 Amarillo |
| Producción | ninguno | 🟢 Verde |

---

## Capturas

> Badge en staging:

![Badge staging](https://i.imgur.com/placeholder.png)

---

## Instalación

> No requiere npm, compiladores ni configuración. Solo cargar la carpeta en el navegador.

1. Clonar o descargar este repositorio
2. Abrir `chrome://extensions/` (o `opera://extensions/`)
3. Activar **Modo desarrollador**
4. Clic en **"Cargar descomprimida"**
5. Seleccionar la carpeta del proyecto

---

## Actualizar tras cambios

1. Modificar el archivo en el editor
2. Ir a `chrome://extensions/`
3. Clic en el ícono de recarga ↺ en la tarjeta de la extensión
4. Refrescar la página donde estás probando

---

## Estructura

```
env-detector-extension/
├── manifest.json   → Configuración de la extensión
├── popup.html      → UI al hacer clic en el ícono
├── popup.js        → Lógica del popup
└── content.js      → Script inyectado en cada página
```

---

## Personalización

Para agregar o modificar ambientes, editá el objeto `ambientes` en `content.js` y `popup.js`:

```javascript
const ambientes = {
  testing: {
    patron: /dev\.|test\./i,  // URLs que contengan "dev." o "test."
    color: "#ef4444",
    texto: "TESTING"
  },
  staging: {
    patron: /stage\./i,
    color: "#f59e0b",
    texto: "STAGING"
  },
  produccion: {
    patron: null,             // Default si no matchea ningún otro
    color: "#10b981",
    texto: "PRODUCCIÓN"
  }
};
```

---

## Consideraciones técnicas

- Las páginas con **Vue.js** cargan el DOM asincrónicamente. Se usa `setInterval` para esperar a que el navbar esté disponible.
- El navbar puede usar `linear-gradient` como fondo. En ese caso se sobreescribe también `background-image: none`.
- La posición del badge se persiste con `localStorage` (`badge-x`, `badge-y`).

---

## Compatibilidad

Probada en **Opera** y **Chrome** (Manifest V3).

---

## Versionado

Este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/): `MAJOR.MINOR.PATCH`

---

## Autora

Desarrollada por Rosario Lopez — Subsecretaría de Innovación y Transformación Digital, Córdoba.
