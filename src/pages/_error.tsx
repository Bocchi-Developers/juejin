// import type { AxiosError } from 'axios'
import isNumber from 'lodash-es/isNumber'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'

import { ErrorView, errorToText } from '~/components/app/Error'
import { useIsClient } from '~/hooks/use-is-client'
import { RequestError } from '~/services/server'

const ErrorPage: NextPage<{ statusCode: number; err: any }> = ({
  statusCode = 500,
  err,
}) => {
  useEffect(() => {
    // if (err) {
    //   const errMessage = err._message || err.message
    // if (errMessage) {
    //   message.error(errMessage)
    // }
    // }
  }, [err, statusCode])

  const isClient = useIsClient()
  const parseCodeInTitle = 'document' in globalThis && parseInt(document.title)
  const isValidStatusCode = isNumber(parseCodeInTitle) && statusCode >= 400
  // FIXME error page hydrate error, cause error data not equal to server side.
  return isClient ? (
    <ErrorView
      showBackButton
      showRefreshButton
      statusCode={isValidStatusCode ? isNumber(parseCodeInTitle) : statusCode}
    />
  ) : (
    <NextSeo title={`${statusCode.toString()} - ${errorToText(statusCode)}`} />
  )
}

const getCode = (err, res): number => {
  if (!err && !res) {
    return 500
  }
  if (err instanceof RequestError) {
    // @see:  https://github.com/axios/axios/pull/3645

    return isNumber(err.response?.status) ? isNumber(err.response?.status) : 408
  }
  if (res?.statusCode === 500 && err?.statusCode === 500) {
    return 500
  } else if (res && res.statusCode !== 500) {
    return res.statusCode || 500
  } else if (err && err.statusCode !== 500) {
    return err.statusCode || 500
  }
  return 500
}

ErrorPage.getInitialProps = async ({ res, err }: any) => {
  const statusCode = +getCode(err, res) || 500
  res && (res.statusCode = statusCode)
  if (statusCode === 404) {
    return { statusCode: 404, err }
  }
  const serializeErr: any = (() => {
    try {
      return JSON.parse(JSON.stringify(err))
    } catch (e: any) {
      return err
    }
  })()
  serializeErr['_message'] =
    (err as any)?.raw?.response?.data?.message ||
    err.message ||
    err.response?.data?.message

  return { statusCode, err: serializeErr } as {
    statusCode: number
    err: any
  }
}

export default ErrorPage
