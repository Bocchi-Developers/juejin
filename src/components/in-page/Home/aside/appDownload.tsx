import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { SidebarContext } from '~/components/layouts/ArticleLayout'

import styles from './appDownload.module.less'

export const AppDownload = () => {
  const sidebarContex = useContext(SidebarContext)

  return (
    <Link
      href="https://juejin.cn/app"
      target="_blank"
      className={clsx(
        sidebarContex?.asideLeave ? 'sidebar-opacity' : '',
        sidebarContex?.leaveShow ? 'sidebar-show' : '',
      )}
      style={{ top: '282px' }}
    >
      <div className={styles.app}>
        <Image
          src="https://y.suemor.com/imageshome.59780ae.png"
          width={50}
          height={50}
          alt="app"
          priority
        />

        <div>
          <p>下载稀土掘金APP</p>
          <p>一个帮助开发者成长的社区</p>
        </div>
      </div>
    </Link>
  )
}
