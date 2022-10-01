import { warehouseAPI } from "./api"
import { SalesType } from "../types/api.types"

// GET all sales
// Lists the entire sale collection.

const getSales = async () => {
  return await warehouseAPI()
    .get("/sales/")
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

// Post a sale
// Creates a new sale.

const postSale = async (data: Omit<SalesType, "id" | "createdAt">) => {
  return await warehouseAPI()
    .post("/sales/", data)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)

      throw error
    })
}

// GET /sales/:id
// Gets a sale by id.

const getOneSale = async (id: string) => {
  return await warehouseAPI()
    .get(`/sales/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

// PATCH /sales/:id
// Patches a sale by id.

const patchOneSale = async (id: string, data: SalesType["amountSold"]) => {
  return await warehouseAPI()
    .patch(`/articles/${id}`, { amountSold: data })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

// DELETE /sales/:id
// Deletes a sale by id.

const deleteOneSale = async (id: string) => {
  return await warehouseAPI()
    .delete(`/sales/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export default {
  getSales,
  postSale,
  getOneSale,
  patchOneSale,
  deleteOneSale,
}
