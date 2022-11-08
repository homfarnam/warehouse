import React from "react"
import { cleanup, renderHook, waitFor } from "@testing-library/react"
import useSales from "./useSales"
import { SalesApi } from "../api"
import mockData from "../mockData/sales.mock.json"

jest.mock("../api/sales.ts")

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
              url: "http://localhost:8000/api/articles",
            },
          })
        }),
        eject: jest.fn(),
      },
    },
  }
})

describe("Use Sales hook test", () => {
  afterEach(cleanup)

  test("Check useSales hook - return undefined if id is wrong", async () => {
    const { result } = renderHook(() => useSales())

    const { sales } = result.current
    await waitFor(() => {
      expect(result.current.sales).toEqual([])
    })
  })

  test("Check useSales hook - successful fetch and get data", async () => {
    const mockedGetSales = SalesApi.getSales as jest.Mock

    mockedGetSales.mockImplementation(() => {
      return Promise.resolve(mockData.data)
    })

    const { result, rerender } = renderHook(() => useSales())

    await waitFor(() => {
      expect(result.current.sales).toEqual(mockData.data)
    })
  })

  test("Check if status is 503, expect to get error message", async () => {
    const mockedGetSales = SalesApi.getSales as jest.Mock

    mockedGetSales.mockImplementation(() => {
      return Promise.reject({
        message: "Request failed with status code 503",
      })
    })

    const { result } = renderHook(() => useSales())

    await waitFor(() => {
      expect(result.current.error).toEqual(
        "Request failed with status code 503"
      )
      expect(result.current.loading).toBeFalsy()
      expect(result.current.sales).toEqual([])
    })
  })
})
