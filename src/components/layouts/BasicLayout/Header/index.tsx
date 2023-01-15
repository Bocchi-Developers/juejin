import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
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
const getTabs = () => {
  return [
    {
      text: '首页',
      promoteText: '',
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
}
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

const Logo = ({ isHideText }: { isHideText?: boolean }) => {
  return (
    <span className={styles.logo}>
      <JuejinLogo />
      <b className={isHideText ? styles.hidden : ' '}>稀土掘金</b>
    </span>
  )
}
const TabItem = (props: TabItemProps) => {
  return (
    <div
      className={clsx(
        styles['tab-item'],
        props.active && styles['active'],
        !props.promoteText && styles['before-hidden'],
      )}
      data-promote={props.promoteText?.slice(0, 5)}
    >
      {props.text}
    </div>
  )
}
const Header = observer(() => {
  const {
    appUIStore: { viewport },
    appStore: { isNarrowThanLaptop },
  } = useStore()
  const [hidden, setHidden] = useState(true)
  const [active, setActive] = useState(false)
  const isMobile = isNarrowThanLaptop
  const isHidden = isNarrowThanLaptop ? hidden : false
  const tabs = getTabs()
  return (
    <header className={styles['main-header']}>
      <div className={styles['header-container']}>
        <Logo isHideText={viewport.mobile} />
        <div
          className={clsx(
            styles['tab-first'],
            !isMobile && styles.hidden,
            active && styles['tab-first-active'],
          )}
          onClick={() => {
            setHidden((pre) => !pre)
            setActive((pre) => !pre)
          }}
        >
          首页
        </div>
        <div
          className={clsx(
            styles.tab,
            isMobile && styles['tab-mobile'],
            isHidden && styles.hidden,
          )}
        >
          {tabs.map((tab) => (
            <TabItem key={tab.text} {...tab} />
          ))}
        </div>
      </div>
    </header>
  )
})

export default Header
