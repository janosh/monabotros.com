import 'dotenv/config'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import rollupYaml from '@rollup/plugin-yaml'
import alias from '@rollup/plugin-alias'
import { mdsvex } from 'mdsvex'
import { indexAlgolia } from 'svelte-algolia'
import svelteSVG from 'rollup-plugin-svelte-svg'
import { yamlTransform } from './src/utils/index'
import { algoliaConfig } from './src/utils/algolia'

const replacements = replace({
  'process.browser': true,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})
const dev = process.env.NODE_ENV === `development`

const onwarn = (warning, onwarn) =>
  (warning.code === `MISSING_EXPORT` && /'preload'/.test(warning.message)) ||
  (warning.code === `CIRCULAR_DEPENDENCY` &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning)

// rollup aliases
const entries = [
  { find: `content`, replacement: `./content` },
  { find: `components`, replacement: `./src/components` },
]

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      alias({ entries }),
      rollupYaml({ transform: yamlTransform }),
      replacements,
      svelteSVG({ dev }),
      svelte({
        preprocess: mdsvex(),
        extensions: [`.svelte`, `.svx`],
        emitCss: true,
        compilerOptions: { dev, hydratable: true },
      }),
      resolve({ browser: true, dedupe: [`svelte`] }),
      commonjs(),
      !dev && terser({ module: true }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      alias({ entries }),
      rollupYaml({ transform: yamlTransform }),
      replacements,
      svelteSVG({ generate: `ssr`, dev }),
      svelte({
        preprocess: mdsvex(),
        extensions: [`.svelte`, `.svx`],
        compilerOptions: { generate: `ssr`, hydratable: true, dev },
      }),
      resolve({ dedupe: [`svelte`] }),
      commonjs(),
      !dev && indexAlgolia(algoliaConfig),
    ],

    external: Object.keys(pkg.dependencies).concat(
      require(`module`).builtinModules
    ),
    preserveEntrySignatures: `strict`,
    onwarn,
  },
}
