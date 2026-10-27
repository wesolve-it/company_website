import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import initial from '../src/content/initial.json'

const payload = await getPayload({ config })
try {
  const mediaIDs = new Map<string,number>()
  for (const medium of initial.media) {
    const filename = path.basename(medium.url)
    const found = await payload.find({ collection:'media', where:{ filename:{ equals: filename } }, limit:1 })
    const doc = found.docs[0] || await payload.create({ collection:'media', data:{ alt:medium.alt }, filePath:path.resolve('public' + medium.url) })
    mediaIDs.set(medium.url, doc.id)
  }
  const image = (url?: string) => url ? mediaIDs.get(url) : undefined
  const testimonialIDs: number[] = []
  for (const t of initial.testimonials) {
    const existing = await payload.find({ collection:'testimonials', where:{ name:{ equals:t.name } }, limit:1 })
    const doc = existing.docs[0] || await payload.create({ collection:'testimonials', data:{ ...t, image:image(t.image), _status:'published' } })
    testimonialIDs.push(doc.id)
  }
  for (const collection of ['services','references'] as const) {
    for (const [index, d] of initial[collection].entries()) {
      const existing = await payload.find({ collection, where:{ slug:{ equals:d.slug } }, limit:1 })
      if (existing.docs.length) continue // Never overwrite editorial changes.
      const reference = d as typeof initial.references[number]
      await payload.create({ collection, data:{
        ...d, image:image(d.image), sections:d.sections.map(s => ({ ...s, tone:s.tone as 'dark'|'muted'|'light' })),
        ...(collection === 'references' ? { category:reference.category as 'web'|'app'|'seo'|'software', logo:image(reference.logo), testimonial:index < 3 ? testimonialIDs[index] : undefined } : {}),
        // This source file is a mislabeled duplicate of FC Nürnberg, not a valid Brotkultur case study.
        _status:d.slug === 'brotkultur-pur' ? 'draft' : 'published',
      } })
    }
  }
  for (const p of initial.pages) {
    const existing = await payload.find({ collection:'pages', where:{ slug:{ equals:p.slug } }, limit:1 })
    if (!existing.docs.length) await payload.create({ collection:'pages', data:{ ...p, content:p.content as any, _status:'published' } })
  }
  const settings = await payload.findGlobal({ slug:'site-settings' })
  if (!settings.email) await payload.updateGlobal({ slug:'site-settings', data:initial.settings })
  const home = await payload.findGlobal({ slug:'home' })
  if (!home.heading) await payload.updateGlobal({ slug:'home', data:{ ...initial.home, image:image(initial.home.image) } })
  console.log('Import abgeschlossen. Bestehende CMS-Inhalte wurden nicht überschrieben. Administrator unter /admin anlegen.')
} finally { await payload.destroy() }
