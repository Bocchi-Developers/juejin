import type { AxiosError } from 'axios'
import isNumber from 'lodash-es/isNumber'
import type { NextPage } from 'next'
import { wrapperNextPage as wrapper } from 'next-suspense'

import { Spin } from '@arco-design/web-react'

import { RequestError } from '~/types/api/error'

import { ErrorView } from '../Error'

export function wrapperNextPage<T extends {}>(Page: NextPage<T>) {
  return wrapper(Page, {
    LoadingComponent: () => <Spin />,
    ErrorComponent: ({ error }) => {
      let code: any
      if (error instanceof RequestError) {
        // @see:  https://github.com/axios/axios/pull/3645
        const axiosError = error.raw as AxiosError

        code = isNumber(axiosError.response?.status)
          ? axiosError.response!.status
          : 408
      }

      return (
        <ErrorView
          statusCode={code ?? 'Error'}
          description={error?.message || '请求出错了'}
          showRefreshButton
        />
      )
    },
  })
}