import type { ProductsType } from "../../types/api.types"
import ArticleData from "../ArticleData/ArticleData"

interface ProductDetailProps {
  data: ProductsType
}

const ProductDetail = ({ data }: ProductDetailProps) => {
  return (
    <div className="w-auto p-2 text-lg border">
      <h3>{data.name}</h3>

      {data.articles &&
        data.articles.length > 0 &&
        data.articles.map((item) => <ArticleData key={item.id} id={item.id} />)}
    </div>
  )
}

export default ProductDetail
