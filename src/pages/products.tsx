import { useContext } from "react"
import { Layout, Loader, ProductDetail } from "../components"
import { WarehouseContext } from "../context/context"

const Products = () => {
  const { products, productsLoading } = useContext(WarehouseContext)

  return (
    <Layout>
      <div className="products">
        <section>
          <h2 className="products--title">Products</h2>
          <div className="products__description">
            <h3>You can find products data here.</h3>
          </div>
          <div className="products__mainContent">
            {productsLoading ? (
              <Loader loading={productsLoading} size={20} />
            ) : (
              products.length > 0 &&
              products.map((product) => {
                return <ProductDetail data={product} key={product.id} />
              })
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Products
