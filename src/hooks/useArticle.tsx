import axios, { AxiosError } from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ArticlesApi, warehouseAPI } from "../api"
import { WarehouseContext } from "../context/context"
import { ArticlesType } from "../types/api.types"

const useArticle = (articleId: string) => {
  const { allArticles, setAllArticles } = useContext(WarehouseContext)

  const [articleError, setArticleError] = useState<string>("")
  const [articleLoading, setArticleLoading] = useState<boolean>(false)

  const refetchRequest = async (err: AxiosError) => {
    warehouseAPI(err.config)
  }

  const getArticle = async (id: string) => {
    setArticleLoading(true)
    try {
      const newData = await ArticlesApi.getOneArticle(id)

      setAllArticles((prev) => ({
        ...prev,
        [id]: newData as ArticlesType,
      }))
      setArticleLoading(false)
    } catch (err) {
      console.log(err)
      if (axios.isAxiosError(err)) {
        setArticleError(err.message)
        setArticleLoading(false)
        const error = err
        toast.error(
          () => (
            <div>
              <p>{error.message}</p>
              <button
                onClick={() => refetchRequest(error)}
                className="p-2 text-lg text-center bg-red-400 rounded-lg"
              >
                Try again
              </button>
            </div>
          ),
          {
            pauseOnHover: true,
          }
        )
      }
    }
  }

  useEffect(() => {
    if (articleId && !allArticles[articleId]) {
      getArticle(articleId)
    }
  }, [articleId])

  return { article: allArticles[articleId], articleError, articleLoading }
}

export default useArticle
