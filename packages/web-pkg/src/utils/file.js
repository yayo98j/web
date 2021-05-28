import path from 'path'

export const getExtension = name => {
  const extension = path.extname(name)
  if (!extension) {
    return ''
  }
  return extension.replace(/^(.)/, '').toLowerCase()
}
