import type { NextPage } from 'next'
import { createContext } from 'react'

import { Advertisement } from '~/components/in-page/Home/aside/advertisement'
import { AppDownload } from '~/components/in-page/Home/aside/appDownLoad'
import { AuthorRecommend } from '~/components/in-page/Home/aside/author'
import { List } from '~/components/in-page/Home/list'
import { Navbar } from '~/components/in-page/Home/navbar'
import { ArticleLayout } from '~/components/layouts/ArticleLayout'
import { AggregateApi } from '~/services/api/aggregate'
import type { IAggregateHome } from '~/types/api/aggregate'

const sidebar = [Advertisement, AppDownload, AuthorRecommend]

const Home: NextPage<IAggregateHome> = (props) => {
  return (
    <HomeSidebarContext.Provider value={props}>
      <Navbar />
      <ArticleLayout aside={sidebar} asideWidth={240}>
        <List />
      </ArticleLayout>
    </HomeSidebarContext.Provider>
  )
}

Home.getInitialProps = async () => {
  const aggregate = await AggregateApi.aggregateHomeRequest(3)
  return aggregate
}

export const HomeSidebarContext = createContext<IAggregateHome | null>(null)

export default Home
