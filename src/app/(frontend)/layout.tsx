import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Privacy } from '@/components/Privacy'
import { getSettings, getServices } from '@/lib/cms'
import './styles.css'
export const metadata:Metadata = {
  metadataBase:new URL(process.env.SERVER_URL || 'https://wesolve-it.com'),
  icons:{ icon:'/assets/img/Wesolveit_loigo.svg' },
  openGraph:{ type:'website', siteName:'wesolve-IT', locale:'de_DE', images:[{url:'/assets/img/og-image.png',width:1200,height:630}] },
  twitter:{ card:'summary_large_image' },
}
export default async function Layout({ children }: { children:React.ReactNode }) {
  const [settings,services] = await Promise.all([getSettings(),getServices()])
  return <html lang="de" suppressHydrationWarning><head><script src="/theme.js" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Montserrat:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" /></head><body className="overflow-x-hidden bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-lime-300 focus:p-4 focus:text-neutral-900">Zum Inhalt springen</a><Header brand={settings.brand} links={settings.navigation || []} /><main id="main">{children}</main><Footer settings={settings} services={services.docs} /><Privacy /></body></html>
}
