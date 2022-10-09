import { Layout, Loader, ProductDetail } from "../components"
import { useProducts } from "../hooks"

const Products = () => {
  const { products, productsLoading, productsError } = useProducts()

  return (
    <Layout>
      <div className="products">
        <section>
          <h2 className="products--title" data-testid="products-title">
            Products
          </h2>
          <div className="products__description">
            <h3>You can find products data here.</h3>
          </div>
          <div className="products__mainContent">
            {productsError && !productsLoading ? (
              <div>
                <p data-testid="error-test">{productsError}</p>
              </div>
            ) : productsLoading ? (
              <Loader loading={productsLoading} size={20} />
            ) : (
              products.length > 0 &&
              products.map((product) => (
                <ProductDetail data={product} key={product.id} />
              ))
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Products
