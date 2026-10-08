import Link from 'next/link'
import type { SiteSetting, Testimonial } from '@/payload-types'
import { Media } from './Media'
export function Badge({ children }: { children:React.ReactNode }) {
  return <span className="inline-flex rounded-full bg-lime-100 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-lime-800 dark:bg-lime-950 dark:text-lime-300">{children}</span>
}
export function Button({ children, href='/kontakt', secondary=false }: { children:React.ReactNode; href?:string; secondary?:boolean }) {
  return <Link href={href} className={secondary ? 'button-secondary' : 'button-primary'} data-umami-event={href === '/kontakt' ? 'cta-erstgespraech' : undefined}>{children}<span aria-hidden="true"> →</span></Link>
}
export function CTA({ settings }: { settings:SiteSetting }) {
  return <section className="px-6 py-24"><div className="relative mx-auto max-w-screen-xl overflow-hidden rounded-[2.5rem] bg-neutral-900 px-6 py-16 text-center text-white lg:py-20">
    <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
    <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-bold lg:text-4xl">{settings.ctaHeading}</h2>
    <p className="relative mx-auto mt-4 max-w-xl text-neutral-300">{settings.ctaText}</p>
    <div className="relative mt-8 flex flex-wrap justify-center gap-4"><Link href="/kontakt" className="rounded-full bg-lime-400 px-8 py-4 font-display font-bold text-neutral-900 hover:bg-lime-300">Kostenloses Erstgespräch sichern →</Link><Link href="/quick-check" className="rounded-full border-2 border-white px-7 py-4 font-display font-semibold hover:text-lime-300">Zum kostenlosen Quick-Check</Link></div>
  </div></section>
}
export function TestimonialCard({ item }: { item:Testimonial }) {
  return <figure className="flex h-full flex-col rounded-3xl bg-neutral-50 p-8 dark:bg-neutral-900"><span aria-hidden="true" className="font-display text-6xl text-lime-400">„</span><blockquote className="flex-grow text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{item.quote}</blockquote><figcaption className="mt-8 flex items-center gap-4"><Media media={item.image} className="h-14 w-14 rounded-2xl object-contain" sizes="56px" /><div><p className="font-display text-sm font-semibold">{item.name}</p><p className="text-sm text-neutral-500 dark:text-neutral-400">{item.position}</p></div></figcaption></figure>
}
