import { BuildEvent } from './typings'

export const clearScreen = () => process.stdout.write('\u001Bc')
export const buildEvent = ({
  name,
  data,
  id
}: {
  name: (string | undefined)[]
  id?: string
  data?: unknown
}): BuildEvent => {
  return { key: name.filter(Boolean).join('.'), data, id }
}
