import path from 'node:path'
import type { CollectionConfig } from 'payload'
import { admin, adminField, published, staff } from '../lib/access'
import { contentFields, seo } from './contentFields'

export const Users: CollectionConfig = {
  slug: 'users', labels: { singular: 'Benutzer', plural: 'Benutzer' }, auth: true,
  admin: { useAsTitle: 'email', group: 'Verwaltung' },
  access: { read: staff, create: admin, update: admin, delete: admin },
  hooks: { beforeChange: [async ({ data, operation, req }) => {
    if (operation === 'create') {
      const count = await req.payload.count({ collection: 'users', overrideAccess: true, req })
      if (count.totalDocs === 0) data.role = 'admin'
    }
    return data
  }] },
  fields: [{ name: 'role', type: 'select', required: true, defaultValue: 'editor',
    options: [{ label: 'Administrator', value: 'admin' }, { label: 'Redaktion', value: 'editor' }],
    access: { create: adminField, update: adminField },
  }],
}
export const Media: CollectionConfig = {
  slug: 'media', labels: { singular: 'Medium', plural: 'Medien' },
  admin: { useAsTitle: 'alt', group: 'Inhalte' },
  access: { read: () => true, create: staff, update: staff, delete: staff },
  upload: {
    staticDir: path.resolve(process.env.MEDIA_DIR || 'media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'],
    imageSizes: [{ name: 'card', width: 800 }, { name: 'hero', width: 1440 }],
    adminThumbnail: 'card',
  },
  fields: [{ name: 'alt', type: 'text', required: true, label: 'Alternativtext' }],
}
const editorial = {
  access: { read: published, create: staff, update: staff, delete: staff },
  versions: { drafts: { autosave: false }, maxPerDoc: 20 },
} satisfies Partial<CollectionConfig>
export const Services: CollectionConfig = {
  slug: 'services', labels: { singular: 'Leistung', plural: 'Leistungen' },
  admin: { useAsTitle: 'title', group: 'Inhalte', defaultColumns: ['title', 'slug', '_status', 'order'] },
  ...editorial, fields: contentFields,
}
export const References: CollectionConfig = {
  slug: 'references', labels: { singular: 'Referenz', plural: 'Referenzen' },
  admin: { useAsTitle: 'title', group: 'Inhalte', defaultColumns: ['title', 'category', '_status', 'order'] },
  ...editorial, fields: [
    ...contentFields,
    { name: 'category', type: 'select', required: true, options: [
      { label: 'Webentwicklung', value: 'web' }, { label: 'App-Entwicklung', value: 'app' },
      { label: 'SEO', value: 'seo' }, { label: 'Individual-Software', value: 'software' },
    ] },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Kundenlogo' },
    { name: 'facts', type: 'array', label: 'Eckdaten', fields: [
      { name: 'label', type: 'text', required: true }, { name: 'value', type: 'text', required: true },
    ] },
    { name: 'testimonial', type: 'relationship', relationTo: 'testimonials', label: 'Kundenstimme' },
    { name: 'website', type: 'text', label: 'Projekt-URL' },
  ],
}
export const Testimonials: CollectionConfig = {
  slug: 'testimonials', labels: { singular: 'Kundenstimme', plural: 'Kundenstimmen' },
  admin: { useAsTitle: 'name', group: 'Inhalte' }, ...editorial,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'position', type: 'text', required: true, label: 'Position / Unternehmen' },
    { name: 'quote', type: 'textarea', required: true, label: 'Zitat' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Bild / Logo' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
export const Pages: CollectionConfig = {
  slug: 'pages', labels: { singular: 'Seite', plural: 'Seiten' },
  admin: { useAsTitle: 'title', group: 'Inhalte' }, ...editorial,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true,
      validate: (value: string | null | undefined) => {
        const reserved = ['admin', 'api', 'leistungen', 'referenzen', 'kontakt', 'thank-you', 'index', '404', 'robots', 'sitemap']
        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '') && !reserved.includes(value || '') || 'Bitte einen freien URL-Namen in Kleinbuchstaben verwenden.'
      } },
    { name: 'content', type: 'richText', required: true, label: 'Inhalt' }, seo,
  ],
}
export const Inquiries: CollectionConfig = {
  slug: 'inquiries', labels: { singular: 'Anfrage', plural: 'Anfragen' },
  admin: { useAsTitle: 'subject', group: 'Verwaltung', defaultColumns: ['name', 'email', 'subject', 'createdAt'] },
  access: { read: staff, create: () => false, update: staff, delete: staff },
  fields: [
    { name: 'name', type: 'text', required: true }, { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' }, { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true }, { name: 'consent', type: 'checkbox', required: true },
    { name: 'notificationSent', type: 'checkbox', defaultValue: false },
  ],
}
