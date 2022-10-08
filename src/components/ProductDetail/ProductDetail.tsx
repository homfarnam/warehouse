import { useContext, useState } from "react"
import type { ProductsType } from "../../types/api.types"
import ArticleData from "../ArticleData/ArticleData"
import { BsCartPlusFill } from "react-icons/bs"
import { WarehouseContext } from "../../context/context"

interface ProductDetailProps {
  data: ProductsType
}

const ProductDetail = ({ data }: ProductDetailProps) => {
  const [amount, setAmount] = useState<number>(1)
  const { saveToCart } = useContext(WarehouseContext)

  const addToSale = async () => {
    const cartData = { data, amount }
    saveToCart(cartData)
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  return (
    <div className="productCard">
      <div className="productCard__header">
        <h3>{data.name}</h3>
        <div className="productCard__header__cart">
          <input
            type="number"
            value={amount}
            className="productCard__header__cart--amountInput"
            onChange={handleAmount}
            min={1}
            max={10}
          />
          <BsCartPlusFill
            className="productCard__header__cart--icon"
            size={27}
            onClick={addToSale}
          />
        </div>
      </div>

      {data.articles &&
        data.articles.length > 0 &&
        data.articles.map((item) => <ArticleData key={item.id} id={item.id} />)}
    </div>
  )
}

export default ProductDetail
