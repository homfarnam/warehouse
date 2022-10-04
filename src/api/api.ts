import axios, { AxiosRequestConfig } from "axios"

const warehouseAPI = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

const CancelToken = axios.CancelToken

type configType = AxiosRequestConfig & {
  retry: number
  retryDelay: number
}

const globalConfig: configType = {
  retry: 4,
  retryDelay: 1000,
}

warehouseAPI.interceptors.response.use(undefined, (err) => {
  const { config } = err

  if (!config || !config.retry) {
    return Promise.reject(err)
  }

  config.retry -= 1
  const delayRetryRequest = new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("retry the request", config.url)
      resolve()
    }, config.retryDelay || 1000)
  })
  return delayRetryRequest.then(() => warehouseAPI(config))
})

export { warehouseAPI, CancelToken, globalConfig }
