import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useState } from 'react'

import { SEO } from '~/components/biz/Seo'
import { HomeSidebarContext } from '~/pages'
import { useStore } from '~/store'

import styles from './navbar.module.less'

export const Navbar = observer(() => {
  const router = useRouter()
  const [showCategoryTitle, setShowCategoryTitle] = useState(false)
  const homeContext = useContext(HomeSidebarContext)
  const { appStore } = useStore()
  const [fisrtLoad, setFristLoad] = useState(true)
  const title = useMemo(
    () =>
      homeContext?.category.find((item) => item.slug == router.query.category)
        ?.name || (homeContext?.category[0].name as string),
    [router.query.category],
  )

  useEffect(() => {
    setShowCategoryTitle(!!router.query.category)
  }, [router.query.category])
  return (
    <>
      <SEO title={showCategoryTitle ? title : ''} />

      <nav
        className={clsx(styles['view-nav'], appStore.isOverNar && 'nav-move')}
      >
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
              shallow
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
})
