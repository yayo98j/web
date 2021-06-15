import { ManualChunksOption, RollupWarning } from 'rollup'

export const manualChunks = (): ManualChunksOption => (id, a) => {
  if (id.includes('node_modules')) {
    return 'vendor'
  }
}

export const onwarn = (warning: RollupWarning): void => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    console.error(`(!) ${warning.message}`)
  }
}
