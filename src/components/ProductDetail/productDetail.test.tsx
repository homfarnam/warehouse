import React from "react"
import {
  cleanup,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import MockAdapter from "axios-mock-adapter"
import mockData from "../../mockData/products.mock.json"
import { act } from "react-dom/test-utils"
import ProductDetail from "./ProductDetail"
import { useProducts } from "../../hooks"
import { warehouseAPI } from "../../api"

describe("Product detail component", () => {
  test("Pass data to component and expect to show data", async () => {
    const mock = new MockAdapter(warehouseAPI)
    mock.onGet("/products/").reply(200, mockData.data)

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData.data)
    })

    render(
      <>
        <ProductDetail data={result.current.products[0]} />
        <ProductDetail data={result.current.products[1]} />
      </>,
      {
        wrapper: BrowserRouter,
      }
    )

    expect(result.current.productsLoading).toBeFalsy()
    expect(result.current.products.length).toBe(2)

    const productDetail1 = screen.getByText("Dining Chair")
    const productDetail2 = screen.getByText("Dining Table")

    await act(async () => {
      expect(productDetail1).toBeInTheDocument()
      expect(productDetail2).toBeInTheDocument()
    })
  })
})
