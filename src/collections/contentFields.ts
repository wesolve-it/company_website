import type { Field } from 'payload'

export const seo: Field = {
  name: 'seo', type: 'group', label: 'Suchmaschinen & Social Media', fields: [
    { name: 'title', type: 'text', label: 'Seitentitel' },
    { name: 'description', type: 'textarea', label: 'Beschreibung' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Vorschaubild' },
  ],
}
export const paragraphs: Field = {
  name: 'paragraphs', type: 'array', label: 'Absätze', fields: [{ name: 'text', type: 'textarea', required: true, label: 'Text' }],
}
export const contentFields: Field[] = [
  { name: 'title', type: 'text', required: true, label: 'Name / Titel' },
  { name: 'slug', type: 'text', required: true, unique: true, index: true,
    validate: (value: string | null | undefined) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value || '') || 'Bitte Kleinbuchstaben, Zahlen und Bindestriche verwenden.',
    admin: { description: 'Bestimmt die URL. Nach Veröffentlichung möglichst nicht ändern.' } },
  { name: 'heading', type: 'text', required: true, label: 'Überschrift' },
  { name: 'intro', type: 'textarea', required: true, label: 'Einleitung' },
  { name: 'image', type: 'upload', relationTo: 'media', label: 'Hauptbild' },
  { name: 'featured', type: 'checkbox', label: 'Auf der Startseite anzeigen', defaultValue: false },
  { name: 'order', type: 'number', defaultValue: 0, label: 'Sortierung' },
  { name: 'sections', type: 'array', label: 'Inhaltsabschnitte', fields: [
    { name: 'eyebrow', type: 'text', label: 'Kleine Überschrift' },
    { name: 'heading', type: 'text', label: 'Überschrift' },
    { name: 'tone', type: 'select', defaultValue: 'light', options: [
      { label: 'Hell', value: 'light' }, { label: 'Abgesetzt', value: 'muted' }, { label: 'Dunkel', value: 'dark' },
    ] },
    paragraphs,
    { name: 'items', type: 'array', label: 'Karten / Aufzählungen', fields: [
      { name: 'heading', type: 'text', label: 'Überschrift' }, paragraphs,
    ] },
    { name: 'content', type: 'richText', label: 'Zusätzlicher Inhalt' },
  ] },
  { name: 'faq', type: 'array', label: 'Häufige Fragen', fields: [
    { name: 'question', type: 'text', required: true, label: 'Frage' },
    { name: 'answer', type: 'textarea', required: true, label: 'Antwort' },
  ] },
  seo,
]
