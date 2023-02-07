import Link from 'next/link'
import { useContext } from 'react'

import { Image } from '@arco-design/web-react'

import { HomeSidebarContext } from '~/pages'

export const Advertisement = () => {
  const homeContext = useContext(HomeSidebarContext)
  if (!homeContext?.ad.phoUrl) return null
  return (
    <Link href="#!">
      <Image src={homeContext?.ad.phoUrl} width="100%" preview={false} />
    </Link>
  )
}
