import { ClipLoader } from "react-spinners"
import { Layout, ProductData } from "../components"
import { useSales } from "../hooks"

const Sales = () => {
  const { sales, loading } = useSales()

  return (
    <Layout>
      <div className="sales">
        <section className="flex flex-col w-full h-full">
          <h1 className="sales--title">Sales</h1>

          <div className="w-1/2 mx-auto my-10">
            <p className="text-2xl font-medium text-center">
              You can find sales data here.
            </p>
          </div>
          <div className="w-1/2 mx-auto my-10 space-y-3">
            {loading ? (
              <ClipLoader
                className="flex items-center justify-center w-full my-10"
                color="black"
                loading={loading}
                size={20}
              />
            ) : (
              sales.length > 0 &&
              sales.map((sale) => {
                return (
                  <div className="w-auto p-2 text-lg border" key={sale.id}>
                    <div className="flex items-center justify-between w-full">
                      <h3>
                        Product Id: {sale.productId.substring(0, 5)}...
                        {sale.productId.substring(
                          sale.productId.length - 5,
                          sale.productId.length
                        )}
                      </h3>
                      <span>Sold Amount: {sale.amountSold}</span>
                    </div>
                    <ProductData id={sale.productId} />
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

export default Sales
