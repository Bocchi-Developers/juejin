import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import { useState } from 'react'

import { Button } from '@arco-design/web-react'

import { Logo as JuejinLogo } from '~/components/universal/Logo'
import { useMediaToggle } from '~/hooks/use-media-toggle'
import { useStore } from '~/store'

import styles from './index.module.less'

interface TabItemProps {
  text: string
  active?: boolean
  promoteText?: string
}
const Tabs = [
  {
    text: '首页',
    promoteText: '',
    path: '/',
  },
  {
    text: '沸点',
    promoteText: '',
  },
  {
    text: '直播',
    promoteText: '',
  },
  {
    text: '课程',
    promoteText: '小册上新',
  },
  {
    text: '活动',
    promoteText: '',
  },
  {
    text: 'app',
    promoteText: '邀请有利',
  },
]
const SwitchTheme = () => {
  const { toggle, value } = useMediaToggle()
  return (
    <>
      <span>{`当前: ${value ? '夜间模式' : '白天模式'}`}</span>
      <Button onClick={toggle} type="primary">
        切换
      </Button>
    </>
  )
}

const TabItem: FC<TabItemProps> = (props) => {
  return (
    <Link
      className={clsx(
        styles['tab-item'],
        props.active && styles['active'],
        !props.promoteText && styles['before-hidden'],
      )}
      data-promote={props.promoteText?.slice(0, 5)}
      href="/"
    >
      {props.text}
    </Link>
  )
}
const Header = observer(() => {
  const {
    appStore: { isNarrowThanLaptop, viewport },
  } = useStore()
  const [hidden, setHidden] = useState(true)

  const router = useRouter()
  return (
    <header className={styles['main-header']}>
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
            首页
          </div>
        )}

        {!(isNarrowThanLaptop ? hidden : false) && (
          <div
            className={clsx(
              styles.tab,
              isNarrowThanLaptop && styles['tab-mobile'],
            )}
          >
            {Tabs.map((tab) => (
              <TabItem
                key={tab.text}
                active={router.pathname == tab.path}
                {...tab}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  )
})

export default Header
