import type { IPostListParam, IPostListResponse } from '~/types/api/post'

import type { ApiResponse } from '../../types/api'
import { Get } from '../server'

function postListRequest(
  param: IPostListParam,
): ApiResponse<IPostListResponse> {
  return Get('/post', param)
}

export const PostApi = {
  postListRequest,
}
