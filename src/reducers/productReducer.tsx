import { ProductsType } from "../types/api.types"

export type ReducerStateType = {
  products: ProductsType[] | []
  loading: boolean
  error?: string | null
}

export const productsInitialState: ReducerStateType = {
  products: [],
  loading: false,
  error: null,
}

export type ReducerActionType =
  | { type: "request" }
  | { type: "success"; results: ProductsType[] }
  | { type: "failure"; error: string }

export type ReducerReturnType = (
  state: ReducerStateType,
  action: ReducerActionType
) => ReducerStateType

const productReducer = (
  state = productsInitialState,
  action: ReducerActionType
) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true }
    case "success":
      return { ...state, loading: false, products: action.results }
    case "failure":
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export { productReducer }
