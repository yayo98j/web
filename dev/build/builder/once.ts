import { Bundle, Builder } from '../typings'
import { OutputOptions, rollup, RollupOptions } from 'rollup'
import { buildEvent, clearScreen } from '../utils'
import EventEmitter from 'events'

export default class OnceBuilder extends EventEmitter implements Builder {
  private readonly settings: RollupOptions[]

  constructor(bundles: Bundle[]) {
    super()

    this.settings = []
    bundles.forEach(bundle => {
      bundle.settings.forEach(setting => {
        this.settings.push(setting)
      })
    })
  }

  public async build() {
    clearScreen()
    const start = Date.now()
    this.emit('event', buildEvent({ name: ['start'] }))
    for (const setting of this.settings) {
      this.emit('event', buildEvent({ name: ['bundle', 'start'], data: setting }))
      try {
        const { write, close } = await rollup(setting)

        await write(setting.output as OutputOptions)
        await close()
        this.emit(
          'event',
          buildEvent({
            name: ['bundle', 'end'],
            data: { duration: Date.now() - start, ...setting }
          })
        )
      } catch (err) {
        console.error(err)
      }
    }
    this.emit('event', buildEvent({ name: ['end'] }))
  }

  public close() {}
}
