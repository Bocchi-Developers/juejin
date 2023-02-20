import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useContext, useState } from 'react'

import { IconNight, IconSun } from '~/components/universal/Icons/dark-mode'
import { JuejinFont, Logo as JuejinLogo } from '~/components/universal/Logo'
import { InitialContext } from '~/context/initial-data'
import { useMediaToggle } from '~/hooks/use-media-toggle'
import { useStore } from '~/store'
import type { TabModule } from '~/types/api/aggregate'

import styles from './index.module.less'

export const SwitchTheme = () => {
  const { toggle, value } = useMediaToggle()
  return (
    <div onClick={toggle} className={styles.icon}>
      {value ? <IconSun /> : <IconNight />}
    </div>
  )
}

const TabItem: FC<TabModule> = ({ slug, title, tag }) => {
  const router = useRouter()
  return (
    <Link
      className={clsx(
        styles['tab-item'],
        (router.pathname == `/${slug}` || (!slug && router.pathname == '/')) &&
          styles['active'],
        !tag && styles['before-hidden'],
      )}
      data-promote={tag?.slice(0, 5)}
      href={`${slug?.startsWith('http') ? '' : '/'}${slug || ''}`}
      target={slug?.startsWith('http') ? '_blank' : undefined}
      shallow
    >
      {title}
    </Link>
  )
}
const Header = observer(() => {
  const {
    appStore: { isNarrowThanLaptop, viewport },
  } = useStore()
  const [hidden, setHidden] = useState(true)
  const { tab } = useContext(InitialContext)
  const { appStore } = useStore()
  return (
    <header
      className={clsx(styles['main-header'], appStore.isOverNar && 'nav-move')}
    >
      <div className={styles.wrapper}>
        <div className={styles['header-container']}>
          <Link className={styles.logo} href="/">
            <JuejinLogo />
            <div style={{ marginTop: '5px' }}>
              {!viewport.mobile && (
                <JuejinFont
                  fill={appStore.colorMode == 'dark' ? 'white' : 'black'}
                />
              )}
            </div>
          </Link>
          {isNarrowThanLaptop && (
            <div
              className={clsx(
                styles['tab-first'],
                !hidden && styles['tab-first-active'],
              )}
              onClick={() => {
                setHidden((pre) => !pre)
              }}
            >
              {tab[0].title}
            </div>
          )}

          {!(isNarrowThanLaptop ? hidden : false) && (
            <div
              className={clsx(
                styles.tab,
                isNarrowThanLaptop && styles['tab-mobile'],
              )}
            >
              {tab.map((tab) => (
                <TabItem key={tab._id} {...tab} />
              ))}
            </div>
          )}
        </div>
        <SwitchTheme />
      </div>
    </header>
  )
})

export default Header
