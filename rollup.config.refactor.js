import { build as buildWebDependencies } from './refactor/web-dependencies/rollup.config.js'
import { build as buildWebPortal } from './refactor/web-portal/rollup.config.js'

export default [buildWebPortal('./dist/'), ...buildWebDependencies('./dist/web-dependencies')]
