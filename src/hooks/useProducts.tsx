import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect, useReducer, useRef } from "react"
import { toast } from "react-toastify"
import { ProductApi, warehouseAPI } from "../api"
import { productsReducer } from "../reducers"
import { productsInitialState } from "../reducers/productsReducer"
import { ProductsType } from "../types/api.types"

const useProducts = () => {
  const [
    { products, loading: productsLoading, error: _productsError },
    productDispatch,
  ] = useReducer(productsReducer, productsInitialState)

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

  useEffect(() => {
    getProducts()
  }, [])

  return {
    products,
    productsLoading,
  }
}

export default useProducts
