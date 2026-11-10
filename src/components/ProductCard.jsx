/**
 * Card de producto para la grilla del inventario.
 *
 * Al hacer clic navega al detalle (`/producto/:id`),
 * donde se puede agregar el producto al carrito.
 *
 * @param {{ product: { id: number, nombre: string, marca: string, categoria: string, precio: number, cantidad: number } }} props
 */
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const sinStock = product.cantidad <= 0

  return (
    <Link
      to={`/producto/${product.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900">{product.nombre}</h2>
        {sinStock && (
          <span className="shrink-0 rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
            Sin stock
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-600">{product.marca}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
        {product.categoria}
      </p>
      <div className="mt-4 flex items-end justify-between gap-2">
        <p className="text-lg font-bold text-slate-900">
          ${product.precio.toLocaleString('es-CL')}
        </p>
        <p className="text-sm text-slate-500">
          Disp: <span className="font-medium text-slate-700">{product.cantidad}</span>
        </p>
      </div>
    </Link>
  )
}
