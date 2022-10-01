import ReactDOM from "react-dom/client"
import "./styles/tailwind.css"
import "./styles/main.scss"
import App from "./App"
import React from "react"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
