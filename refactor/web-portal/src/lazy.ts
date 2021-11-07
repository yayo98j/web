import App from './App.vue'
import { CreateElement, VNode } from 'vue'

export const sayAndComponent = (that: string, createElement: CreateElement): VNode => {
  console.log(`lazy - ${that}`)

  return createElement(App)
}
