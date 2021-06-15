import { Plugin } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'

export default (): Plugin =>
  commonjs({
    include: 'node_modules/**'
  })
