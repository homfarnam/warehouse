import { AxiosError } from "axios"
import { useContext, useEffect, useReducer } from "react"
import { ProductApi } from "../api"
import { WarehouseContext } from "../context/context"
import { productsReducer } from "../reducers"
import { productsInitialState } from "../reducers/productsReducer"
import { ProductsType } from "../types/api.types"

const useProducts = () => {
  const { allProducts, setAllProducts } = useContext(WarehouseContext)

  const [
    { products, loading: productsLoading, error: productsError },
    productDispatch,
  ] = useReducer(productsReducer, {
    ...productsInitialState,
    products: allProducts,
  })

  const getProducts = async () => {
    productDispatch({ type: "request" })
    try {
      const data = await ProductApi.getProducts<ProductsType[]>()
      productDispatch({
        type: "success",
        results: data,
      })
    } catch (err) {
      const error = err as AxiosError
      console.log("error: ", error.message)
      productDispatch({ type: "failure", error: error.message })
    }
  }

  useEffect(() => {
    if (allProducts.length === 0 && products.length > 0) {
      setAllProducts(products)
    }
  }, [products])

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      getProducts()
    }
  }, [])

  return {
    products,
    productsLoading,
    getProducts,
    productsError,
  }
}

export default useProducts
