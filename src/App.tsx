import { Route, Routes } from "react-router-dom"
import Prodcuts from "./pages/products"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Prodcuts />} />
    </Routes>
  )
}

export default App
