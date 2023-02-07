import Link from 'next/link'
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
        <Link className={styles.wrapper} key={user._id} href="#!">
          <Author
            user={user}
            description={
              <span className={styles.introduce}>{user.introduce}</span>
            }
            usernameStyle={{ fontSize: '1.16rem' }}
            style={{ padding: '1rem' }}
          />
        </Link>
      ))}
    </Card>
  )
}
