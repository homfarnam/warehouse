import React from "react"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import { BrowserRouter } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import "./styles/tailwind.css"
import "./styles/main.scss"
import App from "./App"
import WareHouseProvider from "./context/context"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WareHouseProvider>
    <BrowserRouter>
      <App />
      <ToastContainer
        newestOnTop
        draggable
        autoClose={2500}
        hideProgressBar={false}
      />
    </BrowserRouter>
  </WareHouseProvider>
)
