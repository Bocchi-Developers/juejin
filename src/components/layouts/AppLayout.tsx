import { observer } from 'mobx-react-lite'
import { NextSeo } from 'next-seo'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'

import { useCheckOldBrowser } from '~/hooks/use-check-old-browser'
import { printToConsole } from '~/utils/console'

export const Content: FC<PropsWithChildren> = observer((props) => {
  const { check: checkBrowser } = useCheckOldBrowser()

  useEffect(() => {
    checkBrowser()
    printToConsole()
  }, [])

  return (
    <>
      <NextSeo
        title={`稀土掘金`}
        description={
          '掘金是面向全球中文开发者的技术内容分享与交流平台。我们通过技术文章、沸点、课程、直播等产品和服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。'
        }
      />

      <div id="next">{props.children}</div>
    </>
  )
})
