export interface IAggregate {
  user: User
  seo: Seo
  tab: TabModule[]
}

interface Seo {
  _id: string
  title: string
  description: string
  keywords: string[]
  created: string
}

interface User {
  _id: string
  username: string
  admin: boolean
  created: string
  avatar: string
  introduce: string
}

export interface TabModule {
  _id: string
  title: string
  created: string
  tag?: string
  slug: string
  updatedAt: string
}

export interface IAggregateHome {
  category: Category[]
  ad: Ad
  authorRank: AuthorRank[]
}

interface AuthorRank {
  _id: string
  username: string
  avatar: string
  introduce: string
}

interface Ad {
  _id: string
  adHref: string
  phoUrl: string
  putAdHref: string
  created: string
}

interface Category {
  _id?: string
  name: string
  slug: string
  created?: string
}
