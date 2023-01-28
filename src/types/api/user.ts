export interface LoginReponseType {
  username: string
  token: string
  expiresIn: number
}

export interface LoginRequestType {
  username: string
  password: string
}

export interface UserModel {
  _id: string
  username: string
  avatar: string
  introduce: string
  socialIds: SocialIds
}

interface SocialIds {
  bilibili: string
  twitter: string
  qq: string
  github: string
}

export interface UserForm {
  username: string
  password: string
  confirmPassword: string
}

export interface UserFormDetail {
  avatar?: string
  mail?: string
  introduce?: string
}
