import { toast } from "react-toastify"
import { Layout, Loader, ProductDetail } from "../components"
import { useProducts } from "../hooks"

const Products = () => {
  const { products, productsLoading, productsError } = useProducts()

  if (productsError) {
    toast.error(
      () => (
        <div data-testid="error-toast">
          <p>{productsError}</p>
        </div>
      ),
      {
        pauseOnHover: true,
        autoClose: 5000,
      }
    )
  }

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
            {productsLoading ? (
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
