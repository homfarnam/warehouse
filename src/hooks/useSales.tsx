import { AxiosError } from "axios"
import { useEffect, useReducer, useRef } from "react"
import { SalesApi } from "../api"
import { salesReducer } from "../reducers"
import { salesInitialState } from "../reducers/salesReducer"
import { SalesType } from "../types/api.types"

const useSales = () => {
  const [{ sales, loading, error }, salesDispatch] = useReducer(
    salesReducer,
    salesInitialState
  )

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

      const error = err as AxiosError
      salesDispatch({ type: "failure", error: error.message })
      console.log(err)
    }
  }

  useEffect(() => {
    getSales()
  }, [])

  return {
    sales,
    loading,
    error,
  }
}

export default useSales
