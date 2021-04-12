require(`dotenv`).config()
const yaml = require(`js-yaml`)
const fs = require(`fs`)
const netlify = require(`@sveltejs/adapter-netlify`)
const pkg = require(`./package.json`)
const { mdsvex } = require(`mdsvex`)
const rollupYaml = require(`@rollup/plugin-yaml`)
const marked = require(`marked`)
const { indexAlgolia } = require(`svelte-algolia`)

const loadAlgoliaItems = (type) => () =>
  yamlTransform(
    yaml.load(fs.readFileSync(`src/routes/${type}/${type}.yml`)),
    type
  )

const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  partialUpdates: true,
  indices: [
    { name: `Filme`, getData: loadAlgoliaItems(`films`) },
    { name: `Artikel`, getData: loadAlgoliaItems(`articles`) },
  ],
  settings: {
    attributesToHighlight: [`title`, `excerpt`, `date`, `channel`, `tag`],
  },
}

function htmlEscapeToText(text) {
  return text.replace(/&#[0-9]*;|&amp;/g, (escapeCode) => {
    if (escapeCode.match(/amp/)) return `&`
    return String.fromCharCode(escapeCode.match(/[0-9]+/))
  })
}

// return a custom plain-text renderer for marked
// adapted from https://dustinpfister.github.io/2017/11/19/nodejs-marked
function plainRenderer() {
  const render = new marked.Renderer()

  // render just the text of a link
  render.link = (href, title, text) => text

  // render just the text of a paragraph
  render.paragraph = (text) => htmlEscapeToText(text) + `\r\n`

  // render just the text of a heading element, but indicate level
  render.heading = (text, level) => level + ` ) ` + text

  // render nothing for images (available args: href, title, text)
  render.image = () => ``

  return render
}

// used by @rollup/plugin-yaml and svelte-algolia config
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
          marked(itm.md, { renderer: plainRenderer() })
            .split(` `)
            .splice(0, 15)
            .join(` `) + `&hellip;`
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

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  extensions: [`.svelte`, `.svx`],
  preprocess: mdsvex(),
  kit: {
    adapter: netlify(),

    // hydrate the #svelte element in src/app.html
    target: `#svelte`,

    vite: {
      plugins: [
        rollupYaml({ transform: yamlTransform }),
        process.env.NODE_ENV !== `development` && indexAlgolia(algoliaConfig),
      ],
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
}
