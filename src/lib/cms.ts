import 'server-only'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
export const cms = cache(() => getPayload({ config }))
export const getSettings = cache(async () => (await cms()).findGlobal({ slug:'site-settings', depth:1, overrideAccess:false }))
export const getHome = cache(async () => (await cms()).findGlobal({ slug:'home', depth:1, overrideAccess:false }))
export const getServices = cache(async () => (await cms()).find({ collection:'services', sort:'order', limit:100, depth:1, overrideAccess:false }))
export const getReferences = cache(async () => (await cms()).find({ collection:'references', sort:'order', limit:100, depth:2, overrideAccess:false }))
export const getTestimonials = cache(async () => (await cms()).find({ collection:'testimonials', sort:'order', limit:100, depth:1, overrideAccess:false }))
export const getDetail = cache(async (collection:'services'|'references', slug:string) => {
  const result = await (await cms()).find({ collection, where:{ slug:{ equals:slug } }, limit:1, depth:2, overrideAccess:false })
  return result.docs[0] || null
})
export const getPage = cache(async (slug:string) => {
  const result = await (await cms()).find({ collection:'pages', where:{ slug:{ equals:slug } }, depth:1, limit:1, overrideAccess:false })
  return result.docs[0] || null
})
