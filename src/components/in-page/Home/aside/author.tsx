import { useContext } from 'react'

import styles from '~/components/in-page/Home/aside/author.module.less'
import { Card } from '~/components/universal/Card'
import { Author } from '~/components/widgets/Author'
import { HomeSidebarContext } from '~/pages'

export const AuthorRecommend = () => {
  const homeContext = useContext(HomeSidebarContext)
  return (
    <Card title="🎖️作者榜" bodyStyle={{ padding: 0 }}>
      {homeContext?.authorRank.map((user) => (
        <div
          className={styles.wrapper}
          key={user._id}
          // 这里不使用 Link 组件，因为 Author 里也有 Link，防止发生 hydration
          // https://github.com/vercel/next.js/discussions/35773#discussioncomment-3985369
          onClick={() => window.open('', '_ blank')}
        >
          <Author
            user={user}
            description={
              <span className={styles.introduce}>{user.introduce}</span>
            }
            usernameStyle={{ fontSize: '1.16rem' }}
            style={{ padding: '1rem' }}
          />
        </div>
      ))}
    </Card>
  )
}
