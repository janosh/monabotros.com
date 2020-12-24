import marked from 'marked'
import { mdToPlain } from './mdToPlain'

export const reduceMeta = (...keys) =>
  keys.reduce((acc, key) => acc + (key ? key + ` | ` : ``), ``).slice(0, -3)

// used by @rollup/plugin-yaml and svelte-algolia config
export function yamlTransform(data, id) {
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
