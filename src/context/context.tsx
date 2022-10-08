import React, { createContext, useState } from "react"
import { ArticlesType, ProductsType } from "../types/api.types"

export type CartType = {
  data: ProductsType
  amount: number
}

interface ContextType {
  cart: CartType[]
  saveToCart: (data: CartType) => void
  removeCartItem: (id: string) => void
  setAllProducts: React.Dispatch<React.SetStateAction<ProductsType[]>>
  allProducts: ProductsType[]
  allArticles: Record<string, ArticlesType>
  setAllArticles: React.Dispatch<
    React.SetStateAction<Record<string, ArticlesType>>
  >
}

const initialState = {
  cart: [],
  saveToCart: () => {},
  removeCartItem: () => {},
  setAllProducts: () => {},
  allProducts: [],
  allArticles: {},
  setAllArticles: () => {},
}

export const WarehouseContext = createContext<ContextType>(initialState)

const WareHouseProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartType[]>([])
  const [allProducts, setAllProducts] = useState<ProductsType[]>([])
  const [allArticles, setAllArticles] = useState<Record<string, ArticlesType>>(
    {}
  )

  const saveToCart = (cartItem: CartType) => {
    const isProductExist = cart.find(
      (item) => item.data.id === cartItem.data.id
    )

    const updatedCart = isProductExist
      ? cart.map((item: CartType) => {
          if (item.data.id === cartItem.data.id) {
            return {
              ...item,
              amount: item.amount + cartItem.amount,
            }
          }
          return item
        })
      : [...cart, cartItem]

    setCart(updatedCart)
  }

  const removeCartItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.data.id !== id)
    setCart(updatedCart)
  }

  return (
    <WarehouseContext.Provider
      value={{
        cart,
        saveToCart,
        removeCartItem,
        setAllProducts,
        allProducts,
        allArticles,
        setAllArticles,
      }}
    >
      {children}
    </WarehouseContext.Provider>
  )
}

export default WareHouseProvider
