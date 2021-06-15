import { BuildEvent, Bundle, Task, PipelineOptions } from './typings'
import BuilderFactory from './builder/factory'
import EventEmitter from 'events'
import { buildEvent } from './utils'
import logger from './logger'

export default class BuildPipeline extends EventEmitter {
  private bundles: Bundle[]
  private options: PipelineOptions

  constructor(options: PipelineOptions) {
    super()

    this.options = options
    this.bundles = []

    options.bundles?.forEach(this.addBundle)
    options.tasks?.forEach(this.addTask)

    this.on('event', async (event: BuildEvent) => {
      logger(event)
    })
  }

  public addBundle(bundle: Bundle): void {
    this.bundles.push(bundle)
  }

  public addTask(task: Task): void {
    task.on('event', (event: BuildEvent) => {
      this.emit(
        'event',
        buildEvent({ name: ['pipeline', event.key], data: event.data, id: event.id })
      )
    })

    this.on('event', async (event: BuildEvent) => {
      await task.exec(event)
    })
  }

  public start(): void {
    const builder = new BuilderFactory(this.bundles, this.options.watch)

    builder.on('event', (event: BuildEvent) => {
      this.emit(
        'event',
        buildEvent({
          name: ['pipeline', event.key],
          data: event.data,
          id: this.options.watch ? 'watch' : 'once'
        })
      )
    })

    builder.build()
  }
}
