import React from "react"
import {
  cleanup,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ProductApi, warehouseAPI } from "./api"
import mockData from "./mockData/products.mock.json"
import { useProducts } from "./hooks"
import { act } from "react-dom/test-utils"
import Products from "./pages/products"
import { ProductsType } from "./types/api.types"

const mockChildComponent = jest.fn()
jest.mock(
  "./components/ProductDetail/ProductDetail.tsx",
  () =>
    ({ data }: { data: ProductsType }) => {
      mockChildComponent(data)
    }
)

jest.mock("./api/products.ts")

describe("Products page", () => {
  afterEach(cleanup)

  test("Check if page render correctly and title can be found in page ", async () => {
    render(<App />, { wrapper: BrowserRouter })
    const titleTagValue = screen.getByTestId("products-title").innerHTML
    await waitFor(() => {
      expect(titleTagValue).toBe("Products")
    })
  })

  test("Check ProductDetail component have data and show data and repeated in length of products ", async () => {
    const mockedGetProduct = ProductApi.getProducts as jest.Mock

    mockedGetProduct.mockImplementation(() => {
      return Promise.resolve(mockData.data)
    })

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData.data)
    })

    render(<Products />, { wrapper: BrowserRouter })

    await waitFor(() => {
      expect(mockChildComponent).toHaveBeenCalledTimes(mockData.data.length)
    })
  })

  test("Check if data is null, expect to see toast error ", async () => {
    const mockedGetProduct = ProductApi.getProducts as jest.Mock

    mockedGetProduct.mockImplementation(() => {
      return Promise.reject({
        message: "Request failed with status code 503",
      })
    })

    const { result } = renderHook(() => useProducts())

    await act(async () => {
      expect(result.current.products).toEqual([])
    })

    render(<Products />, { wrapper: BrowserRouter })

    await waitFor(() => {
      expect(result.current.productsError).toEqual(
        "Request failed with status code 503"
      )

      expect(screen.getByTestId("error-test")).toHaveTextContent(
        "Request failed with status code 503"
      )
    })
  })
})
