import Link from 'next/link'
import { useContext } from 'react'

import { SidebarContext } from '~/components/layouts/ArticleLayout'
import { Card } from '~/components/universal/Card'
import { useStore } from '~/store'

import style from './related.module.less'

export const RelatedPost = () => {
  const { postStore } = useStore()
  const sideBarContext = useContext(SidebarContext)
  const post = sideBarContext?.postId && postStore.get(sideBarContext.postId)
  if (!post) {
    return <div>render error</div>
  }

  return (
    <Card title={'相关文章'}>
      <div className={style.list}>
        {post.related.map(({ title, _id }) => (
          <Link key={_id} href={_id} target="_blank">
            {title}
          </Link>
        ))}
      </div>
    </Card>
  )
}
