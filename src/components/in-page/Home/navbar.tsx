import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { HomeSidebarContext } from '~/pages'
import { useStore } from '~/store'

import styles from './navbar.module.less'

export const Navbar = observer(() => {
  const router = useRouter()
  const homeContext = useContext(HomeSidebarContext)
  const { appStore } = useStore()
  return (
    <nav className={clsx(styles['view-nav'], appStore.isOverNar && 'nav-move')}>
      <div className={styles['nav-list']}>
        {homeContext?.category.map((item) => (
          <Link
            key={item.name}
            className={clsx(
              styles['nav-item'],
              (router.query?.category
                ? router.query?.category == item.slug
                : item.slug == '') && styles.active,
            )}
            href={{
              pathname: '/',
              query: item.slug != '' ? { category: item.slug } : null,
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
})
