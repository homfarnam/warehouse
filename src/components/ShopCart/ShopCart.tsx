import { useContext, useEffect, useState } from "react"
import { BsCart4 } from "react-icons/bs"
import { Link } from "react-router-dom"
import { WarehouseContext } from "../../context/context"

// interface ShopCartProps {}

const ShopCart = () => {
  const { cart } = useContext(WarehouseContext)

  return (
    <Link to="/cart">
      <div className="flex items-center space-x-3">
        <span className="mt-1 text-lg font-medium">{cart.length} </span>
        <BsCart4 size={25} />
      </div>
    </Link>
  )
}

export default ShopCart
