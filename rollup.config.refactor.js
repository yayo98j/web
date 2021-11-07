import { configuration as dependencies } from './refactor/web-dependencies/rollup.config.js'
import { configuration as containerBrowser } from './refactor/web-container-browser/rollup.config.js'
import { configuration as portal } from './refactor/web-portal/rollup.config.js'

export default [...dependencies, containerBrowser, portal]
