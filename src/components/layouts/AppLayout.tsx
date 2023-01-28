import { observer } from 'mobx-react-lite'
import { NextSeo } from 'next-seo'
import type { FC, PropsWithChildren } from 'react'
import { useContext, useEffect } from 'react'

import { InitialContext } from '~/context/initial-data'
import { useCheckOldBrowser } from '~/hooks/use-check-old-browser'
import { printToConsole } from '~/utils/console'

import { DynamicHeadMeta } from '../biz/Meta/head'

export const Content: FC<PropsWithChildren> = observer((props) => {
  const { check: checkBrowser } = useCheckOldBrowser()
  const { seo } = useContext(InitialContext)
  useEffect(() => {
    checkBrowser()
    printToConsole()
  }, [])

  return (
    <>
      <DynamicHeadMeta />
      <NextSeo title={`${seo.title}`} description={seo.description} />
      <div id="next">{props.children}</div>
    </>
  )
})
