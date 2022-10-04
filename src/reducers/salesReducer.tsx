import { SalesType } from "../types/api.types"

export type ReducerStateType = {
  sales: SalesType[]
  loading: boolean
  error?: string | null
}

export const salesInitialState: ReducerStateType = {
  sales: [],
  loading: false,
  error: null,
}

export type ReducerActionType =
  | { type: "request" }
  | { type: "success"; results: SalesType[] }
  | { type: "failure"; error: string }

export type ReducerReturnType = (
  state: ReducerStateType,
  action: ReducerActionType
) => ReducerStateType

const salesReducer = (state = salesInitialState, action: ReducerActionType) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true }
    case "success":
      return { ...state, loading: false, sales: action.results }
    case "failure":
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export { salesReducer }
