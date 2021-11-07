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
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const __root = path.dirname(__filename)
const __distFolder = path.join(__root, 'dist')
const production = !process.env.ROLLUP_WATCH

export const configuration = {
  input: path.join(__root, './src/index.ts'),
  output: [
    {
      dir: __distFolder,
      format: 'system',
      freeze: true,
      sourcemap: true,
      chunkFileNames: '_chunks/[name]-[hash].js'
    }
  ],
  external: ['@ownclouders/web-portal'],
  plugins: [
    copy({
      targets: [{ src: path.join(__root, 'static/*'), dest: __distFolder }]
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

export default configuration
