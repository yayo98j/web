import { Plugin } from 'rollup'
// @ts-ignore
import babel from 'rollup-plugin-babel'

export default (): Plugin =>
  babel({
    exclude: 'node_modules/**'
  })
