import { createStore } from 'easy-peasy'
import sidebar from './sidebarModel'

const store = createStore(
  { sidebar },
  {
    disableImmer: true
  }
)

export default store
