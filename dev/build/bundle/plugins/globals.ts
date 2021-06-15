import { Plugin } from 'rollup'
// @ts-ignore
import globals from 'rollup-plugin-node-globals'

export default (): Plugin => globals()
