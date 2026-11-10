import { createContext, useContext, useReducer } from 'react'

const InventoryContext = createContext(null)

const initialProducts = [
  { id: 1, nombre: 'Leche de Soya 1L', marca: 'Orasí', categoria: 'Lácteos' },
  { id: 2, nombre: 'Yogurt de Coco', marca: 'Colun', categoria: 'Lácteos' },
  { id: 3, nombre: 'Queso vegetal', marca: 'Mammamozza', categoria: 'Lácteos' },
  { id: 4, nombre: 'Agua mineral 2L', marca: 'Benedictino', categoria: 'Bebidas' },
  { id: 5, nombre: 'Coca Cola 2.25L', marca: 'Coca-Cola', categoria: 'Bebidas' },
  { id: 6, nombre: 'Jugo de naranja', marca: 'Cepita', categoria: 'Bebidas' },
  { id: 7, nombre: 'Arroz Basmati 1kg', marca: 'Banquete', categoria: 'Abarrotes' },
  { id: 8, nombre: 'Aceite de girasol 900ml', marca: 'Natura', categoria: 'Abarrotes' },
  { id: 9, nombre: 'Fideos spaghetti', marca: 'Lucchetti', categoria: 'Abarrotes' },
  { id: 10, nombre: 'Pan de molde', marca: 'Bimbo', categoria: 'Panadería' },
  { id: 11, nombre: 'Pan de completo 400g', marca: 'Castaño', categoria: 'Panadería' },
  { id: 12, nombre: 'Detergente líquido', marca: 'Ala', categoria: 'Limpieza' },
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

  const deleteProduct = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

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
        deleteProduct,
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
