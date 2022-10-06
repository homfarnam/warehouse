import React, { createContext, useEffect, useState } from "react"
import { useProducts } from "../hooks"
import { ArticlesType, ProductsType } from "../types/api.types"

type CartType = {
  data: ProductsType
  amount: number
}

interface ContextType {
  cart: CartType[]
  products: ProductsType[]
  saveToCart: (data: CartType) => void
  productsLoading: boolean
}

const initialState = {
  cart: [],
  products: [],
  saveToCart: () => {},
  productsLoading: false,
}

export const WarehouseContext = createContext<ContextType>(initialState)

const WareHouseProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartType[]>([])
  const { products, productsLoading, productRequest } = useProducts()

  const saveToCart = (data: CartType) => {
    // check if product is already in local storage and update amount
    const productInCart = localStorage.getItem("cart")
    if (productInCart) {
      const parsedCart = JSON.parse(productInCart)
      const product = parsedCart.find(
        (item: CartType) => item.data.id === data.data.id
      )
      if (product) {
        const updatedCart = parsedCart.map((item: CartType) => {
          if (item.data.id === data.data.id) {
            return {
              ...item,
              amount: item.amount + data.amount,
            }
          }
          return item
        })
        setCart(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
      } else {
        localStorage.setItem("cart", JSON.stringify([...parsedCart, data]))
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, data]))
    }
  }

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      const data = localStorage.getItem("cart")
      const localData = JSON.parse(data as string)
      setCart(localData as CartType[])
    }
  }, [])

  useEffect(() => {
    console.log({ cart })
  }, [cart])

  return (
    <WarehouseContext.Provider
      value={{ products, cart, saveToCart, productsLoading }}
    >
      {children}
    </WarehouseContext.Provider>
  )
}

export default WareHouseProvider
