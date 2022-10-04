import { globalConfig, warehouseAPI } from "./api"
import { SalesType } from "../types/api.types"

// GET all sales
// Lists the entire sale collection.

const getSales = async () => {
  return await warehouseAPI.get("/sales/", globalConfig).then((response) => {
    return response.data
  })
}

interface postSaleType {
  data: Omit<SalesType, "id" | "createdAt">
}

// Post a sale
// Creates a new sale.
const postSale = async (data: postSaleType): Promise<SalesType> => {
  return await warehouseAPI
    .post("/sales/", data, globalConfig)
    .then((response) => {
      return response.data
    })
}

// GET /sales/:id
// Gets a sale by id.
const getOneSale = async (id: string) => {
  return await warehouseAPI
    .get(`/sales/${id}`, globalConfig)
    .then((response) => {
      return response.data
    })
}

// PATCH /sales/:id
// Patches a sale by id.
const patchOneSale = async (id: string, data: SalesType["amountSold"]) => {
  return await warehouseAPI
    .patch(`/articles/${id}`, { amountSold: data }, globalConfig)
    .then((response) => {
      return response.data
    })
}

// DELETE /sales/:id
// Deletes a sale by id.
const deleteOneSale = async (id: string) => {
  return await warehouseAPI
    .delete(`/sales/${id}`, globalConfig)
    .then((response) => {
      return response.data
    })
}

export default {
  getSales,
  postSale,
  getOneSale,
  patchOneSale,
  deleteOneSale,
}
