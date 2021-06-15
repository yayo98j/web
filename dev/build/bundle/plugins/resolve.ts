import { Plugin } from 'rollup'
import resolve from 'rollup-plugin-node-resolve'

export default (): Plugin =>
  resolve({
    // @ts-ignore
    include: 'node_modules/**',
    browser: true,
    preferBuiltins: false
  })
