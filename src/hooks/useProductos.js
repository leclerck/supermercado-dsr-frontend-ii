import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useInventory } from '../context/InventoryContext'
import { validateProductoForm } from '../utils/productoValidators'

const emptyForm = {
  nombre: '',
  marca: '',
  categoria: '',
  precio: '',
  cantidad: '',
}

export function useProductos() {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory()
  const { purgeFromCart } = useCart()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [editingId, setEditingId] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const resetForm = () => {
    setForm(emptyForm)
    setErrors({})
    setEditingId(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateProductoForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const payload = {
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      categoria: form.categoria.trim(),
      precio: Number(form.precio),
      cantidad: Math.floor(Number(form.cantidad)),
    }

    if (editingId !== null) {
      updateProduct({ id: editingId, ...payload })
    } else {
      addProduct(payload)
    }

    resetForm()
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setErrors({})
    setForm({
      nombre: product.nombre,
      marca: product.marca,
      categoria: product.categoria,
      precio: String(product.precio),
      cantidad: String(product.cantidad),
    })
  }

  const handleDelete = (id) => {
    if (editingId === id) {
      resetForm()
    }
    purgeFromCart(id)
    deleteProduct(id)
  }

  return {
    products,
    form,
    errors,
    editingId,
    handleChange,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
  }
}
