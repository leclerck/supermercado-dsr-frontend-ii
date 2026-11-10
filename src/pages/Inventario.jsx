import { useEffect, useMemo, useState } from 'react'
import { useInventory } from '../context/InventoryContext'

export default function Inventario() {
  const { products, categories } = useInventory()
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')

  useEffect(() => {
    if (categoriaFiltro !== 'Todas' && !categories.includes(categoriaFiltro)) {
      setCategoriaFiltro('Todas')
    }
  }, [categories, categoriaFiltro])

  const productosFiltrados = useMemo(() => {
    if (categoriaFiltro === 'Todas') {
      return products
    }
    return products.filter((product) => product.categoria === categoriaFiltro)
  }, [products, categoriaFiltro])

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Inventario</h1>
        <p className="mt-1 text-slate-600">
          Listado de productos disponibles. Filtra por categoría.
        </p>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-medium text-slate-700" htmlFor="filtro-categoria">
          Categoría
        </label>
        <select
          id="filtro-categoria"
          value={categoriaFiltro}
          onChange={(event) => setCategoriaFiltro(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
        >
          <option value="Todas">Todas</option>
          {categories.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Nombre</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Marca</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Categoría</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {productosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  No hay productos para mostrar.
                </td>
              </tr>
            ) : (
              productosFiltrados.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-900">{product.nombre}</td>
                  <td className="px-4 py-3 text-slate-600">{product.marca}</td>
                  <td className="px-4 py-3 text-slate-600">{product.categoria}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-slate-500">
        Mostrando {productosFiltrados.length} de {products.length} productos.
      </p>
    </section>
  )
}
