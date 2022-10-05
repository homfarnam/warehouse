import { globalConfig, warehouseAPI } from "./api"
import { SalesType } from "../types/api.types"

// GET all sales
// Lists the entire sale collection.

const getSales = async <T>(): Promise<T> => {
  return await warehouseAPI.get("/sales/", globalConfig).then((response) => {
    return response.data
  })
}

interface postSaleType {
  productId: string
  amountSold: number
}

// Post a sale
// Creates a new sale.
const postSale = async ({
  productId,
  amountSold,
}: postSaleType): Promise<SalesType> => {
  return await warehouseAPI
    .post(
      "/sales/",
      {
        productId,
        amountSold,
      },
      globalConfig
    )
    .then((response) => {
      return response.data
    })
}

// GET /sales/:id
// Gets a sale by id.
const getOneSale = async <T>(id: string): Promise<T> => {
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
