import { observer } from 'mobx-react-lite'

import { buildStoreDataLoadableView } from '~/components/app/LoadableView'
import { wrapperNextPage } from '~/components/app/WrapperNextPage'
import { Seo } from '~/components/biz/Seo'
import { PostAuthor } from '~/components/in-page/Post/aside/author'
import { RelatedPost } from '~/components/in-page/Post/aside/related'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'
import { Image } from '~/components/universal/Image'
import { Markdown } from '~/components/universal/Markdown'
import { Author } from '~/components/widgets/Author'
import { RequestError } from '~/services/server'
import { store, useStore } from '~/store'
import type { IPostModel } from '~/types/api/post'
import { parseDate } from '~/utils/time'
import { noop } from '~/utils/utils'

const sidebar = [PostAuthor, RelatedPost]

const PostView: PageOnlyProps = observer((props) => {
  const { postStore, appStore } = useStore()
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
          <Author
            user={post.user}
            style={{ margin: '1.5em 0' }}
            description={
              <div>
                <time>{parseDate(post.created, 'YYYY年MM月DD日 HH:mm')}</time>
                <span>&nbsp;&nbsp;·&nbsp;&nbsp;阅读 {post?.read}</span>
              </div>
            }
          />
          {post.cover && (
            <Image
              src={post?.cover}
              alt={'cover'}
              width="100%"
              dark={appStore.colorMode == 'dark'}
            />
          )}

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
  if (data.status && data.status !== 200) {
    throw new RequestError(data.status, data.response)
  }
  return data
}

export default wrapperNextPage(PP)
