import dynamic from 'next/dynamic'
import type { FC } from 'react'

import { Card } from '../Card'
import type { TocProps } from '../Toc'

const Toc = dynamic(
  () => import('~/components/universal/Toc').then((m) => m.Toc),
  {
    ssr: false,
  },
)

export const MarkdownToc: FC<TocProps> = (props) => {
  return (
    <Card>
      <Toc {...props} />
    </Card>
  )
}
