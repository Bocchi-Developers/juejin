import { observer } from 'mobx-react-lite'
import { NextSeo } from 'next-seo'
import type { FC, PropsWithChildren } from 'react'
import { useContext, useEffect } from 'react'

import { InitialContext } from '~/context/initial-data'
import { useCheckOldBrowser } from '~/hooks/use-check-old-browser'
import { useResizeScrollEvent } from '~/hooks/use-resize-scroll-event'
import { printToConsole } from '~/utils/console'
import { isDev } from '~/utils/env'

import { DynamicHeadMeta } from '../biz/Meta/head'

export const Content: FC<PropsWithChildren> = observer((props) => {
  const { check: checkBrowser } = useCheckOldBrowser()
  const { seo } = useContext(InitialContext)
  useResizeScrollEvent()
  useEffect(() => {
    checkBrowser()
    printToConsole()
  }, [])

  return (
    <>
      <DynamicHeadMeta />
      <NextSeo
        title={`${seo.title}${
          isDev ? '-> 开发测试版本！！！！！！！！！' : ''
        }`}
        description={seo.description}
      />
      <div id="next">{props.children}</div>
    </>
  )
})
