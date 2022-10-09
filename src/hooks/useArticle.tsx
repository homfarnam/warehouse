import { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { ArticlesApi } from "../api"
import { WarehouseContext } from "../context/context"
import { ArticlesType } from "../types/api.types"

const useArticle = (articleId: string) => {
  const { allArticles, setAllArticles } = useContext(WarehouseContext)

  const [articleError, setArticleError] = useState<string>("")
  const [articleLoading, setArticleLoading] = useState<boolean>(false)

  const getArticle = async (id: string) => {
    setArticleLoading(true)
    try {
      const response = await ArticlesApi.getOneArticle(id)

      setAllArticles((prev) => ({
        ...prev,
        [id]: response as ArticlesType,
      }))

      setArticleLoading(false)
    } catch (err) {
      const error = err as AxiosError
      console.log(err)
      setArticleError(error.message)
      setArticleLoading(false)
    }
  }

  useEffect(() => {
    if (articleId && !allArticles[articleId]) {
      getArticle(articleId)
    }
  }, [articleId])

  return {
    article: allArticles[articleId],
    articleError,
    articleLoading,
  }
}

export default useArticle
