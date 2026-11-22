export default function ProductosTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Nombre</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Marca</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Categoría</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Precio</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Cantidad</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                No hay productos. Agregá el primero con el formulario.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-900">{product.nombre}</td>
                <td className="px-4 py-3 text-slate-600">{product.marca}</td>
                <td className="px-4 py-3 text-slate-600">{product.categoria}</td>
                <td className="px-4 py-3 text-slate-600">
                  ${product.precio.toLocaleString('es-CL')}
                </td>
                <td className="px-4 py-3 text-slate-600">{product.cantidad}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product.id)}
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
  )
}
