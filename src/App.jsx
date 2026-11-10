import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import { InventoryProvider } from './context/InventoryContext'
import Faq from './pages/Faq'
import Home from './pages/Home'
import Inventario from './pages/Inventario'
import Nosotros from './pages/Nosotros'
import Productos from './pages/Productos'

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <div className="mx-auto min-h-screen max-w-5xl px-4 pb-24 pt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav />
      </BrowserRouter>
    </InventoryProvider>
  )
}

export default App
