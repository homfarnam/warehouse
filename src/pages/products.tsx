import { ClipLoader } from "react-spinners"
import { ArticleData, Layout } from "../components"
import { useProducts } from "../components/hooks"

const Products = () => {
  const { products, productsLoading } = useProducts()

  return (
    <Layout>
      <div className="products">
        <section className="flex flex-col w-full h-full">
          <h1 className="products--title">Products</h1>
          <div className="w-1/2 mx-auto my-10">
            <p className="text-2xl font-medium text-center">
              You can find products data here.
            </p>
          </div>
          <div className="w-4/12 mx-auto my-10 space-y-3">
            {productsLoading ? (
              <ClipLoader
                className="flex items-center justify-center w-full my-10"
                color="black"
                loading={productsLoading}
                size={20}
              />
            ) : (
              products.length > 0 &&
              products.map((product) => {
                return (
                  <div className="w-auto p-2 text-lg border" key={product.id}>
                    <h3>{product.name}</h3>

                    {product.articles &&
                      product.articles.length > 0 &&
                      product.articles.map((item) => (
                        <ArticleData key={item.id} id={item.id} />
                      ))}
                  </div>
                )
              })
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Products
