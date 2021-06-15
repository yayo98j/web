import { Plugin } from 'rollup'
import gzip from 'rollup-plugin-gzip'

export default (): Plugin => gzip()
