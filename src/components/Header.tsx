'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { safeLink } from '@/lib/links'
type Nav = { label:string; url:string }
export function Header({ links, brand }: { links:Nav[]; brand:string }) {
  const [open,setOpen] = useState(false), [scrolled,setScrolled] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null), toggle = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  useEffect(() => { const update = () => setScrolled(window.scrollY > 10); update(); window.addEventListener('scroll',update,{passive:true}); return () => window.removeEventListener('scroll',update) },[])
  useEffect(() => { setOpen(false) },[pathname])
  useEffect(() => {
    const el=dialog.current
    if(open) { el?.showModal(); document.body.style.overflow='hidden' }
    else { el?.close(); document.body.style.overflow=''; }
    return () => { document.body.style.overflow='' }
  },[open])
  useEffect(() => {
    const query=window.matchMedia('(min-width: 768px)'), close=()=>{ if(query.matches) setOpen(false) }
    query.addEventListener('change',close); return()=>query.removeEventListener('change',close)
  },[])
  function theme() {
    const dark=!document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark',dark)
    try { localStorage.setItem('theme',dark ? 'dark':'light') } catch {}
  }
  return <header className={`fixed top-0 z-50 w-full transition-[background-color,padding,box-shadow,backdrop-filter] duration-200 ${scrolled ? 'bg-white/90 py-3 shadow-sm backdrop-blur-md dark:bg-neutral-950/90':'bg-transparent py-5'}`}>
    <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6">
      <Link href="/" aria-label={`${brand} – Startseite`} className="flex items-center"><img src="/assets/img/wesolve_green.svg" alt={brand} width="160" height="32" className="h-8 w-40 object-contain dark:brightness-0 dark:invert" /></Link>
      <div className="flex items-center gap-4">
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-8 font-display font-medium md:flex">
          {links.map(link => {
            const isActive = pathname === link.url
            if (link.url === '/kontakt') {
              return <Link key={link.url} href={safeLink(link.url)} aria-current={isActive ? 'page':undefined} className="button-primary !px-5 !py-2.5 !text-sm">{link.label}</Link>
            }
            return (
              <Link
                key={link.url}
                href={safeLink(link.url)}
                aria-current={isActive ? 'page':undefined}
                className={`relative py-1 transition-colors ${isActive ? 'font-semibold text-lime-700 dark:text-lime-400' : 'text-neutral-700 hover:text-lime-700 dark:text-neutral-200 dark:hover:text-lime-300'}`}
              >
                {link.label}
                {isActive && <span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-lime-400" />}
              </Link>
            )
          })}
        </nav>
        <button onClick={theme} aria-label="Farbschema umschalten" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-200 transition-colors hover:border-lime-400 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:border-lime-400 dark:hover:bg-neutral-900">
          <svg className="h-4 w-4 text-neutral-700 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          <svg className="hidden h-4 w-4 text-lime-400 dark:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        </button>
        <button ref={toggle} onClick={()=>setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Menü öffnen" className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:border-lime-400 dark:border-neutral-800 dark:text-neutral-100 md:hidden">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </div>
    <dialog ref={dialog} id="mobile-menu" onCancel={()=>setOpen(false)} onClose={()=>{setOpen(false);toggle.current?.focus()}} onClick={e=>{if(e.target===dialog.current)setOpen(false)}} className="mobile-dialog m-0 ml-auto h-dvh max-h-none w-3/4 max-w-xs rounded-l-3xl border-0 bg-white p-6 text-neutral-900 shadow-2xl dark:bg-neutral-950 dark:text-white">
      <button autoFocus onClick={()=>setOpen(false)} aria-label="Menü schließen" className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-2xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <nav aria-label="Mobile Navigation" className="mt-12 flex flex-col items-end gap-6 font-display text-2xl font-semibold">
        {links.map(link=><Link key={link.url} href={safeLink(link.url)} onClick={()=>setOpen(false)} className={pathname === link.url ? 'text-lime-600 dark:text-lime-400':''}>{link.label}</Link>)}
      </nav>
    </dialog>
  </header>
}
