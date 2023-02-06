import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import type { FC, HTMLAttributes } from 'react'
import { useContext } from 'react'

import { Avatar } from '@arco-design/web-react'

import { SidebarContext } from '~/components/layouts/ArticleLayout'
import { useStore } from '~/store'
import { parseDate } from '~/utils/time'

import styles from './index.module.less'

interface IAuthorProps extends HTMLAttributes<HTMLDivElement> {
  inPost?: boolean
}

export const Author: FC<IAuthorProps> = observer((props) => {
  const { postStore } = useStore()
  const sideBarContext = useContext(SidebarContext)
  const post = sideBarContext && postStore.get(sideBarContext.postId)
  if (!post) {
    return <div>render error</div>
  }
  return (
    <div
      className={styles.author}
      style={props.inPost ? { margin: '1.5em 0' } : undefined}
    >
      <Link href="#!">
        <Avatar size={46}>
          <img alt="avatar" src={post?.user.avatar} />
        </Avatar>
      </Link>
      <div className={styles['author-info']}>
        <Link href={'#!'}>{post?.user.username}</Link>
        {props.inPost ? (
          <div>
            <time>{parseDate(post.created, 'YYYY年MM月DD日 HH:mm')}</time>
            <span>&nbsp;&nbsp;·&nbsp;&nbsp;阅读 {post?.read}</span>
          </div>
        ) : (
          <span className={styles.introduce}>{post?.user.introduce}</span>
        )}
      </div>
    </div>
  )
})
