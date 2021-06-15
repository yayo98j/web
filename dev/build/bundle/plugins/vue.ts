import { Plugin } from 'rollup'
import vue from 'rollup-plugin-vue'

export default (): Plugin =>
  vue({
    css: false
  })
