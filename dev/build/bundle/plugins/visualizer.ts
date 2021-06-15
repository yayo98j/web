import { Plugin } from 'rollup'
// @ts-ignore
import visualizer from 'rollup-plugin-visualizer'

export default ({ filename }: { filename: string }): Plugin =>
  visualizer({
    filename: filename
  })
