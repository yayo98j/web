import { BuildEvent, BuildPipeline, bundles, tasks } from './dev/build'
import path from 'path'

const { DefaultBundle } = bundles
const options = {
  buildDest: 'dist',
  watch: process.env.WATCH === 'true'
}

/* define bundle */
const bundle = new DefaultBundle({
  input: {
    'web-app-draw-io': 'packages/web-app-draw-io/src/index.js',
    'web-app-files': 'packages/web-app-files/src/index.js',
    'web-app-markdown-editor': 'packages/web-app-markdown-editor/src/index.js',
    'web-app-media-viewer': 'packages/web-app-media-viewer/src/index.js',
    'web-runtime': 'packages/web-runtime/src/index.js'
  },
  watch: options.watch
})

/* define tasks */
const copyHTMLTask = new tasks.CopyTask({
  watch: options.watch,
  targets: [
    {
      source: 'packages/web-container/**/*.{html,json,svg,png}',
      dest: options.buildDest
    },
    {
      source: 'packages/web-runtime/themes/**/*',
      dest: path.join(options.buildDest, 'themes')
    },
    {
      source: 'config/config.json',
      dest: options.buildDest
    },
    {
      source: 'node_modules/requirejs/require.js',
      dest: path.join(options.buildDest, 'js')
    }
  ]
})

/* define pipeline */
const pipeline = new BuildPipeline({ watch: options.watch })

/* attach bundle */
pipeline.addBundle(bundle)

/* attach task */
pipeline.addTask(copyHTMLTask)

/* define pipeline events */
pipeline.on('event', (event: BuildEvent) => {
  // console.log('BuildPipeline', '--', event.key)
  // print event to stdout
  // copy a file
  // trigger livereload event
  // ...
})

/* define copyHTMLTask events */
copyHTMLTask.on('event', (event: BuildEvent) => {
  // console.log('CopyTask', '--', event.key)
  // print event to stdout
  // copy a file
  // trigger livereload event
  // ...
})

/* start the pipeline */
pipeline.start()
