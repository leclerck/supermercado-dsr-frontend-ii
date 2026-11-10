/**
 * Contexto global del carrito de compras.
 *
 * Cada ítem del carrito guarda solo `{ productId, cantidad }`.
 * Los datos del producto (nombre, precio, stock) se leen desde InventoryContext.
 *
 * Regla de stock en espejo:
 * - Al agregar o aumentar unidades → se resta stock del inventario.
 * - Al disminuir o quitar → se devuelve stock al inventario.
 * - `purgeFromCart` solo limpia el carrito (sin devolver stock), útil al borrar un producto.
 */
import { createContext, useContext, useMemo, useReducer } from 'react'
import { useInventory } from './InventoryContext'

const CartContext = createContext(null)

/**
 * Reducer del carrito.
 * - SET_ITEM: crea, actualiza o elimina un ítem según la cantidad (0 = eliminar).
 * - PURGE: elimina un ítem sin tocar el inventario.
 */
function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEM': {
      const { productId, cantidad } = action.payload
      if (cantidad <= 0) {
        return {
          items: state.items.filter((item) => item.productId !== productId),
        }
      }
      const exists = state.items.some((item) => item.productId === productId)
      if (exists) {
        return {
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, cantidad } : item,
          ),
        }
      }
      return {
        items: [...state.items, { productId, cantidad }],
      }
    }
    case 'PURGE':
      return {
        items: state.items.filter((item) => item.productId !== action.payload),
      }
    default:
      return state
  }
}

/**
 * Provider del carrito. Debe envolverse dentro de `InventoryProvider`
 * porque usa `adjustStock` y `getProductById`.
 */
export function CartProvider({ children }) {
  const { products, adjustStock, getProductById } = useInventory()
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  /** Devuelve cuántas unidades de un producto hay en el carrito. */
  const getCartQuantity = (productId) => {
    const item = state.items.find((entry) => entry.productId === productId)
    return item ? item.cantidad : 0
  }

  /**
   * Agrega unidades de un producto al carrito y resta stock.
   * @returns {{ ok: boolean, message?: string }}
   */
  const addToCart = (productId, qty = 1) => {
    const amount = Math.floor(Number(qty))
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, message: 'Cantidad inválida' }
    }

    const product = getProductById(productId)
    if (!product) {
      return { ok: false, message: 'Producto no encontrado' }
    }
    if (product.cantidad < amount) {
      return { ok: false, message: 'No hay stock suficiente' }
    }

    const current = getCartQuantity(productId)
    adjustStock(productId, -amount)
    dispatch({
      type: 'SET_ITEM',
      payload: { productId: Number(productId), cantidad: current + amount },
    })
    return { ok: true }
  }

  /**
   * Define la cantidad exacta de un ítem en el carrito.
   * Calcula la diferencia con la cantidad actual y ajusta el inventario.
   * Si `qty` es 0, el ítem se elimina y el stock se restaura.
   * @returns {{ ok: boolean, message?: string }}
   */
  const setCartQuantity = (productId, qty) => {
    const nextQty = Math.floor(Number(qty))
    if (!Number.isFinite(nextQty) || nextQty < 0) {
      return { ok: false, message: 'Cantidad inválida' }
    }

    const product = getProductById(productId)
    if (!product) {
      return { ok: false, message: 'Producto no encontrado' }
    }

    const current = getCartQuantity(productId)
    const delta = nextQty - current

    if (delta === 0) {
      return { ok: true }
    }

    // Solo se puede aumentar si hay stock libre en inventario.
    if (delta > 0 && product.cantidad < delta) {
      return { ok: false, message: 'No hay stock suficiente' }
    }

    // delta positivo resta stock; delta negativo lo devuelve.
    adjustStock(productId, -delta)
    dispatch({
      type: 'SET_ITEM',
      payload: { productId: Number(productId), cantidad: nextQty },
    })
    return { ok: true }
  }

  /** Quita un producto del carrito y devuelve todo su stock al inventario. */
  const removeFromCart = (productId) => {
    const current = getCartQuantity(productId)
    if (current > 0) {
      adjustStock(productId, current)
    }
    dispatch({ type: 'SET_ITEM', payload: { productId: Number(productId), cantidad: 0 } })
  }

  /**
   * Elimina un ítem del carrito sin restaurar stock.
   * Usar al borrar un producto desde el CRUD de inventario.
   */
  const purgeFromCart = (productId) => {
    dispatch({ type: 'PURGE', payload: Number(productId) })
  }

  /** Total de unidades en el carrito (para el badge del ícono). */
  const totalItems = state.items.reduce((sum, item) => sum + item.cantidad, 0)

  /**
   * Líneas enriquecidas para la UI: une cada ítem con su producto
   * y calcula el subtotal (precio × cantidad).
   */
  const cartLines = useMemo(() => {
    return state.items
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId)
        if (!product) return null
        return {
          ...item,
          product,
          subtotal: product.precio * item.cantidad,
        }
      })
      .filter(Boolean)
  }, [state.items, products])

  /** Suma de subtotales de todas las líneas. */
  const totalPrice = cartLines.reduce((sum, line) => sum + line.subtotal, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartLines,
        totalItems,
        totalPrice,
        addToCart,
        setCartQuantity,
        removeFromCart,
        purgeFromCart,
        getCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/**
 * Hook para consumir el carrito.
 * Debe usarse dentro de un `CartProvider`.
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}
