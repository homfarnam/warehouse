import type { SalesType } from "../../types/api.types"
import ProductsData from "../ProductData/ProductData"

interface SalesDataProps {
  data: SalesType
}

const SalesData = ({ data }: SalesDataProps) => {
  const shortId =
    data.productId.substring(0, 5) +
    "..." +
    data.productId.substring(data.productId.length - 5, data.productId.length)

  return (
    <div className="saleData">
      <div className="flex items-center justify-between w-full">
        <h3>Product Id: {shortId}</h3>
        <span>Sold Amount: {data.amountSold}</span>
      </div>
      <ProductsData id={data.productId} />
    </div>
  )
}

export default SalesData
