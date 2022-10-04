import { ClipLoader } from "react-spinners"
import { useArticle } from "../hooks"

interface ArticleDataProps {
  id: string
}

const ArticleData = ({ id }: ArticleDataProps) => {
  const { article, articleLoading } = useArticle(id)

  return (
    <div className="px-3">
      {articleLoading ? (
        <ClipLoader
          className="my-10"
          color="black"
          loading={articleLoading}
          size={20}
        />
      ) : (
        article && (
          <div className="flex items-center justify-between w-1/2">
            <li>{article.name}</li>
            <p>
              <span>Amount in stock:</span>
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
