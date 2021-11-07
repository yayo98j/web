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
import {merge} from 'lodash'
import {terser} from 'rollup-plugin-terser'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __root = path.dirname(__filename)

const production = !process.env.ROLLUP_WATCH
const buildConf = (distFolder = './dist') => ({
  manualChunks: {},
  output: [
    {
      dir: distFolder,
      format: 'system',
      freeze: true,
      sourcemap: true,
      chunkFileNames: '_chunks/[name]-[hash].js'
    },
  ],
  external: [
    'vue',
  ],
  plugins: [
    copy({
      targets: [
        {src: path.join(__root, 'static/*'), dest: distFolder},
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
    terser(),
    del({targets: path.join(distFolder, '*'), runOnce: true})
  ],
  preserveSymlinks: true,
  onwarn: (warning) => {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`)
    }
  }
})

export const build = (distFolder) => merge({input: {'index': path.join(__root, './src/index.ts')}}, buildConf(distFolder))

export default build()
