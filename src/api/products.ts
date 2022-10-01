import { warehouseAPI } from "./api"
import { ProductsType } from "../types/api.types"

// Get all products
// Lists the entire product collection.

const getProducts = async () => {
  return await warehouseAPI()
    .get("/products/")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log({ error })
      return error
    })
}

// Post an product
// Creates a new Product.

const postProduct = async (data: Omit<ProductsType, "id">) => {
  return await warehouseAPI()
    .post("/products/", data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

// GET /products/:id
// Gets a product by id.

const getOneProduct = async (id: string) => {
  return await warehouseAPI()
    .get(`/products/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

// PATCH /products/:id
// Patches a product by id.

const patchOneProduct = async (id: string, data: Omit<ProductsType, "id">) => {
  return await warehouseAPI()
    .patch(`/products/${id}`, data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

// DELETE /products/:id
// Deletes a product by id.

const deleteOneProduct = async (id: string) => {
  return await warehouseAPI()
    .delete(`/products/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
}

export default {
  getOneProduct,
  getProducts,
  postProduct,
  patchOneProduct,
  deleteOneProduct,
}
