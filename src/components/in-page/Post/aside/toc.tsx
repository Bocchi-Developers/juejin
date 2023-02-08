import dynamic from 'next/dynamic'
import type { FC } from 'react'

import { Card } from '../../../universal/Card'
import type { TocProps } from '../../../universal/Toc'

const Toc = dynamic(
  () => import('~/components/universal/Toc').then((m) => m.Toc),
  {
    ssr: false,
  },
)

export const MarkdownToc: FC<TocProps> = (props) => {
  return (
    <Card
      title="目录"
      style={{
        position: 'sticky',
        top: 15,
      }}
    >
      <Toc {...props} />
    </Card>
  )
}
