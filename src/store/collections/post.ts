import { PostApi } from '~/services/api/post'
import type { IPostModel } from '~/types/api/post'

import { Store } from '../helper/base'

export class PostStore extends Store<IPostModel> {
  async fetchBySlug(id: string) {
    const post = await PostApi.postById(id)
    this.add(post)
    return post
  }
}
