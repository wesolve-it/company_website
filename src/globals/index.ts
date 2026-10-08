import type { GlobalConfig } from 'payload'
import { staff } from '../lib/access'
import { seo } from '../collections/contentFields'
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings', label: 'Seiteneinstellungen',
  access: { read: () => true, update: staff },
  fields: [
    { name: 'brand', type: 'text', defaultValue: 'wesolve-IT', required: true },
    { name: 'description', type: 'textarea', label: 'Kurzbeschreibung' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'whatsapp', type: 'text', label: 'WhatsApp-Nummer (nur Ziffern)' },
    { name: 'linkedin', type: 'text' }, { name: 'instagram', type: 'text' },
    { name: 'navigation', type: 'array', label: 'Navigation', fields: [
      { name: 'label', type: 'text', required: true }, { name: 'url', type: 'text', required: true },
    ] },
    { name: 'ctaHeading', type: 'text', required: true, label: 'Kontaktaufruf: Überschrift' },
    { name: 'ctaText', type: 'textarea', label: 'Kontaktaufruf: Text' },
    { name: 'newsletterEnabled', type: 'checkbox', defaultValue: false, label: 'Newsletter-Anmeldung anzeigen',
      admin: { description: 'Erst aktivieren, wenn NEWSLETTER_ENDPOINT konfiguriert und der Bestätigungsprozess eingerichtet ist.' } },
  ],
}
export const Home: GlobalConfig = {
  slug: 'home', label: 'Startseite', access: { read: () => true, update: staff },
  fields: [
    { name: 'badge', type: 'text', required: true, label: 'Kleine Überschrift' },
    { name: 'heading', type: 'text', required: true, label: 'Hauptüberschrift' },
    { name: 'intro', type: 'textarea', required: true, label: 'Einleitung' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Hauptbild' },
    { name: 'servicesHeading', type: 'text', required: true, label: 'Leistungsüberschrift' },
    { name: 'servicesIntro', type: 'textarea', label: 'Leistungseinleitung' },
    { name: 'referencesHeading', type: 'text', required: true, label: 'Referenzüberschrift' },
    { name: 'referencesIntro', type: 'textarea', label: 'Referenzeinleitung' },
    seo,
  ],
}
