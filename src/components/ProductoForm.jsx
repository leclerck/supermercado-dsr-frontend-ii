export default function ProductoForm({
  form,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {editingId !== null ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Ej. Lácteos"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="precio">
            Precio
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="1"
            value={form.precio}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Ej. 1890"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="cantidad">
            Cantidad
          </label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            min="0"
            step="1"
            value={form.cantidad}
            onChange={onChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            placeholder="Ej. 40"
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
            onClick={onCancel}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
