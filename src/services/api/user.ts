import type { ApiResponse } from '../../types/api'
import type {
  LoginReponseType,
  LoginRequestType,
  UserForm,
  UserFormDetail,
  UserModel,
} from '../../types/api/user'
import { Get, Patch, Post } from '../server'

function userInfoRequest<T = UserModel>(): ApiResponse<T> {
  return Get<T>('/user')
}

function loginRequest<T = LoginReponseType>(
  user: LoginRequestType,
): ApiResponse<T> {
  return Post<T>('/user/login', user)
}

function authToken<T>(): ApiResponse<T> {
  return Get<T>('/user/check_logged')
}

function registerRequest<T>(
  user: Omit<UserForm, 'confirmPassword'>,
): ApiResponse<T> {
  return Post<T>('/user/register', user)
}

function updateDetailRequest<T>(user: UserFormDetail): ApiResponse<T> {
  return Patch<T>('/user', user)
}

export const userApi = {
  userInfoRequest,
  loginRequest,
  authToken,
  registerRequest,
  updateDetailRequest,
}
