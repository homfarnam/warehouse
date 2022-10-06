import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect, useReducer, useRef } from "react"
import { toast } from "react-toastify"
import { SalesApi, warehouseAPI } from "../api"
import { salesReducer } from "../reducers"
import { salesInitialState } from "../reducers/salesReducer"
import { SalesType } from "../types/api.types"

const useSales = () => {
  const [{ sales, loading, error }, salesDispatch] = useReducer(
    salesReducer,
    salesInitialState
  )

  const refetchRequest = async (err: AxiosError) => {
    warehouseAPI(err.config)
  }

  const getSales = async () => {
    salesDispatch({ type: "request" })
    try {
      const data = await SalesApi.getSales<SalesType[]>()
      salesDispatch({
        type: "success",
        results: data,
      })
    } catch (err) {
      salesDispatch({ type: "request" })

      if (axios.isAxiosError(err)) {
        salesDispatch({ type: "failure", error: err.message })
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
    getSales()
  }, [])

  return {
    sales,
    loading,
  }
}

export default useSales
