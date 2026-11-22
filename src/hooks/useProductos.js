import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useInventory } from '../context/InventoryContext'

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
    const precio = Number(form.precio)
    const cantidad = Number(form.cantidad)

    if (!nombre || !marca || !categoria) {
      return
    }
    if (Number.isNaN(precio) || precio < 0 || Number.isNaN(cantidad) || cantidad < 0) {
      return
    }

    const payload = {
      nombre,
      marca,
      categoria,
      precio,
      cantidad: Math.floor(cantidad),
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
    editingId,
    handleChange,
    handleSubmit,
    resetForm,
    handleEdit,
    handleDelete,
  }
}
