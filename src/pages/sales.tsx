import { useEffect, useReducer } from "react"
import { ClipLoader } from "react-spinners"
import { SalesApi } from "../api"
import { ErrorDisplay, Layout, ProductData } from "../components"
import { salesReducer } from "../reducers"
import { salesInitialState } from "../reducers/salesReducer"

const Sales = () => {
  const [{ sales, loading, error }, salesDispatch] = useReducer(
    salesReducer,
    salesInitialState
  )

  useEffect(() => {
    const fetchProducts = async () => {
      salesDispatch({ type: "request" })
      await SalesApi.getSales()
        .then((res) => {
          console.log("sales: ", res)

          salesDispatch({ type: "success", results: res })
        })
        .catch((err) => {
          console.log(err)

          salesDispatch({ type: "failure", error: err.message })
        })
    }
    fetchProducts()
  }, [])

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
            {error ? (
              <ErrorDisplay text={error} />
            ) : loading ? (
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
                    <h3>{sale.productId}</h3>
                    <ProductData data={sale.productId} />
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
