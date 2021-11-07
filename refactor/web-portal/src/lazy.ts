import App from './App.vue'
import { CreateElement, VNode } from 'vue'

export const sayAndComponent = (that: string, h: CreateElement): VNode => {
  console.log(`lazy - ${that}`)

  return h(App)
}
