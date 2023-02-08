import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { SidebarContext } from '~/components/layouts/ArticleLayout'
import { HomeSidebarContext } from '~/pages'

import styles from './advertisement.module.less'

export const Advertisement = () => {
  const homeContext = useContext(HomeSidebarContext)
  const sidebarContex = useContext(SidebarContext)

  if (!homeContext?.ad.phoUrl) return null
  return (
    <Link
      href={homeContext.ad?.adHref || ''}
      target="_blank"
      className={clsx(
        sidebarContex?.asideLeave ? 'sidebar-opacity' : '',
        sidebarContex?.leaveShow ? 'sidebar-show' : '',
      )}
    >
      <div className={styles.ad}>
        <Image
          src={homeContext?.ad.phoUrl}
          width="240"
          height="200"
          alt="Advertisement"
          priority
        />

        <div onClick={() => window.open(homeContext.ad.putAdHref, '_ blank')}>
          <span>投放</span>
          <span>广告</span>
        </div>
      </div>
    </Link>
  )
}
