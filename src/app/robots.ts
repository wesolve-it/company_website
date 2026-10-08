import type { MetadataRoute } from 'next'
export const dynamic='force-dynamic'
export default function robots():MetadataRoute.Robots { return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/','/thank-you']},sitemap:`${process.env.SERVER_URL || 'https://wesolve-it.com'}/sitemap.xml`} }
