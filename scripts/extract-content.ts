/** One-time importer for the existing HTML. Output is committed; runtime never reads legacy files. */
import fs from 'node:fs'
import path from 'node:path'
import { load, type CheerioAPI } from 'cheerio'
import type { Element } from 'domhandler'
const text = (s: string) => s.replace(/\s+/g, ' ').trim()
const imagePath = (s?: string) => s ? '/assets/' + s.split('assets/')[1] : undefined
const page = (file: string) => load(fs.readFileSync(path.join('legacy', file), 'utf8'))
const seo = ($: CheerioAPI) => ({ title: text($('title').text()), description: $('meta[name="description"]').attr('content') || '' })
const media = new Map<string, string>()
function img($: CheerioAPI, el: Element | undefined) {
  if (!el) return undefined
  const url = imagePath($(el).attr('src'))
  if (url) media.set(url, $(el).attr('alt') || path.basename(url))
  return url
}
function paragraphs($: CheerioAPI, elements: Element[]) {
  return elements.map(el => ({ text: text($(el).text()) })).filter(p => p.text)
}
function detail(file: string, order: number, reference: boolean) {
  const $ = page(file), h1 = $('h1').first(), intro = h1.parent().children('p').first()
  const faq = $('[x-data]').filter((_, el) => Boolean($(el).children('button').length)).map((_, el) => ({
    question: text($(el).children('button').text()), answer: text($(el).children('p').text()),
  })).get()
  const sections = $('body section').toArray().filter(el => !$(el).find('h1, blockquote, [x-data]').length).map(el => {
    const section = $(el), headingElements = section.find('h2,h3').toArray()
    const mainHeading = headingElements.find(h => !$(h).parent().hasClass('rounded-3xl'))
    const cards = section.find('div.rounded-3xl,div.rounded-2xl').filter((_, c) =>
      Boolean($(c).children('p,h2,h3').length) && !$(c).find('div.rounded-3xl,div.rounded-2xl').length).toArray()
    const items = cards.map(c => ({ heading: text($(c).children('h2,h3').text()), paragraphs: paragraphs($, $(c).children('p').toArray()) }))
    const cardParagraphs = new Set(cards.flatMap(c => $(c).find('p').toArray()))
    return {
      heading: mainHeading ? text($(mainHeading).text()) : '',
      eyebrow: text(section.find('span.rounded-full').first().text()),
      tone: section.hasClass('bg-neutral-900') ? 'dark' : section.hasClass('bg-neutral-50') ? 'muted' : 'light',
      paragraphs: paragraphs($, section.find('p,li').toArray().filter(p => !cardParagraphs.has(p) && !$(p).parents('li').length)),
      items,
    }
  }).filter(s => s.heading || s.items.length || s.paragraphs.length)
  const facts = $('body > div').filter((_, el) => Boolean($(el).find('.sm\\:grid-cols-3').length)).find('div.rounded-2xl').map((_, c) => ({
    label: text($(c).children('p').first().text()), value: text($(c).children('p').last().text()),
  })).get()
  const bodyImages = $('body img').toArray()
  const hero = reference ? bodyImages.find(i => !/logo/i.test($(i).attr('src') || '')) : bodyImages[0]
  return { title: reference ? referenceNames[path.basename(file, '.html')] : text(h1.text()), slug: path.basename(file, '.html'),
    heading: text(h1.text()), intro: text(intro.text()), image: img($, hero), order, featured: order < (reference ? 2 : 4),
    sections, faq, seo: seo($),
    ...(reference ? { category: categories[path.basename(file, '.html')] || 'web', logo: img($, bodyImages.find(i => /logo|maxrund|dieschoko|fulllogo/i.test($(i).attr('src') || ''))), facts } : {}),
  }
}
const referenceNames: Record<string,string> = { 'fc-nuernberg': '1. FC Nürnberg', alfafood: 'Alfafood', 'sportweber-schnaittach': 'Sport-Weber Schnaittach', dieschokoecke: 'dieschokoecke', rootd: 'ROOTD.', 'rooted-merch': 'Rooted Merch', 'sportweber-bikeservice': 'Sport-Weber Bikeservice', 'tobias-herrmann': 'Tobias Herrmann', 'lubu-restaurant': 'LU-BU Restaurant', 'brotkultur-pur': 'Brotkultur Pur' }
const categories: Record<string,string> = { 'fc-nuernberg': 'app', 'sportweber-schnaittach': 'software', 'sportweber-bikeservice': 'software' }
const services = ['webentwicklung','app-entwicklung','suchmaschinenoptimierung','individual-software','webdesign'].map((s,i) => detail(`leistungen/${s}.html`,i,false))
const references = Object.keys(referenceNames).map((s,i) => detail(`referenzen/${s}.html`,i,true))
const $ = page('index.html')
const home = { badge: text($('h1').parent().children('span').first().text()), heading: text($('h1').text()), intro: text($('h1').parent().children('p').first().text()), image: img($, $('section').first().find('img').first()[0]),
  servicesHeading: text($('h2').eq(0).text()), servicesIntro: text($('h2').eq(0).parent().children('p').first().text()),
  referencesHeading: text($('h2').filter((_,e) => $(e).text().includes('Kunden, die')).first().text()), referencesIntro: 'Lass dich inspirieren und starte jetzt dein eigenes digitales Projekt mit uns.', seo: seo($),
}
const testimonials = $('blockquote').map((i, el) => {
  const card = $(el).closest('section'), name = card.find('p.font-semibold').last()
  return { name: text(name.clone().find('span,br').remove().end().text()), position: text(name.find('span').text()), quote: text($(el).text()), image: img($, card.find('img')[0]), order: i }
}).get()
// Original testimonials use paragraphs rather than blockquotes.
if (!testimonials.length) {
  $('section').filter((_,el) => Boolean($(el).children('span').filter((_,s) => $(s).text().trim() === '„').length)).each((i, el) => {
    const card = $(el), p = card.find('p')
    testimonials.push({ name: text(p.eq(1).clone().find('span,br').remove().end().text()), position: text(p.eq(1).find('span').text()), quote: text(p.eq(0).text()), image: img($, card.find('img')[0]), order: i })
  })
}
const process = $('h2').filter((_,e) => $(e).text().includes('Kein Agentur')).closest('section').find('h3').map((_,h) => ({ heading: text($(h).text()), text: text($(h).next('p').text()) })).get().slice(0,3)
function inline($: CheerioAPI, element: Element): any[] {
  return $(element).contents().toArray().flatMap((n): any[] => {
    if (n.type === 'text') return n.data.trim() ? [{ type:'text', version:1, text:n.data.replace(/\s+/g,' '), format:0, detail:0, mode:'normal', style:'' }] : []
    if (n.type !== 'tag') return []
    if (n.tagName === 'br') return [{ type:'linebreak', version:1 }]
    const children = inline($, n)
    if (n.tagName === 'a') return [{ type:'link', version:3, format:'', indent:0, direction:null, fields:{ linkType:'custom', url:$(n).attr('href'), newTab:$(n).attr('target') === '_blank' }, children }]
    if (['strong','b'].includes(n.tagName)) return children.map(c => c.type === 'text' ? { ...c, format:1 } : c)
    return children
  })
}
function lexical($: CheerioAPI, element: Element) {
  const nodes = $(element).find('h1,h2,h3,p,li').toArray().filter(e => !$(e).parents('p,li').length).map(e => ({
    type: /^h/.test(e.tagName) ? 'heading' : 'paragraph', version: 1, format: '', indent: 0, direction: null,
    ...(/^h/.test(e.tagName) ? { tag: e.tagName } : { textFormat: 0, textStyle: '' }),
    children: inline($, e),
  })).filter(n => n.children.length)
  return { root: { type: 'root', version: 1, format: '', indent: 0, direction: null, children: nodes } }
}
const pages = ['impressum','datenschutz','quick-check'].map(slug => {
  const $ = page(`${slug}.html`); $('script,#footer-placeholder').remove()
  return { slug, title: text($('h1').text()), seo: seo($), content: lexical($, $('body')[0]) }
})
const settings = { brand:'wesolve-IT', description:'Deine Digitalagentur für kleine Unternehmen – Webseiten, Apps & SEO, die für mehr Kunden und mehr Umsatz sorgen.', email:'info@wesolve-it.com', phone:'+49 (0) 152 02721146', whatsapp:'4915202721146', linkedin:'https://www.linkedin.com/company/wesolve-it/', instagram:'https://www.instagram.com/wesolveit_official/', navigation:[{label:'Home',url:'/'},{label:'Kunden',url:'/referenzen'},{label:'Leistungen',url:'/leistungen'},{label:'Kontakt',url:'/kontakt'}], ctaHeading:'Bereit, dein Unternehmen digital voranzubringen?', ctaText:'Unverbindlich, ehrlich und auf Augenhöhe – erzähl uns von deinem Projekt.', newsletterEnabled:false }
fs.writeFileSync('src/content/initial.json',JSON.stringify({ services,references,home,testimonials,process,pages,settings,media:Array.from(media,([url,alt])=>({url,alt})) },null,2)+'\n')
console.log(`Import vorbereitet: ${services.length} Leistungen, ${references.length} Referenzen, ${testimonials.length} Kundenstimmen, ${pages.length} Seiten, ${media.size} Medien.`)
