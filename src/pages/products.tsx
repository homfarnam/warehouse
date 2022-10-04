import { Layout, Loader, ProductDetail } from "../components"
import { useProducts } from "../components/hooks"

const Products = () => {
  const { products, productsLoading } = useProducts()

  return (
    <Layout>
      <div className="products">
        <section>
          <h1 className="products--title">Products</h1>
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
