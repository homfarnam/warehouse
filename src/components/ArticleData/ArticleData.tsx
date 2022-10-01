import React, { useEffect, useReducer, useState } from "react"
import { ClipLoader } from "react-spinners"
import { ArticlesApi } from "../../api"
import { articleReducer } from "../../reducers"
import { articleInitialState } from "../../reducers/articleReducer"
import { ArticlesType } from "../../types/api.types"
import ErrorDisplay from "../Shared/ErrorDisplay/ErrorDisplay"

interface ArticleDataProps {
  data: ArticlesType
}

const ArticleData = ({ data }: ArticleDataProps) => {
  const [{ article, loading, error }, articleDispatch] = useReducer(
    articleReducer,
    articleInitialState
  )

  useEffect(() => {
    const fetchArticle = async () => {
      await articleDispatch({ type: "request" })
      ArticlesApi.getOneArticle(data.id)
        .then((res) => {
          articleDispatch({ type: "success", results: res })
        })
        .catch((err) => {
          console.log(err)
          articleDispatch({ type: "failure", error: err.message })
        })
    }
    if (data && data.id) {
      fetchArticle()
    }
  }, [data])

  return (
    <div className="px-3">
      {error && !article ? (
        <ErrorDisplay text={error} />
      ) : loading ? (
        <ClipLoader
          className="my-10"
          color="black"
          loading={loading}
          size={20}
        />
      ) : (
        article && (
          <div className="flex items-center justify-between w-1/2">
            <li>{article.name}</li>
            <p>
              <span>Amount:</span>
              <span>{article.amountInStock}</span>
            </p>
          </div>
        )
      )}
      <span></span>
    </div>
  )
}

export default ArticleData
