/**
 * Página de detalle de un producto (`/producto/:id`).
 *
 * Muestra precio y stock disponible, y permite elegir una cantidad
 * para agregarla al carrito (restando stock del inventario).
 */
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useInventory } from '../context/InventoryContext'

export default function ProductoDetalle() {
  const { id } = useParams()
  const { getProductById } = useInventory()
  const { addToCart } = useCart()
  const product = getProductById(id)

  // Cantidad que el usuario quiere agregar y mensaje de feedback.
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState(null)

  if (!product) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Producto no encontrado</h1>
        <Link to="/inventario" className="text-emerald-700 underline">
          Volver al inventario
        </Link>
      </section>
    )
  }

  const sinStock = product.cantidad <= 0
  const maxCantidad = Math.max(product.cantidad, 1)

  /** Intenta agregar al carrito y muestra un mensaje de éxito o error. */
  const handleAdd = () => {
    const result = addToCart(product.id, cantidad)
    if (result.ok) {
      setMensaje({ tipo: 'ok', texto: 'Producto agregado al carrito.' })
      setCantidad(1)
    } else {
      setMensaje({ tipo: 'error', texto: result.message })
    }
  }

  return (
    <section className="space-y-6">
      <Link to="/inventario" className="text-sm font-medium text-emerald-700 hover:underline">
        ← Volver al inventario
      </Link>

      <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
          {product.categoria}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{product.nombre}</h1>
        <p className="mt-2 text-slate-600">Marca: {product.marca}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Precio</p>
            <p className="text-2xl font-bold text-slate-900">
              ${product.precio.toLocaleString('es-CL')}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Disponibles</p>
            <p className="text-2xl font-bold text-slate-900">{product.cantidad}</p>
          </div>
        </div>

        {/* Selector de cantidad + acción de agregar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="cantidad-add">
              Cantidad a agregar
            </label>
            <input
              id="cantidad-add"
              type="number"
              min="1"
              max={maxCantidad}
              value={cantidad}
              disabled={sinStock}
              onChange={(event) => {
                const value = Number(event.target.value)
                if (Number.isNaN(value)) {
                  setCantidad(1)
                  return
                }
                // Limita la cantidad al stock disponible.
                setCantidad(Math.min(Math.max(1, Math.floor(value)), product.cantidad || 1))
              }}
              className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:bg-slate-100"
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={sinStock}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Agregar al carrito
          </button>
        </div>

        {mensaje && (
          <p
            className={`mt-4 text-sm ${
              mensaje.tipo === 'ok' ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {mensaje.texto}
          </p>
        )}
      </article>
    </section>
  )
}
