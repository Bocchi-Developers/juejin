import { Button } from '@arco-design/web-react'

import { useMediaToggle } from '~/hooks/use-media-toggle'

import styles from './index.module.less'

const Header = () => {
  const { toggle, value } = useMediaToggle()
  console.log(value)
  return (
    <header className={styles['main-header']}>
      <span>{`当前: ${value ? '夜间模式' : '白天模式'}`}</span>
      <Button onClick={toggle} type="primary">
        切换
      </Button>
    </header>
  )
}

export default Header
