import { Article } from '~/components/in-page/Post'
import { Author } from '~/components/in-page/Post/author'
import { Catalog } from '~/components/in-page/Post/catalog'
import { RelatedPost } from '~/components/in-page/Post/related'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'

const sidebar = [Author, RelatedPost, Catalog]

const Post = () => {
  return (
    <ArticleLayout
      style={{ marginTop: '7rem' }}
      aside={sidebar}
      asideWidth={300}
    >
      <Article />
    </ArticleLayout>
  )
}

export default Post
