import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { CocktailOrders } from './collections/CocktailOrders'
import { Cocktails } from './collections/Cocktails'
import { Equipment } from './collections/Equipment'
import { Ingredients } from './collections/Ingredients'
import { LaundryOffers } from './collections/LaundryOffers'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { QuoteRequests } from './collections/QuoteRequests'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— SOLISS TRILL Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Products,
    Ingredients,
    Equipment,
    Cocktails,
    LaundryOffers,
    CocktailOrders,
    QuoteRequests,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  cors: [serverUrl],
  csrf: [serverUrl],
  sharp,
})
