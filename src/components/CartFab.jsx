/**
 * Botón flotante (FAB) del carrito.
 *
 * Se fija sobre el menú inferior y muestra un badge con el total de unidades.
 * Se oculta en la ruta `/carrito` para no tapar la página del carrito.
 */
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartFab() {
  const { totalItems } = useCart()
  const location = useLocation()

  // No mostrar el FAB cuando ya estamos en la vista del carrito.
  if (location.pathname === '/carrito') {
    return null
  }

  return (
    <Link
      to="/carrito"
      aria-label="Abrir carrito"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700 sm:bottom-24"
    >
      {/* Ícono SVG simple de carrito de compras */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 7h14m-9-3a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>

      {/* Badge con cantidad total de unidades */}
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}
