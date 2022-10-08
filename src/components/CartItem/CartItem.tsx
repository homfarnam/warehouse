import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { SalesApi } from "../../api"
import { CartType, WarehouseContext } from "../../context/context"
import SelectInput from "../Shared/SelectInput/SelectInput"

interface CartItemProps {
  cart: CartType
}

type CartDataType = {
  productId: string
  amountSold: number
}

const CartItem = ({ cart }: CartItemProps) => {
  const [cartData, setCartData] = useState<CartDataType>({
    productId: cart.data.id,
    amountSold: +cart.amount,
  })
  const { removeCartItem } = useContext(WarehouseContext)

  const registerSale = async () => {
    try {
      const response = await SalesApi.postSale(cartData)
      console.log(response)
      toast.success("Sale registered successfully")
    } catch (error) {
      console.log(error)
      toast.error("Error registering sale")
    }
  }

  return (
    <div className="cartItem">
      <div className="cartItem__container">
        <div className="cartItem__container__details">
          <p>{cart.data.name}</p>

          <SelectInput
            initialValue={cart.amount}
            getSelectValue={(val) => {
              setCartData((prev) => ({ ...prev, amountSold: +val }))
            }}
          />
        </div>

        <div className="cartItem__container__buttonsBox">
          <div className="cartItem__container__buttonsBox--remove">
            <button onClick={() => removeCartItem(cart.data.id)}>Remove</button>
          </div>
          <div className="cartItem__container__buttonsBox--register">
            <button onClick={() => registerSale()}>Register Sale</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
