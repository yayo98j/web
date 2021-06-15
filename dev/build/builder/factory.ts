import EventEmitter from 'events'
import { Bundle, Builder, BuildEvent } from '../typings'
import WatchRunner from '../builder/watch'
import OnceRunner from '../builder/once'
import { buildEvent } from '../utils'

export default class BuilderFactory extends EventEmitter {
  private readonly builder: Builder

  constructor(bundles: Bundle[], watch: boolean) {
    super()

    if (watch) {
      this.builder = new WatchRunner(bundles)
    } else {
      this.builder = new OnceRunner(bundles)
    }

    this.builder.on('event', (event: BuildEvent) => {
      this.emit('event', buildEvent({ name: ['builder', event.key], data: event.data }))
    })
    ;['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP'].forEach(signal => {
      process.on(signal, () => {
        this.close()
        process.exit()
      })
    })
  }

  public build(): void {
    this.builder.build()
  }

  public close(): void {
    this.builder.close()
    this.emit('event', buildEvent({ name: ['builder', 'close'] }))
  }
}
