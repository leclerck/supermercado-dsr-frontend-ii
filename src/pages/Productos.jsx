import { useState } from 'react'
import { useInventory } from '../context/InventoryContext'

const emptyForm = {
  nombre: '',
  marca: '',
  categoria: '',
}

export default function Productos() {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nombre = form.nombre.trim()
    const marca = form.marca.trim()
    const categoria = form.categoria.trim()

    if (!nombre || !marca || !categoria) {
      return
    }

    if (editingId !== null) {
      updateProduct({ id: editingId, nombre, marca, categoria })
    } else {
      addProduct({ nombre, marca, categoria })
    }

    resetForm()
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setForm({
      nombre: product.nombre,
      marca: product.marca,
      categoria: product.categoria,
    })
  }

  const handleDelete = (id) => {
    if (editingId === id) {
      resetForm()
    }
    deleteProduct(id)
  }

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de productos</h1>
        <p className="mt-1 text-slate-600">
          Crea, edita o elimina productos del inventario (sin backend).
        </p>  
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-900">
          {editingId !== null ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej. Leche de Soya 1L"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="marca">
              Marca
            </label>
            <input
              id="marca"
              name="marca"
              value={form.marca}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej. Orasí"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="categoria">
              Categoría
            </label>
            <input
              id="categoria"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej. Lácteos"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            {editingId !== null ? 'Guardar cambios' : 'Agregar producto'}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Nombre</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Marca</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Categoría</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No hay productos. Agregá el primero con el formulario.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-900">{product.nombre}</td>
                  <td className="px-4 py-3 text-slate-600">{product.marca}</td>
                  <td className="px-4 py-3 text-slate-600">{product.categoria}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-md border border-red-200 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
