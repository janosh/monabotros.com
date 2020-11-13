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
import yaml from 'js-yaml'
import fs from 'fs'
import marked from 'marked'
import { mdToPlain } from './src/utils/mdToPlain'
import svelteSVG from 'rollup-plugin-svelte-svg'

// YAML transformer   nn  used by @rollup/plugin-yaml
function yamlTransform(data, id) {
  // the content in these files needs further processing
  const files = [`films`, `articles`, `press`]
  // check if YAML file is one that needs processing
  if (files.some((str) => id.includes(str))) {
    const slugPrefix = files.find((type) => id.includes(type))

    data.forEach((itm) => {
      if (itm.date) itm.date = new Date(itm.date).toLocaleDateString(`de`)
      if (itm.md) {
        // convert markdown to plain text and truncate at after 15 words
        itm.excerpt =
          mdToPlain(itm.md).split(` `).splice(0, 15).join(` `) + `&hellip;`
        itm.html = marked(itm.md)
      }
      if (itm.slug) {
        itm.objectID = itm.slug
        itm.slug = `/${slugPrefix}/${itm.slug}`
      }
    })

    return data
  }
}

const replacements = replace({
  'process.browser': true,
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
})
const dev = process.env.NODE_ENV === `development`

const algoliaLoaderFactory = (type) => () =>
  yamlTransform(yaml.safeLoad(fs.readFileSync(`content/${type}.yml`)), type)

const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  partialUpdates: true,
  indices: [
    { name: `films`, getData: algoliaLoaderFactory(`films`) },
    { name: `articles`, getData: algoliaLoaderFactory(`articles`) },
    { name: `press`, getData: algoliaLoaderFactory(`press`) },
  ],
}

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
        dev,
        hydratable: true,
        emitCss: true,
        preprocess: mdsvex(),
        extensions: [`.svelte`, `.svx`],
      }),
      resolve({
        browser: true,
        dedupe: [`svelte`],
      }),
      commonjs(),

      !dev &&
        terser({
          module: true,
        }),
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
        generate: `ssr`,
        hydratable: true,
        dev,
        preprocess: mdsvex(),
        extensions: [`.svelte`, `.svx`],
      }),
      resolve({
        dedupe: [`svelte`],
      }),
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
