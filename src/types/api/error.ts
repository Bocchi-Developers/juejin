export declare class RequestError extends Error {
  status: number
  path: string
  raw: any
  constructor(message: string, status: number, path: string, raw: any)
}
