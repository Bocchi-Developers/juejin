import AppUIStore from './app'
import { PostStore } from './collections/post'

export interface RootStore {
  appUIStore: AppUIStore
  postStore: PostStore
}
export class RootStore {
  constructor() {
    this.appUIStore = new AppUIStore()
    this.postStore = new PostStore()
  }

  get appStore() {
    return this.appUIStore
  }
}
