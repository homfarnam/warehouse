import { globalConfig, warehouseAPI } from "./api"
import { ArticlesType } from "../types/api.types"

// Get all articles
// Lists the entire article collection.
const getArticles = async <T>(): Promise<T> => {
  return await warehouseAPI.get("/articles/", globalConfig).then((response) => {
    return response.data
  })
}

// Post an article
// Creates a new article.
const postArticle = async ({
  name,
  amountInStock,
}: Omit<ArticlesType, "id">) => {
  warehouseAPI
    .post(
      "/articles/",
      {
        name,
        amountInStock,
      },
      globalConfig
    )
    .then((response) => {
      return response.data
    })
}

// GET /articles/:id - Gets an article by id.
const getOneArticle = async <T>(id: string): Promise<T> => {
  return await warehouseAPI
    .get(`/articles/${id}`, globalConfig)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      }
    })
}

// PATCH /articles/:id
// Patches an article by id.
const patchOneArticle = async (
  id: string,
  { name, amountInStock }: Omit<ArticlesType, "id">
) => {
  return await warehouseAPI
    .patch(
      `/articles/${id}`,
      {
        name,
        amountInStock,
      },
      globalConfig
    )
    .then((response) => {
      return response.data
    })
}

// DELETE /articles/:id
// Deletes an article by id.
const deleteOneArticle = async (id: string) => {
  return await warehouseAPI
    .delete(`/articles/${id}`, globalConfig)
    .then((response) => {
      return response.data
    })
}

// PATCH /articles/
//  Bulk patch multiple articles at once.

const patchArticles = async (articles: ArticlesType[]) => {
  return await warehouseAPI
    .patch("/articles/", articles, globalConfig)
    .then((response) => {
      return response.data
    })
}

export default {
  getArticles,
  postArticle,
  getOneArticle,
  patchOneArticle,
  deleteOneArticle,
  patchArticles,
}
