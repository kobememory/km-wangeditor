/**
 * @description 创建 rollup 配置
 */
import { defineConfig } from 'rollup'
import { merge } from 'lodash-es'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import cleanup from 'rollup-plugin-cleanup'
import typescript from 'rollup-plugin-typescript2'
import { visualizer } from 'rollup-plugin-visualizer'

const extensions = ['.js', '.ts', '.tsx']

// 环境变量
const ENV = process.env.NODE_ENV || 'production'
const IS_SIZE_STATS = ENV.indexOf('size_stats') >= 0 // 分析包体积
const IS_PRD = ENV.indexOf('production') >= 0

/**
 * 生成单个 rollup 配置
 * @param {object} customConfig { input, output, plugins ... }
 */
export function createRollupConfig(customConfig = {}) {
  const { input, output = {}, plugins = [] } = customConfig
  const { format } = output

  const baseConfig = defineConfig({
    input: 'src/index.ts',
    output: {
      sourcemap: false,
      ...output,
    },
    // external: ['@wangeditor/editor'],
    plugins: [
      typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
      }),
      nodeResolve({
        browser: true, // 重要
        mainFields: format === 'esm' ? ['module', 'main'] : ['main'],
        extensions,
      }),
      commonjs({}),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        include: 'src/**',
        extensions,
      }),
      postcss({
        plugins: [
          autoprefixer(),
          cssnano(), // 压缩 css
        ],
        extract: 'css/style.css',
      }),
      cleanup({
        comments: 'none',
        extensions: ['.ts', '.tsx'],
      }),
      IS_PRD && terser(), // 压缩 js
    ],
  })

  if (IS_SIZE_STATS) {
    // 分析包体积。运行之后可查看项目根目录下的 `stats.html`
    plugins.push(visualizer())
  }

  const config = {
    input: input ? input : baseConfig.input,
    output,
    plugins,
  }

  const res = merge({}, baseConfig, config)
  return res
}
