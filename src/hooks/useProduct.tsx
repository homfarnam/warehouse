import axios from "axios"
import { useEffect, useState } from "react"
import { ProductApi } from "../api"
import { ProductsType } from "../types/api.types"

const useProduct = (productID: string) => {
  const [product, setProduct] = useState<ProductsType>()
  const [productError, setProductError] = useState<string>("")
  const [productLoading, setProductLoading] = useState<boolean>(false)

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
