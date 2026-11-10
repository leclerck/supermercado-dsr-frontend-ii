/**
 * Página del carrito (`/carrito`).
 *
 * Permite ver los productos agregados, modificar cantidades (+/− o input)
 * y quitar ítems. Cada cambio sincroniza el stock del inventario vía CartContext.
 */
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Carrito() {
  const { cartLines, totalItems, totalPrice, setCartQuantity, removeFromCart } = useCart()

  /**
   * Actualiza la cantidad desde el input numérico.
   * El máximo permitido es stock disponible + lo que ya está reservado en el carrito.
   */
  const handleChange = (productId, value, stockDisponible, cantidadEnCarrito) => {
    const next = Math.floor(Number(value))
    if (Number.isNaN(next) || next < 0) return
    const maxPermitido = stockDisponible + cantidadEnCarrito
    setCartQuantity(productId, Math.min(next, maxPermitido))
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Carrito</h1>
        <p className="mt-1 text-slate-600">
          Modifica las cantidades. El stock del inventario se actualiza en tiempo real.
        </p>
      </header>

      {cartLines.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center">
          <p className="text-slate-500">Tu carrito está vacío.</p>
          <Link
            to="/inventario"
            className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline"
          >
            Ir al inventario
          </Link>
        </div>
      ) : (
        <>
          {/* Lista de líneas del carrito */}
          <ul className="space-y-3">
            {cartLines.map((line) => (
              <li
                key={line.productId}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">{line.product.nombre}</h2>
                    <p className="text-sm text-slate-600">
                      {line.product.marca} · ${line.product.precio.toLocaleString('es-CL')} c/u
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Stock disponible: {line.product.cantidad}
                    </p>
                  </div>

                  {/* Controles de cantidad: restar, input, sumar y quitar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      aria-label="Disminuir cantidad"
                      onClick={() => setCartQuantity(line.productId, line.cantidad - 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      max={line.product.cantidad + line.cantidad}
                      value={line.cantidad}
                      onChange={(event) =>
                        handleChange(
                          line.productId,
                          event.target.value,
                          line.product.cantidad,
                          line.cantidad,
                        )
                      }
                      className="w-16 rounded-lg border border-slate-300 px-2 py-1.5 text-center text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                    <button
                      type="button"
                      aria-label="Aumentar cantidad"
                      disabled={line.product.cantidad <= 0}
                      onClick={() => setCartQuantity(line.productId, line.cantidad + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.productId)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-slate-800">
                  Subtotal: ${line.subtotal.toLocaleString('es-CL')}
                </p>
              </li>
            ))}
          </ul>

          {/* Resumen del pedido */}
          <div className="rounded-xl border border-slate-200 bg-emerald-50 p-4">
            <p className="text-sm text-emerald-800">
              Unidades: <span className="font-semibold">{totalItems}</span>
            </p>
            <p className="mt-1 text-xl font-bold text-emerald-900">
              Total: ${totalPrice.toLocaleString('es-CL')}
            </p>
          </div>
        </>
      )}
    </section>
  )
}
