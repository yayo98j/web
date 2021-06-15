import { watch, copy } from 'cpx'
import { BuildEvent, Task } from '../typings'
import AbstractTask from './abstract'

type options = {
  watch: boolean
  targets: {
    source: string
    dest: string
  }[]
}

export default class CopyTask extends AbstractTask implements Task {
  public after = ['pipeline.builder.start']
  public name = 'copy'
  private options: options

  constructor(options: options) {
    super()
    this.options = options
  }

  public async run(event: BuildEvent): Promise<unknown> {
    this.reRun = false
    let copier: any[] = []
    this.options.targets.forEach(target => {
      if (this.options.watch) {
        copier.push(watch(target.source, target.dest, { clean: true, update: true }))
      } else {
        copier.push(copy(target.source, target.dest, { clean: true, update: true }))
      }
    })

    return copier
  }
}
