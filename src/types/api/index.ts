import type { AxiosError } from 'axios'

export type ApiResponse<T> = Promise<AxiosSuccess<T> | undefined>
export type AxiosErrorConfig = AxiosError<{
  code: number
  success: boolean
  message: string
}>

export type AxiosSuccess<T> = {
  code: number
  success: boolean
  data: T
}
