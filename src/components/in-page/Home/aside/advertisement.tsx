import Link from 'next/link'
import { useContext } from 'react'

import { Image } from '@arco-design/web-react'

import { HomeSidebarContext } from '~/pages'

import styles from './advertisement.module.less'

export const Advertisement = () => {
  const homeContext = useContext(HomeSidebarContext)
  if (!homeContext?.ad.phoUrl) return null
  return (
    <Link href={homeContext.ad?.adHref || ''} target="_blank">
      <div className={styles.ad}>
        <Image src={homeContext?.ad.phoUrl} width="100%" preview={false} />
        <div onClick={() => window.open(homeContext.ad.putAdHref, '_ blank')}>
          <span>投放</span>
          <span>广告</span>
        </div>
      </div>
    </Link>
  )
}
