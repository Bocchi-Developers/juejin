import { observer } from 'mobx-react-lite'
import type { FC, PropsWithChildren } from 'react'
import React, { useEffect } from 'react'

import { store } from '~/store'

import Footer from './Footer'
import Header from './Header'

export const BasicLayout: FC<PropsWithChildren> = observer(({ children }) => {
  useEffect(() => {
    store.appUIStore.updateViewport()
    window.onresize = () => {
      store.appUIStore.updateViewport()
    }
  }, [])
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
})
