import type { MetadataRoute } from 'next'
import { cms,getServices,getReferences } from '@/lib/cms'
export const dynamic='force-dynamic'
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  const origin=process.env.SERVER_URL || 'https://wesolve-it.com'
  const [services,references,pages]=await Promise.all([getServices(),getReferences(),cms().then(p=>p.find({collection:'pages',limit:1000,overrideAccess:false}))])
  return [ ...['','/leistungen','/referenzen','/kontakt'].map(path=>({url:origin+path})),
    ...services.docs.map(d=>({url:`${origin}/leistungen/${d.slug}`,lastModified:d.updatedAt})),
    ...references.docs.map(d=>({url:`${origin}/referenzen/${d.slug}`,lastModified:d.updatedAt})),
    ...pages.docs.map(d=>({url:`${origin}/${d.slug}`,lastModified:d.updatedAt})),
  ]
}
