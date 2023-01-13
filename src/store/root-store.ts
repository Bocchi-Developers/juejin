import AppUIStore from './app'

export interface RootStore {
  appUIStore: AppUIStore
}
export class RootStore {
  constructor() {
    this.appUIStore = new AppUIStore()
  }

  get appStore() {
    return this.appUIStore
  }
}
