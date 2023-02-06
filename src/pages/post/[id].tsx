import { observer } from 'mobx-react-lite'

import { Image } from '@arco-design/web-react'

import { buildStoreDataLoadableView } from '~/components/app/LoadableView'
import { wrapperNextPage } from '~/components/app/WrapperNextPage'
import { Seo } from '~/components/biz/Seo'
import { PostAuthor } from '~/components/in-page/Post/aside/author'
import { RelatedPost } from '~/components/in-page/Post/aside/related'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'
import { Markdown } from '~/components/universal/Markdown'
import { Author } from '~/components/widgets/Author'
import { RequestError } from '~/services/server'
import { store, useStore } from '~/store'
import type { IPostModel } from '~/types/api/post'
import { noop } from '~/utils/utils'

const sidebar = [PostAuthor, RelatedPost]

const PostView: PageOnlyProps = observer((props) => {
  const { postStore } = useStore()
  const post: IPostModel = postStore.get(props.id) || noop
  return (
    <>
      <Seo
        title={post.title}
        description={post.title}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: post?.created?.toString(),
            section: post.category?.name,
            tags: post.tags ?? [],
          },
        }}
      />
      <ArticleLayout
        style={{ marginTop: '7rem', maxWidth: 1140 }}
        asideWidth={300}
        padding={32}
        aside={sidebar}
        postId={props.id}
      >
        <article>
          <h1 className="sr-only" style={{ fontSize: '2.66rem' }}>
            {post.title}
          </h1>
          <Author inPost {...props} />
          {post.cover && <Image src={post?.cover} alt={'cover'} width="100%" />}

          <Markdown codeBlockFully value={post.content} toc />
        </article>
      </ArticleLayout>
    </>
  )
})

const PP = buildStoreDataLoadableView(store.postStore, PostView)

PP.getInitialProps = async (ctx) => {
  const { query } = ctx
  const { id } = query as any
  // FIXME: 韭菜写法
  const data = (await store.postStore.fetchBySlug(id)) as any
  console.log('data', data)
  if (data.status && data.status !== 200) {
    throw new RequestError(data.status, data.response)
  }
  return data
}

export default wrapperNextPage(PP)
