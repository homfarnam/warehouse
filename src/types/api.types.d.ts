interface ArticlesType {
  id: string
  name: string
  amountInStock: number
  amountToSubtract?: number
}

interface ProductsType {
  id: string
  name: string
  articles: ArticlesType[]
}

interface SalesType {
  id: string
  createdAt: string
  productId: string
  amountSold: number
}

interface WareHouseDataTypes {
  products: ProductsType[]
  articles: ArticlesType[]
  sales: SalesType[]
}

export type { ArticlesType, ProductsType, SalesType, WareHouseDataTypes }
