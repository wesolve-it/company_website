import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'
import { Users, Media, Services, References, Testimonials, Pages, Inquiries } from './collections'
import { Home, SiteSettings } from './globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const databaseURL = process.env.DATABASE_URL || 'file:./payload.db'
if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET fehlt. Bitte .env.example nach .env kopieren und einen zufälligen Schlüssel setzen.')
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  admin: { user: 'users', importMap: { baseDir: dirname }, meta: { titleSuffix: ' | wesolve-IT CMS' } },
  i18n: { supportedLanguages: { de, en }, fallbackLanguage: 'de' },
  collections: [Users, Media, Services, References, Testimonials, Pages, Inquiries],
  globals: [Home, SiteSettings], editor: lexicalEditor(), sharp,
  db: databaseURL.startsWith('postgres')
    ? postgresAdapter({ pool: { connectionString: databaseURL }, migrationDir: path.resolve(dirname, 'migrations/postgres') })
    : sqliteAdapter({ client: { url: databaseURL }, migrationDir: path.resolve(dirname, 'migrations/sqlite') }),
  ...(process.env.SMTP_HOST ? { email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM || 'info@wesolve-it.com', defaultFromName: 'wesolve-IT',
    transportOptions: { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465',
      ...(process.env.SMTP_USER ? { auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } } : {}),
    },
  }) } : {}),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
