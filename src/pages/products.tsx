import { useEffect, useReducer, useState } from "react"
import { ClipLoader } from "react-spinners"
import { ProductApi } from "../api"
import { ArticleData, ErrorDisplay, Layout } from "../components"
import { productReducer } from "../reducers"
import { productsInitialState } from "../reducers/productReducer"
import { ProductsType } from "../types/api.types"

const Prodcuts = () => {
  const [{ products, loading, error }, productDispatch] = useReducer(
    productReducer,
    productsInitialState
  )

  useEffect(() => {
    const fetchProducts = async () => {
      productDispatch({ type: "request" })
      await ProductApi.getProducts()
        .then((res) => {
          console.log({ res })

          productDispatch({ type: "success", results: res })
        })
        .catch((err) => {
          console.log(err)

          productDispatch({ type: "failure", error: err.message })
        })
    }
    fetchProducts()
  }, [])

  return (
    <Layout>
      <div className="products">
        <section className="flex flex-col w-full h-full">
          <h1 className="products--title">Products</h1>

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
              products.length > 0 &&
              products.map((product) => {
                return (
                  <div className="w-auto p-2 text-lg border" key={product.id}>
                    <h3>{product.name}</h3>

                    {product.articles &&
                      product.articles.map((item) => (
                        <ArticleData key={item.id} data={item} />
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

export default Prodcuts
