import { createContext, useContext, useReducer } from 'react'

const InventoryContext = createContext(null)

const initialProducts = [
  { id: 1, nombre: 'Leche de Soya 1L', marca: 'Orasí', categoria: 'Lácteos', precio: 1890, cantidad: 40 },
  { id: 2, nombre: 'Yogurt de Coco', marca: 'Colun', categoria: 'Lácteos', precio: 1290, cantidad: 25 },
  { id: 3, nombre: 'Queso vegetal', marca: 'Mammamozza', categoria: 'Lácteos', precio: 3490, cantidad: 18 },
  { id: 4, nombre: 'Agua mineral 2L', marca: 'Benedictino', categoria: 'Bebidas', precio: 990, cantidad: 60 },
  { id: 5, nombre: 'Coca Cola 2.25L', marca: 'Coca-Cola', categoria: 'Bebidas', precio: 2190, cantidad: 35 },
  { id: 6, nombre: 'Jugo de naranja', marca: 'Cepita', categoria: 'Bebidas', precio: 1590, cantidad: 28 },
  { id: 7, nombre: 'Arroz Basmati 1kg', marca: 'Banquete', categoria: 'Abarrotes', precio: 2490, cantidad: 50 },
  { id: 8, nombre: 'Aceite de girasol 900ml', marca: 'Natura', categoria: 'Abarrotes', precio: 2790, cantidad: 22 },
  { id: 9, nombre: 'Fideos spaghetti', marca: 'Lucchetti', categoria: 'Abarrotes', precio: 890, cantidad: 45 },
  { id: 10, nombre: 'Pan de molde', marca: 'Bimbo', categoria: 'Panadería', precio: 1690, cantidad: 30 },
  { id: 11, nombre: 'Pan de completo 400g', marca: 'Castaño', categoria: 'Panadería', precio: 1990, cantidad: 20 },
  { id: 12, nombre: 'Detergente líquido', marca: 'Ala', categoria: 'Limpieza', precio: 3290, cantidad: 15 },
]

function inventoryReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        products: [...state.products, { ...action.payload, id: state.nextId }],
        nextId: state.nextId + 1,
      }
    case 'UPDATE':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? { ...product, ...action.payload } : product,
        ),
      }
    case 'ADJUST_STOCK': {
      const { id, delta } = action.payload
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id !== id) return product
          return {
            ...product,
            cantidad: Math.max(0, product.cantidad + delta),
          }
        }),
      }
    }
    case 'DELETE':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      }
    default:
      return state
  }
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, {
    products: initialProducts,
    nextId: initialProducts.length + 1,
  })

  const addProduct = (product) => {
    dispatch({ type: 'ADD', payload: product })
  }

  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE', payload: product })
  }

  const adjustStock = (id, delta) => {
    dispatch({ type: 'ADJUST_STOCK', payload: { id, delta } })
  }

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const getProductById = (id) =>
    state.products.find((product) => product.id === Number(id))

  const categories = [
    ...new Set(state.products.map((product) => product.categoria).filter(Boolean)),
  ].sort((a, b) => a.localeCompare(b, 'es'))

  return (
    <InventoryContext.Provider
      value={{
        products: state.products,
        categories,
        addProduct,
        updateProduct,
        adjustStock,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventory debe usarse dentro de InventoryProvider')
  }
  return context
}
