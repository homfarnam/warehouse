/* eslint-disable no-async-promise-executor */
import { globalConfig, warehouseAPI } from "./api"
import { ProductsType } from "../types/api.types"

// Get all products
// Lists the entire product collection.
const getProducts = async () => {
  return await warehouseAPI.get("/products/", globalConfig).then((response) => {
    return response.data
  })
}

// Post an product
// Creates a new Product.
const postProduct = async (data: Omit<ProductsType, "id">) => {
  return await warehouseAPI
    .post("/products/", data, globalConfig)
    .then((response) => {
      return response.data
    })
}

// GET /products/:id
// Gets a product by id.
const getOneProduct = async (id: string) => {
  return await warehouseAPI
    .get(`/products/${id}`, globalConfig)
    .then((response) => {
      return response.data
    })
}

// PATCH /products/:id
// Patches a product by id.
const patchOneProduct = async (id: string, data: Omit<ProductsType, "id">) => {
  return await warehouseAPI
    .patch(`/products/${id}`, data, globalConfig)
    .then((response) => {
      return response.data
    })
}

// DELETE /products/:id
// Deletes a product by id.
const deleteOneProduct = async (id: string) => {
  return await warehouseAPI
    .delete(`/products/${id}`, globalConfig)
    .then((response) => {
      return response.data
    })
}

export default {
  getOneProduct,
  getProducts,
  postProduct,
  patchOneProduct,
  deleteOneProduct,
}
