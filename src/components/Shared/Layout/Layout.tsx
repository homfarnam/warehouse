import React, { CSSProperties } from "react"
import { NavLink } from "react-router-dom"
import { BsCart4 } from "react-icons/bs"
import ShopCart from "../../ShopCart/ShopCart"

interface LayoutProps {
  children: React.ReactNode
}

const selectedLink: CSSProperties = {
  color: "black",
  textDecoration: "underline",
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="layout">
      <header>
        <nav className="">
          <NavLink
            style={({ isActive }) => (isActive ? selectedLink : undefined)}
            to="/"
          >
            Products
          </NavLink>
          <NavLink
            to="/sales"
            style={({ isActive }) => (isActive ? selectedLink : undefined)}
          >
            Sales
          </NavLink>
        </nav>
        <ShopCart />
      </header>
      {children}
      <footer></footer>
    </main>
  )
}

export default Layout
