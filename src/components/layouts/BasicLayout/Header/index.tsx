import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import React, { useState } from 'react'

import { Button } from '@arco-design/web-react'

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

const Logo = ({
  isHideText,
}: {
  /**
   * logo文字是否隐藏
   */
  isHideText?: boolean
}) => {
  return (
    <span className={styles.logo}>
      <Image src={'/juejin.svg'} width={36} height={28} alt={'juejin_logo'} />
      <b className={isHideText ? styles.hidden : ' '}>稀土掘金</b>
    </span>
  )
}
const TabItem = (props: TabItemProps) => {
  return (
    <div
      className={
        `${styles['tab-item']} ` +
        `${props.active ? styles.active : ' '} ${
          !props.promoteText ? styles['before-hidden'] : ' '
        }`
      }
      data-promote={props.promoteText?.slice(0, 5)}
    >
      {props.text}
    </div>
  )
}
const Tab = ({
  children,
  hidden,
  isMobile,
  setHidden,
}: {
  children: React.ReactNode
  hidden?: boolean
  isMobile?: boolean
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [active, setActive] = useState(false)
  return (
    <>
      <div
        className={`${styles['tab-first']} ${isMobile ? ' ' : styles.hidden} ${
          active ? styles['tab-first-active'] : ' '
        }`}
        onClick={() => {
          setHidden((pre) => !pre)
          setActive((pre) => !pre)
        }}
      >
        首页
      </div>
      <div
        className={`${styles.tab} ${isMobile ? styles['tab-mobile'] : ' '} ${
          hidden ? styles.hidden : ' '
        }`}
      >
        {children}
      </div>
    </>
  )
}
const Header = observer(() => {
  const {
    appUIStore: { viewport },
  } = useStore()
  const [hidden, setHidden] = useState(true)
  const tabs = getTabs()
  return (
    <header className={styles['main-header']}>
      <div className={styles['header-container']}>
        <Logo isHideText={viewport.mobile} />
        <Tab
          setHidden={setHidden}
          isMobile={viewport.mobile || viewport.pad}
          hidden={viewport.mobile || viewport.pad ? hidden : false}
        >
          {tabs.map((tab) => (
            <TabItem
              text={tab.text}
              key={tab.text}
              promoteText={tab.promoteText}
            />
          ))}
        </Tab>
      </div>
    </header>
  )
})

export default Header
