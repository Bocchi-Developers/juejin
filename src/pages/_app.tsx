import '~/assets/styles/main.less'

import type { AppProps } from 'next/app'
import { memo } from 'react'
import type { FC, PropsWithChildren } from 'react'

import { Content } from '~/components/layouts/AppLayout'
import { BasicLayout } from '~/components/layouts/BasicLayout'
import { RootStoreProvider } from '~/context/root-store'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RootStoreProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
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

export default App
