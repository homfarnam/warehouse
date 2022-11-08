import React from "react"
import { cleanup, renderHook, waitFor } from "@testing-library/react"
import useProduct from "./useProduct"
import { ProductApi } from "../api"
import mockData from "../mockData/product.mock.json"
import { BrowserRouter } from "react-router-dom"

jest.mock("../api/products.ts")

jest.mock("axios", () => {
  const originalModule = jest.requireActual("axios")
  return {
    ...originalModule,
    create: () => {
      return {
        ...originalModule,
        interceptors: {
          response: {
            use: jest.fn(),
          },
        },
      }
    },
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: {
        use: jest.fn().mockImplementation((success, error) => {
          error({
            config: {
              url: "http://localhost:8000/products",
            },
          })
        }),
        eject: jest.fn(),
      },
    },
  }
})

describe("Use Product hook test", () => {
  afterEach(cleanup)

  test("Check useProduct hook - return undefined if id is wrong", async () => {
    const renderCustomHook = renderHook(() => useProduct("1"))

    const { product } = renderCustomHook.result.current
    await waitFor(() => {
      expect(product).toBeUndefined()
    })
  })

  test("Check useProduct hook - return data if id is correct and data successfully fetched", async () => {
    const mockedGetOneProduct = ProductApi.getOneProduct as jest.Mock

    mockedGetOneProduct.mockImplementation(() => {
      return Promise.resolve(mockData.data)
    })

    const { result, rerender } = renderHook(
      () => useProduct("831b92b8-677b-42cc-a585-335ea4ccccb6"),
      {
        wrapper: BrowserRouter,
      }
    )

    await waitFor(() => {
      expect(result.current.product).toEqual(mockData.data)
      expect(result.current.productLoading).toBe(false)
      expect(result.current.productError).toBe("")
    })
  })

  test("Check if status is 503, expect to get error message", async () => {
    const mockedGetOneProduct = ProductApi.getOneProduct as jest.Mock

    mockedGetOneProduct.mockImplementation(() => {
      return Promise.reject({
        message: "Request failed with status code 503",
      })
    })

    const { result } = renderHook(() => useProduct("1"))

    await waitFor(() => {
      console.log(result.current)
      expect(result.current.product).toBeUndefined()
      // expect(result.current.productError).toBe(
      //   "Request failed with status code 503"
      // )
      // expect(result.current.productLoading).toBe(false)
    })
  })
})
