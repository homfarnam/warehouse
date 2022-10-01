import { ArticlesType, ProductsType } from "../types/api.types"

export type ReducerStateType = {
  article: ArticlesType
  loading: boolean
  error?: string | null
}

export const articleInitialState: ReducerStateType = {
  article: {
    id: "",
    name: "",
    amountInStock: 0,
  },
  loading: false,
  error: null,
}

export type ReducerActionType =
  | { type: "request" }
  | { type: "success"; results: ArticlesType }
  | { type: "failure"; error: string }

export type ReducerReturnType = (
  state: ReducerStateType,
  action: ReducerActionType
) => ReducerStateType

const articleReducer = (
  state = articleInitialState,
  action: ReducerActionType
) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true }
    case "success":
      return { ...state, loading: false, article: action.results }
    case "failure":
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export { articleReducer }
