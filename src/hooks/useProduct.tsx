import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ProductApi, warehouseAPI } from "../api"
import { ProductsType } from "../types/api.types"

const useProduct = (productID: string) => {
  const [product, setProduct] = useState<ProductsType>()
  const [productError, setProductError] = useState<string>("")
  const [productLoading, setProductLoading] = useState<boolean>(false)

  const refetchRequest = async (err: AxiosError) => {
    warehouseAPI(err.config)
  }

  const getProduct = async (id: string) => {
    setProductLoading(true)
    try {
      const response = await ProductApi.getOneProduct(id)
      setProduct(response as ProductsType)
      setProductLoading(false)
    } catch (err) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        setProductError(err.message)
        setProductLoading(false)
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
    if (productID) {
      getProduct(productID)
    }
  }, [productID])

  return {
    product,
    productError,
    productLoading,
  }
}

export default useProduct
