import React, { useContext, useEffect, useState } from "react"
import { BsCart4 } from "react-icons/bs"
import { WarehouseContext } from "../../context/context"

// interface ShopCartProps {}

const ShopCart = () => {
  const { cart } = useContext(WarehouseContext)

  return (
    <div className="flex items-center space-x-3">
      <span className="mt-1 text-lg font-medium">{cart.length} </span>
      <BsCart4 size={25} />
    </div>
  )
}

export default ShopCart
