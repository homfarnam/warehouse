import { useContext } from "react"
import { toast } from "react-toastify"
import { SalesApi } from "../../api"
import { CartType, WarehouseContext } from "../../context/context"
import SelectInput from "../Shared/SelectInput/SelectInput"

interface CartItemProps {
  cart: CartType
}

const CartItem = ({ cart }: CartItemProps) => {
  const { removeCartItem } = useContext(WarehouseContext)

  const registerSale = async (id: string) => {
    try {
      const response = await SalesApi.postSale({
        productId: id,
        amountSold: +cart.amount,
      })
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

          <SelectInput value={+cart.amount} />
        </div>

        <div className="cartItem__container__buttonsBox">
          <div className="cartItem__container__buttonsBox--remove">
            <button onClick={() => removeCartItem(cart.data.id)}>Remove</button>
          </div>
          <div className="cartItem__container__buttonsBox--register">
            <button onClick={() => registerSale(cart.data.id)}>
              Register Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
