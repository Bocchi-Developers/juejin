import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useContext, useState } from 'react'

import { IconNight, IconSun } from '~/components/universal/Icons/dark-mode'
import { Logo as JuejinLogo } from '~/components/universal/Logo'
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
      href={''}
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
  return (
    <header className={styles['main-header']}>
      <div className={styles.wrapper}>
        <div className={styles['header-container']}>
          <Link className={styles.logo} href="/">
            <JuejinLogo />
            {!viewport.mobile && <span>稀土掘金</span>}
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
