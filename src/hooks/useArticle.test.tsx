import React from "react"
import { cleanup, renderHook, waitFor } from "@testing-library/react"
import useArticle from "./useArticle"
import { ArticlesApi } from "../api"
import mockData from "../mockData/article.mock.json"
import WareHouseProvider from "../context/context"

jest.mock("../api/articles.ts")

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
              url: "http://localhost:8000/articles",
            },
          })
        }),
        eject: jest.fn(),
      },
    },
  }
})

describe("Use Article hook test", () => {
  afterEach(cleanup)

  test("Check useArticle hook - return undefined if id is wrong", async () => {
    const renderCustomHook = renderHook(() => useArticle("1"))

    const { article } = renderCustomHook.result.current
    await waitFor(() => {
      expect(article).toBeUndefined()
    })
  })

  test("Check useArticle hook - return data if id is correct and data successfully fetched", async () => {
    const mockedGetArticle = ArticlesApi.getOneArticle as jest.Mock

    mockedGetArticle.mockImplementation(() => {
      return Promise.resolve(mockData.data)
    })

    const { result, rerender } = renderHook(
      () => useArticle("831b92b8-677b-42cc-a585-335ea4ccccb6"),
      {
        wrapper: WareHouseProvider,
      }
    )

    await waitFor(() => {
      expect(result.current.article).toEqual(mockData.data)
      expect(result.current.articleLoading).toBe(false)
      expect(result.current.articleError).toBe("")
    })
  })

  test("Check if status is 503, expect to get error message", async () => {
    const mockedGetArticle = ArticlesApi.getOneArticle as jest.Mock

    mockedGetArticle.mockImplementation(() => {
      return Promise.reject({
        message: "Request failed with status code 503",
      })
    })

    const { result } = renderHook(() => useArticle("1"))

    const { article } = result.current
    await waitFor(() => {
      expect(article).toBeUndefined()
      expect(result.current.articleError).toBe(
        "Request failed with status code 503"
      )
      expect(result.current.articleLoading).toBeFalsy()
    })
  })
})
