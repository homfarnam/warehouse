import { useContext } from "react"
import { CartItem, Layout } from "../components"
import { WarehouseContext } from "../context/context"

const Cart = () => {
  const { cart } = useContext(WarehouseContext)

  return (
    <Layout>
      <div className="cart">
        <h2 className="cart--title">Cart</h2>

        <div className="cart__box">
          <h3 className="cart__box--title">Cart Items</h3>

          {cart.map((item) => {
            return <CartItem key={item.data.id} cart={item} />
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Cart
