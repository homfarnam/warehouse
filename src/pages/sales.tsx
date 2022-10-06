import { ClipLoader } from "react-spinners"
import { Layout, Loader, ProductData, SalesData } from "../components"
import { useSales } from "../hooks"

const Sales = () => {
  const { sales, loading } = useSales()

  return (
    <Layout>
      <div className="sales">
        <section className="sales__content">
          <h2 className="sales__content--title">Sales</h2>

          <div className="sales__content__description">
            <h3>You can find sales data here.</h3>
          </div>
          <div className="sales__content__data">
            {loading ? (
              <Loader loading={loading} size={20} />
            ) : (
              sales.length > 0 &&
              sales.map((sale) => {
                return <SalesData key={sale.id} data={sale} />
              })
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Sales
