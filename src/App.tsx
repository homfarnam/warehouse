import { Route, Routes } from "react-router-dom"
import Prodcuts from "./pages/products"
import Sales from "./pages/sales"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Prodcuts />} />
      <Route path="/sales" element={<Sales />} />
    </Routes>
  )
}

export default App
