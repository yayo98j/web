import EventEmitter from 'events'
import { BuildEvent, Task } from '../typings'
import { buildEvent } from '../utils'

export default abstract class AbstractTask extends EventEmitter implements Task {
  abstract readonly after: string[]
  abstract readonly name: string
  public reRun: boolean = true

  public async exec(event: BuildEvent): Promise<void> {
    if (!this.after.includes(event.key) || !this.reRun) {
      return
    }

    this.emit('event', buildEvent({ name: ['task', 'start'], data: event.data, id: this.name }))
    const data = await this.run(event)
    this.emit('event', buildEvent({ name: ['task', 'end'], data: data, id: this.name }))
  }

  abstract run(event: BuildEvent): Promise<unknown>
}
