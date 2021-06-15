import { Plugin } from 'rollup'
import { terser } from 'rollup-plugin-terser'

export default (): Plugin => terser()
