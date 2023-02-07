import type {
  IPostListParam,
  IPostListResponse,
  IPostModel,
} from '~/types/api/post'

import type { ApiResponse } from '../../types/api'
import { Get } from '../server'

function postListRequest(
  param: IPostListParam,
): ApiResponse<IPostListResponse> {
  return Get('/post', param)
}

function postById(id: string): ApiResponse<IPostModel> {
  return Get(`/post/${id}`)
}

export const PostApi = {
  postListRequest,
  postById,
}
