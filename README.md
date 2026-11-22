# Supermercado — Gestión de Inventario

Aplicación web básica de gestión de inventario y carrito para un supermercado, construida con **React**, **Vite**, **React Router** y **Tailwind CSS**. La interfaz está en español y los datos se manejan en memoria con estado global (sin backend).

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

## Deploy en GitHub Pages

El proyecto usa `base: '/supermercado-dsr-frontend-ii/'` en Vite y `basename` en React Router.

1. En el repo de GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Hacé push a `main` (o ejecutá el workflow manualmente). El workflow `.github/workflows/deploy-pages.yml` corre `npm ci`, `npm run build` y publica la carpeta `dist` (no hace falta versionarla).
3. El sitio queda en `https://leclerck.github.io/supermercado-dsr-frontend-ii/`.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/inventario` | Cards de productos con filtro por categoría y stock disponible |
| `/producto/:id` | Detalle del producto y botón para agregar al carrito |
| `/productos` | CRUD de productos (formulario + tabla) |
| `/carrito` | Lista del carrito; permite modificar cantidades |
| `/nosotres` | Sucursales y datos de contacto |
| `/faq` | Preguntas frecuentes |

La navegación principal usa el menú inferior fijo. El ícono flotante del carrito abre `/carrito` y muestra la cantidad de unidades.

## Modelo de producto

Cada producto tiene:

- `id` — identificador numérico
- `nombre` — nombre del producto
- `marca` — marca
- `categoria` — categoría (por ejemplo Lácteos, Bebidas, Abarrotes)
- `precio` — precio unitario
- `cantidad` — stock disponible en inventario

## CRUD de productos

La página `/productos` separa UI y lógica:

| Archivo | Rol |
|---------|-----|
| `src/pages/Productos.jsx` | Página que compone formulario y tabla |
| `src/hooks/useProductos.js` | Estado del formulario, validación y handlers CRUD |
| `src/components/ProductoForm.jsx` | Formulario de alta / edición |
| `src/components/ProductosTable.jsx` | Tabla de productos con acciones Editar / Eliminar |

### API de `useProductos()`

| Valor / método | Descripción |
|----------------|-------------|
| `products` | Lista de productos del inventario |
| `form` | Campos del formulario (`nombre`, `marca`, `categoria`, `precio`, `cantidad`) |
| `editingId` | `id` en edición, o `null` si es alta |
| `handleChange` | Actualiza un campo del formulario |
| `handleSubmit` | Valida y crea o actualiza el producto |
| `resetForm` | Limpia el formulario y sale del modo edición |
| `handleEdit` | Carga un producto en el formulario |
| `handleDelete` | Elimina el producto y lo limpia del carrito |

## Carrito y stock

- Al **agregar al carrito**, se resta la cantidad del stock del inventario.
- Al **aumentar** la cantidad en el carrito, se resta más stock (sin superar lo disponible).
- Al **disminuir** o **quitar** un ítem, el stock vuelve al inventario.
- Si se **elimina** un producto desde el CRUD, también se limpia del carrito (sin restaurar stock).

### Componentes del carrito

| Archivo | Rol |
|---------|-----|
| `src/context/CartContext.jsx` | Estado global del carrito y sincronización con el stock |
| `src/components/CartFab.jsx` | Botón flotante con badge de unidades; abre `/carrito` |
| `src/pages/Carrito.jsx` | Lista editable del carrito (cantidad, quitar, totales) |
| `src/pages/ProductoDetalle.jsx` | Detalle + “Agregar al carrito” |
| `src/components/ProductCard.jsx` | Card clickeable en el inventario |

### API de `useCart()`

| Valor / método | Descripción |
|----------------|-------------|
| `items` | Ítems crudos `{ productId, cantidad }` |
| `cartLines` | Ítems unidos al producto + `subtotal` |
| `totalItems` | Suma de unidades (badge del FAB) |
| `totalPrice` | Total a pagar |
| `addToCart(id, qty)` | Agrega unidades y resta stock |
| `setCartQuantity(id, qty)` | Define cantidad exacta y ajusta stock |
| `removeFromCart(id)` | Quita el ítem y restaura stock |
| `purgeFromCart(id)` | Quita el ítem sin restaurar stock |
| `getCartQuantity(id)` | Unidades actuales de un producto en el carrito |

## Estado global

- Inventario: `InventoryContext` (`src/context/InventoryContext.jsx`) con `useReducer`.
- Carrito: `CartContext` (`src/context/CartContext.jsx`), anidado dentro del provider de inventario.

Los cambios no se persisten: al recargar la página se restauran los datos iniciales de ejemplo.

## Estructura del proyecto

```
src/
  components/BottomNav.jsx
  components/CartFab.jsx
  components/ProductCard.jsx
  components/ProductoForm.jsx
  components/ProductosTable.jsx
  context/InventoryContext.jsx
  context/CartContext.jsx
  hooks/useProductos.js
  pages/Home.jsx
  pages/Inventario.jsx
  pages/ProductoDetalle.jsx
  pages/Productos.jsx
  pages/Carrito.jsx
  pages/Nosotres.jsx
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
