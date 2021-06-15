import { Plugin } from 'rollup'
// @ts-ignore
import builtins from '@erquhart/rollup-plugin-node-builtins'

export default (): Plugin => builtins({ crypto: true })
