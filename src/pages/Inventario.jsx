import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
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
          Productos disponibles. Toca una card para ver el detalle y agregar al carrito.
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

      {productosFiltrados.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-slate-500">
          No hay productos para mostrar.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productosFiltrados.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="text-sm text-slate-500">
        Mostrando {productosFiltrados.length} de {products.length} productos.
      </p>
    </section>
  )
}
