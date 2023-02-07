import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import { HomeSidebarContext } from '~/pages'

import styles from './navbar.module.less'

export const Navbar = () => {
  const router = useRouter()
  const homeContext = useContext(HomeSidebarContext)

  return (
    <nav className={styles['view-nav']}>
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
}
