const inputBaseClass =
  'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2'
const inputOkClass =
  'border-slate-300 focus:border-emerald-500 focus:ring-emerald-200'
const inputErrorClass =
  'border-red-400 focus:border-red-500 focus:ring-red-200'

function Field({ id, label, error, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ProductoForm({
  form,
  errors = {},
  editingId,
  onChange,
  onSubmit,
  onCancel,
}) {
  const inputClass = (field) =>
    `${inputBaseClass} ${errors[field] ? inputErrorClass : inputOkClass}`

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
      noValidate
    >
      <h2 className="text-lg font-semibold text-slate-900">
        {editingId !== null ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field id="nombre" label="Nombre" error={errors.nombre}>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            className={inputClass('nombre')}
            placeholder="Ej. Leche de Soya 1L"
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          />
        </Field>

        <Field id="marca" label="Marca" error={errors.marca}>
          <input
            id="marca"
            name="marca"
            value={form.marca}
            onChange={onChange}
            className={inputClass('marca')}
            placeholder="Ej. Orasí"
            aria-invalid={Boolean(errors.marca)}
            aria-describedby={errors.marca ? 'marca-error' : undefined}
          />
        </Field>

        <Field id="categoria" label="Categoría" error={errors.categoria}>
          <input
            id="categoria"
            name="categoria"
            value={form.categoria}
            onChange={onChange}
            className={inputClass('categoria')}
            placeholder="Ej. Lácteos"
            aria-invalid={Boolean(errors.categoria)}
            aria-describedby={errors.categoria ? 'categoria-error' : undefined}
          />
        </Field>

        <Field id="precio" label="Precio" error={errors.precio}>
          <input
            id="precio"
            name="precio"
            type="text"
            inputMode="numeric"
            value={form.precio}
            onChange={onChange}
            className={inputClass('precio')}
            placeholder="Ej. 1890"
            aria-invalid={Boolean(errors.precio)}
            aria-describedby={errors.precio ? 'precio-error' : undefined}
          />
        </Field>

        <Field id="cantidad" label="Cantidad" error={errors.cantidad}>
          <input
            id="cantidad"
            name="cantidad"
            type="text"
            inputMode="numeric"
            value={form.cantidad}
            onChange={onChange}
            className={inputClass('cantidad')}
            placeholder="Ej. 40"
            aria-invalid={Boolean(errors.cantidad)}
            aria-describedby={errors.cantidad ? 'cantidad-error' : undefined}
          />
        </Field>
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
