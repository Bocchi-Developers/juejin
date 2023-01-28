import axios from 'axios'

import { API_URL } from '~/constants/env'
import type { ApiResponse, AxiosErrorConfig } from '~/types/api'

import { handleConfigureAuth, handleNetworkError } from './tools'

axios.interceptors.request.use((config) => {
  config.baseURL = API_URL
  config = handleConfigureAuth(config)
  return config
})

axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data)
    return response
  },
  (err: AxiosErrorConfig) => {
    handleNetworkError(err.response?.data.success, err.response?.data.message)
    Promise.reject(err.response)
  },
)

export const Get = <T>(url: string, params?: {}): ApiResponse<T> =>
  new Promise((resolve) => {
    axios
      .get(url, { params })
      .then((result) => {
        resolve(result ? result.data : result)
      })
      .catch((err) => {
        resolve(err)
      })
  })

export const Post = <T>(
  url: string,
  data: unknown,
  params?: {},
): ApiResponse<T> => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params })
      .then((result) => {
        resolve(result ? result.data : result)
      })
      .catch((err) => {
        resolve(err)
      })
  })
}

export const Patch = <T>(
  url: string,
  data: unknown,
  params?: {},
): ApiResponse<T> => {
  return new Promise((resolve) => {
    axios
      .patch(url, data, { params })
      .then((result) => {
        resolve(result ? result.data : result)
      })
      .catch((err) => {
        resolve(err)
      })
  })
}
