import 'dotenv/config'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

const keys = [
  `NODE_ENV`,
  `GOOGLE_MAPS_API_KEY`,
  `ALGOLIA_APP_ID`,
  `ALGOLIA_SEARCH_KEY`,
]

const session = Object.fromEntries(keys.map((key) => [key, process.env[key]]))

const dev = session.NODE_ENV === `development`

polka()
  .use(
    compression({ threshold: 0 }),
    sirv(`static`, { dev }),
    sapper.middleware({
      session: () => session,
    })
  )
  .listen(process.env.PORT, (err) => {
    // eslint-disable-next-line no-console
    if (err) console.log(`error`, err)
  })
