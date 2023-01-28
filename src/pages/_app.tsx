import '@arco-design/web-react/dist/css/arco.css'
import '~/assets/styles/main.css'

import NextApp from 'next/app'
import type { AppProps } from 'next/app'
import { memo, useMemo } from 'react'
import type { FC, PropsWithChildren } from 'react'

import { NoDataErrorView } from '~/components/app/Error/no-data'
import { Content } from '~/components/layouts/AppLayout'
import { BasicLayout } from '~/components/layouts/BasicLayout'
import { InitialContextProvider } from '~/context/initial-data'
import { RootStoreProvider } from '~/context/root-store'
import { AggregateApi } from '~/services/api/aggregate'
import type { IAggregate } from '~/types/api/aggregate'

const App: FC<AppProps & Record<'initData', IAggregate>> = ({
  Component,
  pageProps,
  initData,
}) => {
  const Inner = useMemo(() => {
    // 兜底页
    return initData ? (
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    ) : (
      <NoDataErrorView />
    )
  }, [Component, initData, pageProps])
  return (
    <RootStoreProvider>
      <InitialContextProvider value={initData}>{Inner}</InitialContextProvider>
    </RootStoreProvider>
  )
}

const Wrapper: FC<PropsWithChildren> = memo((props) => {
  return (
    <BasicLayout>
      <Content>{props.children}</Content>
    </BasicLayout>
  )
})

// @ts-ignore
App.getInitialProps = async (props: AppContext) => {
  const ctx = props.ctx

  const data = await AggregateApi.aggregateInfo()

  const appProps = await (async () => {
    try {
      return await NextApp.getInitialProps(props)
    } catch (e) {
      if (!data?.success) {
        throw e
      }
      // 这里捕获，为了走全局无数据页
      if (ctx.res) {
        ctx.res.statusCode = 466
        ctx.res.statusMessage = 'No Data'
      }
      return null
    }
  })()

  return {
    ...appProps,
    initData: data?.data,
  }
}

export default App
