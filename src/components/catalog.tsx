import Link from 'next/link'
import type { Service, Reference, SiteSetting } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Media } from './Media'
import { Badge, Button, CTA, TestimonialCard } from './ui'
export const categoryLabels = { web:'Webentwicklung', app:'App-Entwicklung', seo:'SEO', software:'Individual-Software' }
export const serviceHighlights: Record<string, string[]> = {
  webentwicklung: ['Individuelles Design nach Maß', 'Einfache Selbstpflege (CMS)', 'Responsive & blitzschnell'],
  'app-entwicklung': ['iOS & Android aus einer Hand', 'Intuitive Bedienung für Kunden', 'App Store & Play Store Release'],
  suchmaschinenoptimierung: ['Lokale Google-Sichtbarkeit', 'Relevante Suchbegriffe & Traffic', 'Technische SEO-Optimierung'],
  'individual-software': ['Digitale Workflows & Portale', 'Automatisierung manueller Tasks', 'Sichere API-Schnittstellen'],
  webdesign: ['Modernes UI/UX-Konzept', 'Markenorientierte Bildsprache', 'Optimiert für hohe Conversion'],
}
export function ServiceCards({ services }: { services:Service[] }) {
  return <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{services.map((s,index)=>{
    const highlights = serviceHighlights[s.slug]
    return <Link href={`/leistungen/${s.slug}`} key={s.id} className="group relative flex h-full flex-col rounded-3xl border border-neutral-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-400/80 hover:shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/80 dark:hover:border-lime-400/60 dark:hover:shadow-[0_10px_30px_-10px_rgba(163,230,53,0.15)]">
      <div className="flex items-center justify-between">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-100 text-xs font-bold text-lime-800 dark:bg-lime-950/80 dark:text-lime-300 font-display">{String(index+1).padStart(2,'0')}</span>
      </div>
      <Media media={s.image} className="my-6 aspect-[4/3] w-full object-contain transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 23vw" />
      <h3 className="font-display text-2xl font-bold [text-wrap:balance]">{s.title}</h3>
      <p className="mt-3 flex-grow text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 [text-wrap:pretty]">{s.intro}</p>
      {highlights && (
        <ul className="mt-5 space-y-2 border-t border-neutral-100 pt-5 text-xs text-neutral-600 dark:border-neutral-800/80 dark:text-neutral-400">
          {highlights.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="font-bold text-lime-600 dark:text-lime-400">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      <span className="mt-6 flex items-center gap-1 font-display font-semibold text-neutral-900 transition-colors group-hover:text-lime-700 dark:text-neutral-100 dark:group-hover:text-lime-400">
        Mehr erfahren <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  })}</div>
}
export function ReferenceCard({ reference:r }: { reference:Reference }) {
  return <Link href={`/referenzen/${r.slug}`} className="group grid overflow-hidden rounded-3xl border-2 border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:border-neutral-900 hover:shadow-[8px_8px_0px_0px_#a3e635] dark:border-neutral-800 dark:bg-neutral-900 lg:grid-cols-2"><div className="h-64 overflow-hidden bg-neutral-900 p-8 sm:h-80 lg:h-full lg:min-h-[26rem]"><Media media={r.image} className="h-full w-full rounded-2xl object-cover object-top transition-transform group-hover:scale-105" /></div><div className="flex flex-col justify-center p-8 lg:p-12"><Badge>{categoryLabels[r.category]}</Badge><h2 className="mb-3 mt-4 font-display text-2xl font-bold xl:text-4xl">{r.title}</h2><p className="leading-relaxed text-neutral-600 dark:text-neutral-400">{r.intro}</p><span className="mt-8 font-display font-semibold">Details ansehen →</span></div></Link>
}
export function Detail({ item,reference=false,settings }: { item:Service|Reference; reference?:boolean; settings:SiteSetting }) {
  const r=item as Reference
  return <>
    <section className="relative overflow-hidden"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime-300/40 blur-3xl dark:bg-lime-500/10" /><div className={`relative mx-auto max-w-screen-xl px-6 pb-20 pt-32 ${reference ? 'text-center':'grid items-center gap-14 lg:grid-cols-2 lg:gap-20'}`}>
      <div>{reference && <Media media={r.logo} className="mx-auto mb-6 h-20 w-auto max-w-xs object-contain" sizes="200px" />}<Badge>{reference ? categoryLabels[r.category]:'Unsere Leistungen'}</Badge><h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight lg:text-5xl">{item.heading}</h1><p className={`mt-5 leading-relaxed text-neutral-600 dark:text-neutral-400 lg:text-lg ${reference ? 'mx-auto max-w-3xl':'max-w-xl'}`}>{item.intro}</p>{!reference && <div className="mt-8 flex flex-wrap gap-4"><Button>Kostenloses Erstgespräch</Button><Button secondary href="/referenzen">Unsere Referenzen</Button></div>}</div>
      {reference ? <Media media={item.image} className="mx-auto mt-14 max-h-[600px] w-full max-w-4xl rounded-3xl object-contain" priority /> : <div className="relative"><div aria-hidden="true" className="absolute -inset-3 rotate-2 rounded-[2rem] bg-lime-300" /><Media media={item.image} className="relative w-full -rotate-1 rounded-[2rem]" priority /></div>}
    </div></section>
    {reference && Boolean(r.facts?.length) && <div className="mx-auto grid max-w-screen-xl gap-4 px-6 pb-14 sm:grid-cols-3">{r.facts?.map((fact,i)=><div key={fact.id || i} className="rounded-2xl border-2 border-neutral-200 p-6 dark:border-neutral-800"><p className="font-display text-xs font-bold uppercase tracking-widest text-neutral-400">{fact.label}</p><p className="mt-2 font-display text-lg font-bold">{fact.value}</p></div>)}</div>}
    {item.sections?.map((section,index)=><section key={section.id || index} className={`px-6 py-20 ${section.tone==='dark' ? 'bg-neutral-900 text-white':section.tone==='muted' ? 'bg-neutral-50 dark:bg-neutral-900/40':''}`}><div className="mx-auto max-w-screen-xl">
      {section.eyebrow && <Badge>{section.eyebrow}</Badge>}{section.heading && <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight lg:text-4xl">{section.heading}</h2>}
      {section.paragraphs?.map((p,i)=><p key={p.id || i} className={`mt-5 max-w-4xl whitespace-pre-line leading-relaxed ${section.tone==='dark' ? 'text-neutral-300':'text-neutral-600 dark:text-neutral-400'}`}>{p.text}</p>)}
      {Boolean(section.items?.length) && <div className="mt-12 grid gap-6 md:grid-cols-3">{section.items?.map((card,i)=><div key={card.id || i} className={`rounded-3xl border-2 p-8 ${section.tone==='dark' ? 'border-neutral-800 bg-neutral-800/50':'border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'}`}><span aria-hidden="true" className="font-display text-5xl font-bold text-lime-400">{String(i+1).padStart(2,'0')}</span>{card.heading && <h3 className="mt-5 font-display text-xl font-bold">{card.heading}</h3>}{card.paragraphs?.map((p,i)=><p key={p.id || i} className={`mt-3 whitespace-pre-line text-sm leading-relaxed ${section.tone==='dark'?'text-neutral-300':'text-neutral-600 dark:text-neutral-400'}`}>{p.text}</p>)}</div>)}</div>}
      {section.content && <RichText data={section.content} className="rich-text mt-8" />}
    </div></section>)}
    {Boolean(item.faq?.length) && <section className="bg-neutral-50 px-6 py-20 dark:bg-neutral-900/40"><div className="mx-auto max-w-screen-xl"><Badge>FAQ</Badge><h2 className="mt-4 font-display text-3xl font-bold">Häufige Fragen zu {item.title}</h2><div className="mt-12 max-w-3xl space-y-3">{item.faq?.map((faq,i)=><details key={faq.id || i} className="rounded-2xl border-2 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"><summary className="cursor-pointer px-6 py-5 font-display font-bold">{faq.question}</summary><p className="px-6 pb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{faq.answer}</p></details>)}</div></div></section>}
    {reference && r.testimonial && typeof r.testimonial!=='number' && <section className="mx-auto max-w-3xl px-6 pt-20"><TestimonialCard item={r.testimonial} /></section>}
    <CTA settings={settings} />
  </>
}
