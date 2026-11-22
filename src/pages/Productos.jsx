import ProductoForm from '../components/ProductoForm'
import ProductosTable from '../components/ProductosTable'
import { useProductos } from '../hooks/useProductos'

export default function Productos() {
  const {
    products,
    form,
    editingId,
    handleChange,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
  } = useProductos()

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de productos</h1>
        <p className="mt-1 text-slate-600">
          Crea, edita o elimina productos del inventario (sin backend).
        </p>
      </header>

      <ProductoForm
        form={form}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <ProductosTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  )
}
