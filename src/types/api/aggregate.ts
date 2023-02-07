export interface IAggregate {
  user: User
  seo: Seo
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

export interface IAggregateHome {
  category: Category[]
  ad: Ad
  authorRank: AuthorRank[]
}

interface AuthorRank {
  _id: string
  username: string
  avatar?: string
  introduce?: string
}

interface Ad {
  _id: string
  phoUrl: string
  created: string
}

interface Category {
  _id: string
  name: string
  slug: string
  created: string
}
