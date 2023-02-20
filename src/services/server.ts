import type { AxiosError, AxiosResponse } from 'axios'
import axios, { CanceledError } from 'axios'
import message from 'react-message-popup'

import { API_URL } from '~/constants/env'
import type { ApiResponse } from '~/types/api'
import { isClientSide } from '~/utils/env'

import { handleConfigureAuth } from './tools'

axios.interceptors.request.use((config) => {
  config.baseURL = API_URL
  config = handleConfigureAuth(config)
  return config
})

axios.interceptors.response.use(
  undefined,
  (error: AxiosError<Record<string, any> | undefined>) => {
    if (error instanceof CanceledError) {
      return Promise.reject(error)
    }

    if (process.env.NODE_ENV === 'development') {
      console.error(error.message)
    }
    if (
      !error.response ||
      error.response.status === 408 ||
      error.code === 'ECONNABORTED'
    ) {
      if (isClientSide()) {
        message.error('请求超时，请检查一下网络哦！')
      } else {
        const msg = '上游服务器请求超时'
        message.error(msg)
        console.error(msg, error.message)
      }
    }
    const response = error.response
    if (response) {
      const data = response.data

      // eslint-disable-next-line no-empty
      if (response.status == 401) {
      } else if (data && data.message) {
        message.error(
          typeof data.message == 'string'
            ? data.message
            : Array.isArray(data.message)
            ? data.message[0]
            : '请求错误',
        )
      }
    }
    const status = response ? response.status : 408

    return Promise.reject(new RequestError(status, response))
  },
)

export class RequestError extends Error {
  response: AxiosError['response']
  status: number
  constructor(status: number, response: AxiosResponse | undefined) {
    const message = response
      ? response.data?.message || 'Unknown Error'
      : 'Request timeout'
    super(message)
    this.status = status
    this.response = response
  }
}

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
