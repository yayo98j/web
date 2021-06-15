import { Plugin } from 'rollup'
import postcss from 'rollup-plugin-postcss'

let instance: Plugin
export default ({ watch }: { watch: boolean }): Plugin => {
  if (!instance) {
    instance = postcss({
      extract: 'css/web.css',
      minimize: watch,
      config: false
    })
  }
  return instance
}
