import { observer } from 'mobx-react-lite'
import type { FC, PropsWithChildren } from 'react'
import React, { useEffect } from 'react'

import { ConfigProvider } from '@arco-design/web-react'

import { store } from '~/store'

import Header from './Header'
import styles from './index.module.less'

export const BasicLayout: FC<PropsWithChildren> = observer(({ children }) => {
  useEffect(() => {
    store.appUIStore.updateViewport()

    window.onresize = () => {
      store.appUIStore.updateViewport()
    }
  }, [])
  return (
    <ConfigProvider>
      <Header />
      <main className={styles.container}>{children}</main>
    </ConfigProvider>
  )
})
