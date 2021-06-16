import { Bundle, Builder } from '../typings'
import { RollupWatcher, RollupWatchOptions, watch } from 'rollup'
import { buildEvent, clearScreen } from '../utils'
import EventEmitter from 'events'

export default class WatchBuilder extends EventEmitter implements Builder {
  private readonly settings: RollupWatchOptions[]
  private builder?: RollupWatcher

  constructor(bundles: Bundle[]) {
    super()

    this.settings = []
    bundles.forEach(bundle => {
      bundle.settings.forEach(setting => {
        this.settings.push(setting)
      })
    })
  }

  public build() {
    clearScreen()
    this.builder = watch(this.settings)

    this.builder.on('event', (event: any) => {
      if (event.result) {
        event.result.close()
      }

      const eventKeys: string[] | undefined = {
        ERROR: ['error'],
        START: ['start'],
        BUNDLE_START: ['bundle', 'start'],
        BUNDLE_END: ['bundle', 'end'],
        END: ['end']
      }[event.code as string]

      if (eventKeys) {
        this.emit('event', buildEvent({ name: eventKeys, data: event }))
      }
    })
  }

  public close() {
    this.builder?.close()
  }
}
