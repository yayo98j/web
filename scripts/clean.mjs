import rimraf from 'rimraf'
import path from 'path'
import url  from 'url'

const __filename = url.fileURLToPath(import.meta.url);
const __root = path.dirname(path.join(__filename, '../'))

// dist
rimraf.sync(path.join(__root, 'refactor', '*', 'dist'))
rimraf.sync(path.join(__root, 'dist'))

// rm logs
rimraf.sync(path.join(__root, 'refactor', '*', 'node_modules'))
rimraf.sync(path.join(__root, 'node_modules'))
