import Link from 'next/link'
import type { Home,Service,Reference,Testimonial,SiteSetting } from '@/payload-types'
import { Media } from './Media'
import { Badge,Button,CTA,TestimonialCard } from './ui'
import { ServiceCards, categoryLabels } from './catalog'
import initial from '@/content/initial.json'
export function HomePage({ home,services,references,testimonials,settings }: { home:Home; services:Service[]; references:Reference[]; testimonials:Testimonial[]; settings:SiteSetting }) {
  return <>
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl dark:bg-lime-500/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-32 h-[28rem] w-[28rem] rounded-full bg-lime-300/25 blur-3xl dark:bg-emerald-500/10" />
      <div className="relative mx-auto grid max-w-screen-xl items-center gap-14 px-6 pb-24 pt-36 lg:grid-cols-2 lg:gap-12 lg:pt-44">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-300/60 bg-lime-50/90 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-lime-900 shadow-sm backdrop-blur-sm dark:border-lime-500/20 dark:bg-lime-950/70 dark:text-lime-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500 dark:bg-lime-400" />
            </span>
            <span>{home.badge}</span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl xl:text-6xl [text-wrap:balance]">
            {home.heading.split('–')[0]}
            {home.heading.includes('–') && (
              <>
                – <span className="text-highlight">
                  <span>{home.heading.split('–').slice(1).join('–')}</span>
                </span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg [text-wrap:pretty]">
            {home.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/kontakt">Beratungsgespräch vereinbaren</Button>
            <Button href="/referenzen" secondary>Unsere Projekte</Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-100 text-xs font-bold text-lime-800 dark:bg-lime-950 dark:text-lime-400">✓</span>
              <span>Vertraut vom <strong>1. FC Nürnberg</strong>, <strong>Alfafood</strong> & Co.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-100 text-xs font-bold text-lime-800 dark:bg-lime-950 dark:text-lime-400">✓</span>
              <span>Persönlich & direkt mit dem Entwickler</span>
            </div>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-2 rotate-1 rounded-[2.5rem] bg-gradient-to-tr from-lime-400/30 via-emerald-400/20 to-lime-200/30 blur-sm dark:from-lime-500/20 dark:to-emerald-500/10" />
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-neutral-900 p-2 shadow-2xl dark:border-neutral-800">
            <Media media={home.image} className="relative w-full rounded-[1.75rem] object-cover" priority />
          </div>
          <div className="absolute -left-4 top-8 animate-float rounded-2xl border border-neutral-200/80 bg-white/95 px-4 py-2.5 font-display shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime-100 text-sm font-bold text-lime-800 dark:bg-lime-950 dark:text-lime-400">↗</span>
              <div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Neue Kundenanfragen</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">+140% Wachstum</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-3 bottom-8 animate-float-delayed rounded-2xl border border-neutral-200/80 bg-white/95 px-4 py-2.5 font-display shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-sm font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">★</span>
              <div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Bei Google gefunden</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">Top 3 Platzierung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-neutral-200/60 bg-neutral-50/70 px-6 py-12 dark:border-neutral-800/80 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-screen-xl">
        <h2 className="text-center font-display text-xs font-bold uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">Diese Kunden vertrauen uns bereits</h2>
        <div className="mx-auto mt-8 flex max-w-screen-xl flex-wrap items-center justify-center gap-8 md:gap-14">
          {references.filter(r=>r.logo).slice(0,7).map(r=>(
            <Link key={r.id} href={`/referenzen/${r.slug}`} title={r.title} className="group flex items-center justify-center rounded-xl p-2 transition-all duration-300">
              <div className="flex h-12 w-28 items-center justify-center grayscale opacity-75 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 dark:brightness-0 dark:invert dark:opacity-75 dark:group-hover:opacity-100">
                <Media media={r.logo} className="max-h-12 w-auto max-w-[112px] object-contain" sizes="112px" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-screen-xl px-6 py-24">
      <Badge>Unsere Leistungen</Badge>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold lg:text-5xl [text-wrap:balance]">{home.servicesHeading}</h2>
      <p className="mb-14 mt-4 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400 [text-wrap:pretty]">{home.servicesIntro}</p>
      <ServiceCards services={services.filter(s=>s.featured)} />
    </section>

    <section className="bg-neutral-900 px-6 py-24 text-white border-y border-neutral-800">
      <div className="mx-auto max-w-screen-xl">
        <Badge>So arbeiten wir</Badge>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold lg:text-5xl [text-wrap:balance]">Kein Agentur-Blabla. Drei Schritte, und dein Projekt läuft.</h2>
        <p className="mt-4 max-w-3xl text-neutral-300 [text-wrap:pretty]">Bei uns sprichst du von Anfang an direkt mit dem Entwickler. Du weißt jederzeit, was passiert, was es kostet und wann es fertig ist.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {initial.process.map((step,i)=>(
            <div key={step.heading} className="relative rounded-3xl border border-neutral-800 bg-neutral-800/40 p-8 transition-all hover:border-neutral-700 hover:bg-neutral-800/70">
              <div className="flex items-center justify-between">
                <span className="font-display text-5xl font-bold text-lime-400">{String(i+1).padStart(2,'0')}</span>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Schritt {i+1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{step.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300 [text-wrap:pretty]">{step.text}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-lime-400/30 bg-gradient-to-r from-neutral-800/80 via-neutral-800/60 to-neutral-800/80 p-8 shadow-2xl lg:p-10">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-400/10 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-lime-300">
                <span>⚡ Kostenlos & unverbindlich</span>
                <span className="text-neutral-500">•</span>
                <span>Antwort in 48h</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-bold text-white [text-wrap:balance]">Noch nicht sicher, ob deine Idee umsetzbar ist?</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300 [text-wrap:pretty]">Mach den kostenlosen Quick-Check: Du bekommst innerhalb von 48 Stunden unsere ehrliche Einschätzung – direkt vom Entwickler und ohne Verkaufsdruck.</p>
            </div>
            <Link href="/quick-check" className="shrink-0 rounded-full bg-lime-400 px-7 py-3.5 font-display font-bold text-neutral-950 transition-all duration-200 hover:bg-lime-300 hover:shadow-[0_10px_25px_-5px_rgba(163,230,53,0.35)]">Zum kostenlosen Quick-Check →</Link>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-screen-xl px-6 py-24">
      <Badge>Referenzen</Badge>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold lg:text-5xl [text-wrap:balance]">{home.referencesHeading}</h2>
      <p className="mb-14 mt-4 text-neutral-600 dark:text-neutral-400 [text-wrap:pretty]">{home.referencesIntro}</p>
      <div className="grid gap-8 lg:grid-cols-2">
        {references.filter(r=>r.featured).map(r=>(
          <Link href={`/referenzen/${r.slug}`} key={r.id} className="group overflow-hidden rounded-3xl border border-neutral-200/90 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/80 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/90 dark:hover:border-lime-400/60">
            <div className="h-72 overflow-hidden bg-neutral-950/90 p-6 sm:h-80">
              <Media media={r.image} className="h-full w-full rounded-2xl object-cover object-top transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-8">
              <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 font-display text-xs font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                {categoryLabels[r.category] || 'Projekt'}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold text-neutral-900 dark:text-white [text-wrap:balance]">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 [text-wrap:pretty]">{r.intro}</p>
              <span className="mt-6 inline-flex items-center gap-1 font-display font-semibold text-neutral-900 transition-colors group-hover:text-lime-700 dark:text-neutral-100 dark:group-hover:text-lime-400">
                Details ansehen <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12">
        <Button secondary href="/referenzen">Mehr Erfolgsgeschichten ansehen</Button>
      </div>
    </section>

    <section className="mx-auto max-w-screen-xl px-6 pb-24">
      <Badge>Stimmen unserer Kunden</Badge>
      <h2 className="mt-4 font-display text-3xl font-bold lg:text-5xl [text-wrap:balance]">Das sagen unsere Kunden über die Zusammenarbeit</h2>
      <p className="mb-14 mt-4 text-neutral-600 dark:text-neutral-400 [text-wrap:pretty]">Echte Stimmen aus echten Projekten – vom Traditionsverein bis zum Familienbetrieb.</p>
      <div className="grid gap-6 xl:grid-cols-3">
        {testimonials.map(t=><TestimonialCard key={t.id} item={t} />)}
      </div>
    </section>

    <CTA settings={settings} />
  </>
}
