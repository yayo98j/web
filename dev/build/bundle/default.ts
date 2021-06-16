import path from 'path'
import { Bundle } from '../typings'
import { RollupOptions } from 'rollup'
import {
  babel,
  builtins,
  commonjs,
  globals,
  json,
  modify,
  postcss,
  resolve,
  vue,
  gzip,
  visualizer,
  terser
} from './plugins'
import AbstractBundle from './abstract'

export default class DefaultBundle extends AbstractBundle implements Bundle {
  protected buildSettings(params: RollupOptions): RollupOptions {
    const defaultSettings = super.buildSettings(params)

    defaultSettings.plugins = [
      postcss(this.options),
      vue(),
      builtins(),
      resolve(),
      commonjs(),
      babel(),
      modify(),
      globals(),
      json()
    ]

    if (!this.options.watch) {
      defaultSettings.plugins.push(terser(), gzip())
    }

    if (process.env.VISUALIZE === 'true') {
      defaultSettings.plugins.push(
        visualizer({ filename: path.join(this.options.dir || 'dist', 'report.html') })
      )
    }

    return defaultSettings
  }
}
