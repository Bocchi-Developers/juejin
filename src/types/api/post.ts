export interface IPaginate {
  pageCurrent: number
  pageSize: number
}

export interface IPostListParam extends IPaginate {
  categoryId?: string
  tag?: string
}

export interface IPostListResponse {
  postList: IPostList[]
  totalCount: number
  totalPages: number
}

export interface IPostList {
  _id: string
  title: string
  tags: string[]
  category: Category
  user: User
  cover?: string
  created: Date
  content: string
  ad: boolean
}

interface Category {
  _id: string
  name: string
  slug: string
  created: Date
}

interface User {
  _id: string
  username: string
  admin: boolean
  created: Date
  avatar: string
  introduce: string
}
