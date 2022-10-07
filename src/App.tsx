import { Route, Routes } from "react-router-dom"
import Cart from "./pages/cart"
import Prodcuts from "./pages/products"
import Sales from "./pages/sales"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Prodcuts />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default App
