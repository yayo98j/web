import { RollupOptions } from 'rollup'
import { Bundle, BundleOptions } from '../typings'
import { options } from '../bundle'
import { defaultDir } from '../defaults'

export default abstract class AbstractBundle implements Bundle {
  protected options: BundleOptions

  constructor(options: BundleOptions) {
    this.options = options
  }

  get settings(): RollupOptions[] {
    if (!this.options.watch) {
      return [this.buildSettings({ input: this.options.input })]
    }

    return Object.keys(this.options.input).map(k =>
      this.buildSettings({ input: { [k]: this.options.input[k] } })
    )
  }

  protected buildSettings(params: RollupOptions): RollupOptions {
    return {
      input: params.input,
      output: {
        dir: this.options.dir || defaultDir,
        format: 'amd',
        chunkFileNames: 'js/_chunks/[name].js',
        entryFileNames: 'js/[name].js',
        ...(!this.options.watch && { manualChunks: options.manualChunks() })
      },
      plugins: [],
      preserveSymlinks: true,
      onwarn: options.onwarn
    }
  }
}
