import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 px-6 py-10 text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-emerald-100">
          Supermercado DSR
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
          Gestión de inventario
        </h1>
        <p className="mt-3 max-w-xl text-emerald-50">
          Consulta el stock, administra productos y conoce más sobre nuestras
          sucursales desde esta aplicación.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/inventario"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-slate-900">Ver inventario</h2>
          <p className="mt-1 text-sm text-slate-600">
            Listado de productos con filtro por categoría.
          </p>
        </Link>
        <Link
          to="/productos"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-slate-900">Gestionar productos</h2>
          <p className="mt-1 text-sm text-slate-600">
            Creación, edición y eliminación de productos del inventario.
          </p>
        </Link>
      </div>
    </section>
  )
}
