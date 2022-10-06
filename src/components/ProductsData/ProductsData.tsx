import { useProduct } from "../../hooks"
import Loader from "../Shared/Loader/Loader"

interface ProductDataProps {
  id: string
}

const ProductsData = ({ id }: ProductDataProps) => {
  const { product, productLoading } = useProduct(id)

  return (
    <div className="px-3">
      {productLoading ? (
        <Loader loading={productLoading} size={20} />
      ) : (
        product && (
          <div className="flex items-center justify-between w-1/2">
            <span>Product title: {product.name}</span>
          </div>
        )
      )}
      <span></span>
    </div>
  )
}

export default ProductsData
