import type { NextPage } from 'next'

import { Advertisement } from '~/components/in-page/Home/aside/advertisement'
import { AuthorRecommend } from '~/components/in-page/Home/aside/author'
import { List } from '~/components/in-page/Home/list'
import { Navbar } from '~/components/in-page/Home/navbar'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'

const sidebar = [Advertisement, AuthorRecommend]

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <ArticleLayout aside={sidebar} asideWidth={240}>
        <List />
      </ArticleLayout>
    </>
  )
}

export default Home
