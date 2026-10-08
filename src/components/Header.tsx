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
  return <header className={`fixed top-0 z-50 w-full transition-all ${scrolled ? 'bg-white/90 py-3 shadow-sm backdrop-blur-md dark:bg-neutral-950/90':'bg-transparent py-5'}`}>
    <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6">
      <Link href="/" aria-label={`${brand} – Startseite`}><img src="/assets/img/wesolve_green.svg" alt={brand} width="160" height="32" className="-ml-6 h-8 w-40 dark:brightness-0 dark:invert" /></Link>
      <div className="flex items-center gap-4"><nav aria-label="Hauptnavigation" className="hidden items-center gap-8 font-display font-medium md:flex">{links.map(link=><Link key={link.url} href={safeLink(link.url)} aria-current={pathname === link.url ? 'page':undefined} className={link.url === '/kontakt' ? 'button-primary !px-5 !py-2.5':'hover:text-lime-700 dark:hover:text-lime-300'}>{link.label}</Link>)}</nav>
        <button onClick={theme} aria-label="Farbschema umschalten" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-200 hover:border-lime-400 dark:border-neutral-700"><span className="dark:hidden" aria-hidden="true">☾</span><span className="hidden dark:inline" aria-hidden="true">☀</span></button>
        <button ref={toggle} onClick={()=>setOpen(true)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Menü öffnen" className="h-10 w-10 text-2xl md:hidden">☰</button>
      </div>
    </div>
    <dialog ref={dialog} id="mobile-menu" onCancel={()=>setOpen(false)} onClose={()=>{setOpen(false);toggle.current?.focus()}} onClick={e=>{if(e.target===dialog.current)setOpen(false)}} className="mobile-dialog m-0 ml-auto h-dvh max-h-none w-3/4 max-w-xs rounded-l-3xl border-0 bg-white p-6 text-neutral-900 dark:bg-neutral-950 dark:text-white">
      <button autoFocus onClick={()=>setOpen(false)} aria-label="Menü schließen" className="ml-auto block h-10 w-10 text-3xl">×</button><nav aria-label="Mobile Navigation" className="mt-12 flex flex-col items-end gap-6 font-display text-2xl font-semibold">{links.map(link=><Link key={link.url} href={safeLink(link.url)} onClick={()=>setOpen(false)}>{link.label}</Link>)}</nav>
    </dialog>
  </header>
}
