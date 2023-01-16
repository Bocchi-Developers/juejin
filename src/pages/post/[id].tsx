import { Article } from '~/components/in-page/Post'
import { PostAuthor } from '~/components/in-page/Post/aside/author'
import { Catalog } from '~/components/in-page/Post/aside/catalog'
import { RelatedPost } from '~/components/in-page/Post/aside/related'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'

const sidebar = [PostAuthor, RelatedPost, Catalog]

const Post = () => {
  return (
    <ArticleLayout
      style={{ marginTop: '7rem', maxWidth: 1120 }}
      aside={sidebar}
      asideWidth={300}
    >
      <Article />
    </ArticleLayout>
  )
}

export default Post
