import { memo } from "react"
import { useArticle } from "../../hooks"
import Loader from "../Shared/Loader/Loader"

interface ArticleDataProps {
  id: string
}

const ArticleData = memo(({ id }: ArticleDataProps) => {
  const { article, articleLoading } = useArticle(id)

  return (
    <div className="px-3">
      {articleLoading ? (
        <Loader loading={articleLoading} size={20} />
      ) : (
        article && (
          <div className="article">
            <li>{article.name}</li>
            <p>
              <span>Amount in stock:</span>
              <span>{article.amountInStock}</span>
            </p>
          </div>
        )
      )}
    </div>
  )
})

export default ArticleData
