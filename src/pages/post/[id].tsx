import { observer } from 'mobx-react-lite'

import { buildStoreDataLoadableView } from '~/components/app/LoadableView'
import { wrapperNextPage } from '~/components/app/WrapperNextPage'
import { Seo } from '~/components/biz/Seo'
import { PostAuthor } from '~/components/in-page/Post/aside/author'
import { RelatedPost } from '~/components/in-page/Post/aside/related'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'
import { Markdown } from '~/components/universal/Markdown'
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
            publishedTime: post.created.toString(),
            section: post.category.name,
            tags: post.tags ?? [],
          },
        }}
      />
      <ArticleLayout
        style={{ marginTop: '7rem', maxWidth: 1140 }}
        aside={sidebar}
        asideWidth={300}
        padding={32}
      >
        {/* <Article html={post} /> */}
        <article>
          <h1 className="sr-only">{post.title}</h1>
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
  const data = await store.postStore.fetchBySlug(id)
  return data
}

export default wrapperNextPage(PP)
