import { observer } from 'mobx-react-lite'

import { useStore } from '~/store'

import { Advertisement } from './advertisement'
import { AuthorRecommend } from './author'
import styles from './index.module.less'

export const Content = observer(() => {
  const { appStore } = useStore()
  return (
    <div className={styles.content}>
      <List />
      {!appStore.isNarrowThanLaptop && <Sidebar />}
    </div>
  )
})

const List = () => {
  return <div className={styles['card-list']}>list</div>
}

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Advertisement />
      <AuthorRecommend />
    </aside>
  )
}
