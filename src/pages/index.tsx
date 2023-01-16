import { Advertisement } from '~/components/in-page/Home/advertisement'
import { AuthorRecommend } from '~/components/in-page/Home/author'
import { List } from '~/components/in-page/Home/list'
import { Navbar } from '~/components/in-page/Home/navbar'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'

const sidebar = [Advertisement, AuthorRecommend]

export default function Home() {
  return (
    <>
      <Navbar />
      <ArticleLayout aside={sidebar} asideWidth={240}>
        <List />
      </ArticleLayout>
    </>
  )
}
