import { Plugin } from 'rollup'
import ts from 'rollup-plugin-ts'

export default (): Plugin =>
  ts({
    browserslist: false
  })
