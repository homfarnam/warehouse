import ReactDOM from "react-dom/client"
import "./styles/tailwind.css"
import "./styles/main.scss"
import App from "./App"
import React from "react"
import { BrowserRouter } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      newestOnTop
      draggable
      autoClose={2500}
      hideProgressBar={false}
    />
  </BrowserRouter>
)
