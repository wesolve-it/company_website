import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getDetail,getHome,getPage,getReferences,getServices,getSettings,getTestimonials } from '@/lib/cms'
import { HomePage } from '@/components/HomePage'
import { Detail,ServiceCards } from '@/components/catalog'
import { ReferenceList } from '@/components/ReferenceList'
import { Badge,Button,CTA } from '@/components/ui'
import { ContactForm } from '@/components/forms'
export const dynamic='force-dynamic'
type Props={params:Promise<{slug?:string[]}>}
const summaries:Record<string,{title:string;description:string}> = {
  leistungen:{title:'Webseiten, Apps & SEO für kleine Unternehmen | wesolve-IT',description:'Unsere Leistungen: Webentwicklung, Apps, SEO, Webdesign und individuelle Software.'},
  referenzen:{title:'Referenzen: Webseiten & Apps für kleine Unternehmen | wesolve-IT',description:'Echte Projekte statt Versprechen: Webseiten, Apps und Software für kleine Unternehmen.'},
  kontakt:{title:'Kontakt: Kostenloses Erstgespräch vereinbaren | wesolve-IT',description:'Erzähl uns von deinem Projekt – per Formular oder WhatsApp. Unverbindlich und auf Augenhöhe.'},
  'thank-you':{title:'Vielen Dank | wesolve-IT',description:'Deine Anfrage wurde gespeichert.'},
}
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {slug=[]}=await params,path=slug.join('/')
  let data:any=path==='' ? await getHome() : slug.length===2 && ['leistungen','referenzen'].includes(slug[0]) ? await getDetail(slug[0]==='leistungen'?'services':'references',slug[1]) : slug.length===1 && !summaries[path] ? await getPage(path) : null
  const meta=data?.seo || summaries[path]
  const title=meta?.title || data?.title || 'Seite nicht gefunden | wesolve-IT'
  const description=meta?.description || data?.intro || ''
  return {title,description,alternates:{canonical:'/'+path},openGraph:{title,description,url:'/'+path,...(meta?.image && typeof meta.image!=='number' && meta.image.url ? {images:[{url:meta.image.url}]}:{})},twitter:{title,description},...(path==='thank-you' || (!data && !summaries[path]) ? {robots:{index:false,follow:false}} : {})}
}
function Heading({badge,heading,intro}:{badge:string;heading:string;intro:string}) {
  return <section className="relative overflow-hidden"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime-300/40 blur-3xl dark:bg-lime-500/10" /><div className="relative mx-auto max-w-screen-xl px-6 pb-14 pt-32"><Badge>{badge}</Badge><h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight lg:text-5xl">{heading}</h1><p className="mt-5 max-w-3xl leading-relaxed text-neutral-600 dark:text-neutral-400 lg:text-lg">{intro}</p></div></section>
}
export default async function Page({params}:Props) {
  const {slug=[]}=await params,path=slug.join('/'),settings=await getSettings()
  if(!path) {
    const [home,services,references,testimonials]=await Promise.all([getHome(),getServices(),getReferences(),getTestimonials()])
    return <HomePage home={home} services={services.docs} references={references.docs} testimonials={testimonials.docs} settings={settings} />
  }
  if(slug.length===2 && ['leistungen','referenzen'].includes(slug[0])) {
    const item=await getDetail(slug[0]==='leistungen'?'services':'references',slug[1]);if(!item)notFound()
    return <Detail item={item} reference={slug[0]==='referenzen'} settings={settings} />
  }
  if(path==='leistungen') {
    const services=await getServices(); return <><Heading badge="Unsere Leistungen" heading="Digitale Lösungen, die dein Unternehmen voranbringen" intro="Ob Webseite, App oder individuelle Software: Wir kümmern uns um deinen digitalen Auftritt – verständlich, verlässlich und aus einer Hand." /><div className="mx-auto max-w-screen-xl px-6 pb-20"><ServiceCards services={services.docs} /></div><CTA settings={settings} /></>
  }
  if(path==='referenzen') {
    const references=await getReferences(); return <><Heading badge="Referenzen" heading="Vom Familienbetrieb bis zum Bundesliga-Verein: erfolgreiche Projekte für kleine Unternehmen" intro="Webseiten, Apps und Software, die im Alltag echter Betriebe funktionieren. Schau dir an, was wir umgesetzt haben." /><ReferenceList references={references.docs} /><CTA settings={settings} /></>
  }
  if(path==='kontakt')return <><Heading badge="Kontakt" heading="Lass uns zusammen die digitale Zukunft gestalten" intro="Ob Webseite, App oder individuelle Software: Erzähl uns von deiner Idee – wir melden uns schnell und unkompliziert zurück." /><div className="mx-auto max-w-screen-md px-6 pb-24">{settings.whatsapp && <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" data-umami-event="whatsapp-klick" className="mb-10 block rounded-full bg-[#25D366] px-6 py-4 text-center font-display font-semibold text-white">Melde dich bei uns über WhatsApp ↗</a>}<ContactForm /><p className="mt-6 text-center text-sm">Oder direkt per E-Mail: <a className="underline" href={`mailto:${settings.email}`}>{settings.email}</a></p></div></>
  if(path==='thank-you')return <><Heading badge="Vielen Dank" heading="Deine Anfrage ist bei uns angekommen." intro="Wir melden uns so bald wie möglich bei dir zurück." /><div className="mx-auto max-w-screen-xl px-6 pb-24"><Button href="/">Zur Startseite</Button></div></>
  if(slug.length===1) {
    const page=await getPage(path);if(page)return <section className="rich-text mx-auto max-w-screen-md px-6 pb-24 pt-36">{!page.content.root.children.some(node=>node.type==='heading' && 'tag' in node && node.tag==='h1') && <h1>{page.title}</h1>}<RichText data={page.content} />{path==='quick-check' && <div className="mt-10"><Button>Jetzt Quick-Check anfragen</Button></div>}</section>
  }
  notFound()
}
