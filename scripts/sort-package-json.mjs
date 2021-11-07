import glob from 'glob'
import fs from 'fs'
import path from 'path'
import {sortPackageJson} from 'sort-package-json'

['.', ...glob.sync('refactor/*', {})].forEach(pkg => {
  const file = path.join(pkg, 'package.json')
  const packageJson = fs.readFileSync(file, 'utf8')
  const sorted = sortPackageJson(packageJson)

  fs.writeFileSync(file, sorted, 'utf8')
  console.log(`${file} is sorted!`)
})

