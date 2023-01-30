import type { AxiosError } from 'axios'

export type ApiResponse<T> = Promise<T>
export type AxiosErrorConfig = AxiosError<{
  code: number
  success: boolean
  message: string
}>
