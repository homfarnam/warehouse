import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useContext, useEffect, useReducer, useRef } from "react"
import { toast } from "react-toastify"
import { ProductApi, warehouseAPI } from "../api"
import { WarehouseContext } from "../context/context"
import { productsReducer } from "../reducers"
import { productsInitialState } from "../reducers/productsReducer"
import { ProductsType } from "../types/api.types"

const useProducts = () => {
  const { allProducts, setAllProducts } = useContext(WarehouseContext)

  const [
    { products, loading: productsLoading, error: _productsError },
    productDispatch,
  ] = useReducer(productsReducer, {
    ...productsInitialState,
    products: allProducts,
  })

  const refetchRequest = async (err: AxiosError) => {
    warehouseAPI(err.config)
  }

  const getProducts = async () => {
    productDispatch({ type: "request" })
    try {
      const data = await ProductApi.getProducts<ProductsType[]>()
      productDispatch({
        type: "success",
        results: data,
      })
    } catch (err) {
      console.log(typeof err)
      productDispatch({ type: "request" })

      if (axios.isAxiosError(err)) {
        productDispatch({ type: "failure", error: err.message })
        console.log(err)
        const error = err
        toast.error(
          () => (
            <div>
              <p>{error.message}</p>
              <button
                onClick={() => refetchRequest(error)}
                className="p-2 text-lg text-center bg-red-400 rounded-lg"
              >
                Try again
              </button>
            </div>
          ),
          {
            pauseOnHover: true,
          }
        )
      }
    }
  }

  const productRequest = () => {
    getProducts()
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
    productRequest,
  }
}

export default useProducts
