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
