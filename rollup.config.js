import { createRollupConfig } from './build/create-rollup-config.js'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const name = 'kmEditor'
const configList = []

// umd
const umdConf = createRollupConfig({
  output: {
    file: pkg.main,
    format: 'umd',
    name,
    exports: 'named',
  },
})
configList.push(umdConf)

// esm
const esmConf = createRollupConfig({
  output: {
    file: pkg.module,
    format: 'esm',
    name,
  },
})
configList.push(esmConf)

export default configList
