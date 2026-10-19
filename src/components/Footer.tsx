import Link from 'next/link'
import type { SiteSetting, Service } from '@/payload-types'
import { PrivacyButton } from './Privacy'
import { NewsletterForm } from './forms'
import { safeLink } from '@/lib/links'
export function Footer({ settings,services }: { settings:SiteSetting; services:Service[] }) {
  return <footer className="relative overflow-hidden bg-neutral-900 px-6 pb-8 pt-16 text-white"><div className="mx-auto max-w-screen-xl">
    <div className="flex flex-col gap-12 md:flex-row md:justify-between">
      <div className="max-w-sm">
        <img src="/assets/img/wesolve_gray_icon.svg" alt={settings.brand} width="64" height="64" className="h-14 w-14 brightness-125" />
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">{settings.description}</p>
        <div className="mt-4 space-y-1 text-sm text-neutral-300">
          <p><a href={`mailto:${settings.email}`} className="hover:text-lime-300 transition-colors">✉ {settings.email}</a></p>
          {settings.phone && <p><a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-lime-300 transition-colors">☎ {settings.phone}</a></p>}
        </div>
        <div className="mt-6 flex gap-4">{settings.linkedin && <a href={safeLink(settings.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-lime-300">LinkedIn ↗</a>}{settings.instagram && <a href={safeLink(settings.instagram)} target="_blank" rel="noopener noreferrer" className="hover:text-lime-300">Instagram ↗</a>}</div>
        {settings.newsletterEnabled && <NewsletterForm />}
      </div>
      <div className="flex flex-wrap gap-12 sm:gap-20"><nav aria-label="Menü"><p className="footer-heading">Menü</p><ul className="footer-links">{settings.navigation?.map(link=><li key={link.id || link.url}><Link href={safeLink(link.url)}>{link.label}</Link></li>)}</ul></nav><nav aria-label="Leistungen"><p className="footer-heading">Leistungen</p><ul className="footer-links">{services.map(s=><li key={s.id}><Link href={`/leistungen/${s.slug}`}>{s.title}</Link></li>)}</ul></nav><nav aria-label="Rechtliches"><p className="footer-heading">Rechtliches</p><ul className="footer-links"><li><Link href="/impressum">Impressum</Link></li><li><Link href="/datenschutz">Datenschutz</Link></li><li><PrivacyButton /></li></ul></nav></div></div>
    <div className="mt-14 flex flex-col justify-between gap-3 border-t border-neutral-800 pt-6 text-xs text-neutral-400 sm:flex-row"><p>© {new Date().getFullYear()} {settings.brand}. Alle Rechte vorbehalten.</p><p>Mit viel <span className="text-lime-400">✦</span> und Kaffee gebaut.</p></div>
  </div></footer>
}
