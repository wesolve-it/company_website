import Link from 'next/link'
import type { SiteSetting, Testimonial } from '@/payload-types'
import { Media } from './Media'
export function Badge({ children }: { children:React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-300/60 bg-lime-100/80 px-3.5 py-1 font-display text-xs font-bold uppercase tracking-wider text-lime-900 backdrop-blur-sm dark:border-lime-500/20 dark:bg-lime-950/70 dark:text-lime-300">{children}</span>
}
export function Button({ children, href='/kontakt', secondary=false }: { children:React.ReactNode; href?:string; secondary?:boolean }) {
  return <Link href={href} className={`group ${secondary ? 'button-secondary' : 'button-primary'}`} data-umami-event={href === '/kontakt' ? 'cta-erstgespraech' : undefined}>{children}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1"> →</span></Link>
}
export function CTA({ settings }: { settings:SiteSetting }) {
  return <section className="px-6 py-24"><div className="relative mx-auto max-w-screen-xl overflow-hidden rounded-[2.5rem] bg-neutral-900 px-6 py-16 text-center text-white lg:py-20 border border-neutral-800 shadow-2xl">
    <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
    <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
    <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-bold lg:text-4xl [text-wrap:balance]">{settings.ctaHeading}</h2>
    <p className="relative mx-auto mt-4 max-w-xl text-neutral-300 [text-wrap:pretty]">{settings.ctaText}</p>
    <div className="relative mt-8 flex flex-wrap justify-center gap-4">
      <Link href="/kontakt" data-umami-event="cta-erstgespraech" className="button-primary !text-base">Kostenloses Erstgespräch sichern →</Link>
      <Link href="/quick-check" className="button-secondary !border-neutral-700 !text-white hover:!border-lime-400 hover:!bg-lime-400 hover:!text-neutral-950">Zum kostenlosen Quick-Check</Link>
    </div>
    <div className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-neutral-400">
      <span className="flex items-center gap-1.5"><span className="text-lime-400">✓</span> Antwort innerhalb von 24h</span>
      <span className="flex items-center gap-1.5"><span className="text-lime-400">✓</span> 100% kostenlos & unverbindlich</span>
      <span className="flex items-center gap-1.5"><span className="text-lime-400">✓</span> Direkter Entwicklerkontakt</span>
    </div>
  </div></section>
}
export function TestimonialCard({ item }: { item:Testimonial }) {
  return <figure className="flex h-full flex-col rounded-3xl border border-neutral-200/80 bg-neutral-50/70 p-8 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/60">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-amber-400" aria-label="5 von 5 Sternen">
        {'★★★★★'}
      </div>
      <span aria-hidden="true" className="font-display text-4xl leading-none text-lime-400/80">„</span>
    </div>
    <blockquote className="mt-4 flex-grow text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 [text-wrap:pretty]">{item.quote}</blockquote>
    <figcaption className="mt-8 flex items-center gap-4 border-t border-neutral-200/60 pt-4 dark:border-neutral-800">
      <Media media={item.image} className="h-14 w-14 rounded-2xl object-cover shrink-0 border border-neutral-200 dark:border-neutral-800" sizes="56px" />
      <div>
        <p className="font-display text-sm font-bold text-neutral-900 dark:text-white">{item.name}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.position}</p>
      </div>
    </figcaption>
  </figure>
}
