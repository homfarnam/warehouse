import { warehouseAPI } from "./api"
import { ArticlesType } from "../types/api.types"

// Get all articles
// Lists the entire article collection.

const getArticles = async () => {
  return await warehouseAPI()
    .get("/articles/")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

// Post an article
// Creates a new article.

const postArticle = async ({
  name,
  amountInStock,
}: Omit<ArticlesType, "id">) => {
  return await warehouseAPI()
    .post("/articles/", {
      name,
      amountInStock,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)

      throw error
    })
}

// GET /articles/:id
// Gets an article by id.

const getOneArticle = async (id: string) => {
  return await warehouseAPI()
    .get(`/articles/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

// PATCH /articles/:id
// Patches an article by id.

const patchOneArticle = async (
  id: string,
  { name, amountInStock }: Omit<ArticlesType, "id">
) => {
  return await warehouseAPI()
    .patch(`/articles/${id}`, {
      name,
      amountInStock,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

// DELETE /articles/:id
// Deletes an article by id.

const deleteOneArticle = async (id: string) => {
  return await warehouseAPI()
    .delete(`/articles/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

// PATCH /articles/
//  Bulk patch multiple articles at once.

const patchArticles = async (articles: ArticlesType[]) => {
  return await warehouseAPI()
    .patch("/articles/", articles)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
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
