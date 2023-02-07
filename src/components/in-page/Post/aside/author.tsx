import { useContext } from 'react'

import { SidebarContext } from '~/components/layouts/ArticleLayout'
import { Card } from '~/components/universal/Card'
import { Author } from '~/components/widgets/Author'
import { useStore } from '~/store'

import styles from './author.module.less'

export const PostAuthor = () => {
  const { postStore } = useStore()
  const sideBarContext = useContext(SidebarContext)
  const post = sideBarContext?.postId && postStore.get(sideBarContext.postId)
  if (!post) {
    return <div>render error</div>
  }
  return (
    <Card>
      <Author
        user={post.user}
        description={
          <span className={styles.introduce}>{post?.user.introduce}</span>
        }
      />
    </Card>
  )
}
