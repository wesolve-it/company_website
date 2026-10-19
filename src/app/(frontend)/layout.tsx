import type { Metadata } from 'next'
import { Barlow_Condensed, Montserrat, Space_Grotesk } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Privacy } from '@/components/Privacy'
import { getSettings, getServices } from '@/lib/cms'
import './styles.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata:Metadata = {
  metadataBase:new URL(process.env.SERVER_URL || 'https://wesolve-it.com'),
  icons:{ icon:'/assets/img/Wesolveit_loigo.svg' },
  openGraph:{ type:'website', siteName:'wesolve-IT', locale:'de_DE', images:[{url:'/assets/img/og-image.png',width:1200,height:630}] },
  twitter:{ card:'summary_large_image' },
}
export default async function Layout({ children }: { children:React.ReactNode }) {
  const [settings,services] = await Promise.all([getSettings(),getServices()])
  return <html lang="de" suppressHydrationWarning className={`${spaceGrotesk.variable} ${montserrat.variable} ${barlowCondensed.variable}`}><head><script src="/theme.js" /></head><body className="overflow-x-hidden bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-100"><a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime-400 focus:px-5 focus:py-3 focus:font-semibold focus:text-neutral-950 focus:shadow-lg">Zum Inhalt springen</a><Header brand={settings.brand} links={settings.navigation || []} /><main id="main">{children}</main><Footer settings={settings} services={services.docs} /><Privacy /></body></html>
}
