import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import CartFab from './components/CartFab'
import { CartProvider } from './context/CartContext'
import { InventoryProvider } from './context/InventoryContext'
import Carrito from './pages/Carrito'
import Faq from './pages/Faq'
import Home from './pages/Home'
import Inventario from './pages/Inventario'
import Nosotres from './pages/Nosotres'
import ProductoDetalle from './pages/ProductoDetalle'
import Productos from './pages/Productos'

function App() {
  return (
    <InventoryProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/nosotres" element={<Nosotres />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <CartFab />
          <BottomNav />
        </BrowserRouter>
      </CartProvider>
    </InventoryProvider>
  )
}

export default App
