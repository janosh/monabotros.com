import yaml from 'js-yaml'
import fs from 'fs'

import { yamlTransform } from './index'

const loadAlgoliaItems = (type) => () =>
  yamlTransform(yaml.safeLoad(fs.readFileSync(`content/${type}.yml`)), type)

export const algoliaConfig = {
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
