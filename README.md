# Supermercado — Gestión de Inventario

Aplicación web básica de gestión de inventario para un supermercado, construida con **React**, **Vite**, **React Router** y **Tailwind CSS**. La interfaz está en español y el inventario se maneja en memoria con estado global (sin backend).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrí la URL que muestra Vite (por defecto `http://localhost:5173`).

## Build de producción

```bash
npm run build
npm run preview
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/inventario` | Tabla de productos con filtro dinámico por categoría |
| `/productos` | Formulario CRUD de productos |
| `/nosotros` | Sucursales y datos de contacto |
| `/faq` | Preguntas frecuentes |

La navegación se realiza con el menú inferior fijo.

## Modelo de producto

Cada producto tiene:

- `id` — identificador numérico
- `nombre` — nombre del producto
- `marca` — marca
- `categoria` — categoría (por ejemplo Lácteos, Bebidas, Abarrotes)

## Estado global

El inventario vive en `InventoryContext` (`src/context/InventoryContext.jsx`) con `useReducer`. Las páginas de Inventario y Productos usan el hook `useInventory` para leer y modificar los datos. Los cambios no se persisten: al recargar la página se restauran los datos iniciales de ejemplo.

## Estructura del proyecto

```
src/
  components/BottomNav.jsx   # Menú inferior de navegación
  context/InventoryContext.jsx
  pages/Home.jsx
  pages/Inventario.jsx
  pages/Productos.jsx
  pages/Nosotros.jsx
  pages/Faq.jsx
  App.jsx
  main.jsx
  index.css
```

## Scripts disponibles

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | Ejecutar el linter |
