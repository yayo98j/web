import { BuildEvent } from './typings'
import { clearScreen } from './utils'
import { bold, cyan, green, red } from 'colorette'
import ms from 'pretty-ms'
import dateTime from 'date-and-time'

export default function(event: BuildEvent) {
  switch (event.key) {
    case 'pipeline.builder.error':
      console.error(red(`[builder] ${event.data.error}`))
      break
    case 'pipeline.builder.start':
      clearScreen()
      break
    case 'pipeline.builder.bundle.start':
      console.log(cyan(`[builder] ${bold(Object.keys(event.data.input).join(', '))}... start`))
      break
    case 'pipeline.builder.bundle.end':
      console.log(
        green(
          `[builder] ${bold(Object.keys(event.data.input).join(', '))}... done in ${bold(
            ms(event.data.duration)
          )}`
        )
      )
      break
    case 'pipeline.builder.end':
      if (event.id !== 'watch') {
        return
      }

      console.log(
        `[builder] ${dateTime.format(new Date(), 'DD-MMMM-YYYY, hh:mm:ss')} waiting for changes...`
      )
      break
    case 'pipeline.task.start':
      console.log(cyan(`[task] ${bold(event.id!)} start`))
      break
    case 'pipeline.task.end':
      console.log(green(`[task] ${bold(event.id!)} done`))
      break
  }
}
