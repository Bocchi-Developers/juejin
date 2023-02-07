import { observer } from 'mobx-react-lite'
import type { FC, PropsWithChildren } from 'react'
import React, { useEffect } from 'react'

import { ConfigProvider } from '@arco-design/web-react'

import { store } from '~/store'
import { springScrollToElement } from '~/utils/spring'

import Header from './Header'

export const BasicLayout: FC<PropsWithChildren> = observer(({ children }) => {
  useEffect(() => {
    store.appUIStore.updateViewport()

    if (location.hash) {
      const id = location.hash.replace(/^#/, '')
      setTimeout(() => {
        const $el = document.getElementById(decodeURIComponent(id))
        $el && springScrollToElement($el, 1000, -window.innerHeight / 2 + 100)
      }, 1050)
    }

    window.onresize = () => {
      store.appUIStore.updateViewport()
    }
  }, [])
  return (
    <ConfigProvider>
      <Header />
      <main>{children}</main>
    </ConfigProvider>
  )
})
