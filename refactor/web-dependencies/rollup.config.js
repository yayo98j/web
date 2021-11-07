import vue from 'rollup-plugin-vue'
import copy from 'rollup-plugin-copy'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-ts'
import cleanup from 'rollup-plugin-cleanup'
import json from '@rollup/plugin-json'
import globals from 'rollup-plugin-node-globals'
import builtins from '@erquhart/rollup-plugin-node-builtins'
import del from 'rollup-plugin-delete'
import modify from 'rollup-plugin-modify'
import { merge } from 'lodash'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import url from 'url'
const __filename = url.fileURLToPath(import.meta.url)
const __root = path.dirname(__filename)
const __distFolder = path.join(__root, 'dist')
const production = !process.env.ROLLUP_WATCH

const baseConfiguration = {
  manualChunks: {},
  output: [
    {
      dir: __distFolder,
      format: 'amd',
      freeze: true,
      sourcemap: !production,
      chunkFileNames: '_chunks/[name]-[hash].js'
    }
  ],
  external: ['tus-js-client'],
  plugins: [
    copy({
      targets: [
        { src: path.join(__root, 'static/*'), dest: __distFolder },
        {
          src: path.join(
            path.dirname(require.resolve('axios')),
            production ? 'dist/axios.min.js' : 'dist/axios.min.*'
          ),
          dest: __distFolder
        },
        {
          src: path.join(
            path.dirname(require.resolve('systemjs')),
            production ? 'system.min.js' : 'system.min.*'
          ),
          dest: __distFolder
        },
        {
          src: path.join(
            path.dirname(require.resolve('systemjs')),
            production ? 'extras/*.min.js' : 'extras/*.min.*'
          ),
          dest: path.join(__distFolder, 'system-extras')
        },
        {
          src: path.join(
            path.dirname(require.resolve('tus-js-client')),
            production ? '../dist/tus.min.js' : '../dist/tus.min.js*'
          ),
          dest: __distFolder
        },
        {
          src: path.join(
            path.dirname(require.resolve('import-map-overrides')),
            production ? 'import-map-overrides.js' : 'import-map-overrides.*'
          ),
          dest: __distFolder
        }
      ]
    }),
    vue({
      css: false
    }),
    builtins(),
    nodeResolve(),
    commonjs(),
    typescript(),
    json(),
    globals(),
    cleanup(),
    modify({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
    }),
    production && terser(),
    del({ targets: path.join(__distFolder, '*'), runOnce: true })
  ],
  preserveSymlinks: true,
  onwarn: (warning) => {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`)
    }
  }
}

export const configuration = [
  merge({ input: { 'web-custom-vue': path.join(__root, './src/vue/index.js') } }, baseConfiguration)
]

export default configuration
