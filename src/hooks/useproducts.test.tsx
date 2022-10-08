import React from "react"
import { cleanup, renderHook, waitFor } from "@testing-library/react"
import useProducts from "./useProducts"
import mockData from "../mockData/mock.json"
import { act } from "react-dom/test-utils"
import { ProductApi, warehouseAPI } from "../api"
import MockAdapter from "axios-mock-adapter"
import App from "../App"
import { BrowserRouter } from "react-router-dom"

jest.mock("../api/products.ts")

export const waitForNextUpdate = async () => {
  return new Promise<void>((resolve, _reject) => {
    setTimeout(() => {
      resolve()
    }, 100)
  })
}

describe("UseProducts Tests", () => {
  afterEach(cleanup)

  test("Check useProducts hook - return empty array at first", async () => {
    const renderCustomHook = renderHook(() => useProducts())

    const { products } = renderCustomHook.result.current
    await waitFor(() => {
      expect(products).toEqual([])
    })
  })

  test("Check useProducts hook - successful fetch and get data", async () => {
    const mockedGetProduct = ProductApi.getProducts as jest.Mock

    mockedGetProduct.mockImplementation(() => {
      return Promise.resolve(mockData.data)
    })

    const { result, rerender } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.products).toEqual(mockData.data)
    })
  })

  test("Check if status is 503, expect to get error message ", async () => {
    const mockedGetProduct = ProductApi.getProducts as jest.Mock

    mockedGetProduct.mockImplementation(() => {
      return Promise.reject({
        message: "Request failed with status code 503",
      })
    })

    const { result } = renderHook(() => useProducts())

    await waitFor(() => {
      expect(result.current.productsError).toEqual(
        "Request failed with status code 503"
      )
    })
  })
})
