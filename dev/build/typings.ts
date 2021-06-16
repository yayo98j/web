import { RollupOptions } from 'rollup'
import EventEmitter from 'events'

export type PipelineOptions = {
  watch: boolean
  bundles?: Bundle[]
  tasks?: Task[]
}

export interface Builder extends EventEmitter {
  build(): void

  close(): void
}

export interface Bundle {
  settings: RollupOptions[]
}

export type BundleOptions = {
  input: { [key: string]: string }
  dir?: string
  watch: boolean
}

export interface Task extends EventEmitter {
  after: string[]
  name: string

  exec(event: BuildEvent): Promise<void>

  run(event: BuildEvent): Promise<unknown>
}

export type BuildEvent = {
  key: string
  data?: any
  id?: string
}
