'use client'
import Script from 'next/script'
import { useEffect,useRef,useState } from 'react'
const trackingID=process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
export function Privacy() {
  const [accepted,setAccepted]=useState(false), [banner,setBanner]=useState(false)
  const dialog=useRef<HTMLDialogElement>(null)
  useEffect(()=>{
    let stored:string|null=null
    try { stored=localStorage.getItem('analytics-consent') } catch {}
    setAccepted(stored==='accepted'); setBanner(Boolean(trackingID && !stored))
    const show=()=>dialog.current?.showModal(); window.addEventListener('cookie-preferences',show)
    return()=>window.removeEventListener('cookie-preferences',show)
  },[])
  function save(value:boolean) {
    try { localStorage.setItem('analytics-consent',value?'accepted':'rejected') } catch {}
    setBanner(false); dialog.current?.close()
    // Reload removes the already-executed analytics script after revocation.
    if(accepted && !value) window.location.reload()
    else setAccepted(value)
  }
  return <>
    {accepted && trackingID && <Script src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js'} data-website-id={trackingID} strategy="afterInteractive" />}
    {banner && <aside aria-label="Cookie-Einstellungen" className="fixed bottom-4 left-4 z-[60] max-w-sm rounded-2xl border-2 border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"><p className="font-display text-lg font-bold">Deine Privatsphäre</p><p className="mt-2 text-sm">Mit deiner Zustimmung verwenden wir Umami zur Reichweitenmessung. Mehr dazu in unserer <a className="underline" href="/datenschutz">Datenschutzerklärung</a>.</p><div className="mt-4 flex gap-3"><button className="button-secondary !px-4 !py-2" onClick={()=>save(false)}>Ablehnen</button><button className="button-primary !px-4 !py-2" onClick={()=>save(true)}>Akzeptieren</button></div></aside>}
    <dialog ref={dialog} className="max-w-md rounded-2xl bg-white p-8 text-neutral-900 backdrop:bg-black/40 dark:bg-neutral-900 dark:text-white"><h2 className="font-display text-xl font-bold">Cookie-Einstellungen</h2><p className="mt-4">{trackingID ? 'Optionale Reichweitenmessung mit Umami. Du kannst deine Zustimmung jederzeit ändern.' : 'Aktuell sind keine optionalen Analyse-Tools aktiviert. Deine Farbschema-Einstellung wird lokal gespeichert.'}</p><div className="mt-6 flex flex-wrap gap-3">{trackingID && <><button className="button-secondary" onClick={()=>save(false)}>Ablehnen</button><button className="button-primary" onClick={()=>save(true)}>Akzeptieren</button></>}<button className="underline" onClick={()=>dialog.current?.close()}>Schließen</button></div></dialog>
  </>
}
export function PrivacyButton() { return <button onClick={()=>window.dispatchEvent(new Event('cookie-preferences'))} className="hover:text-lime-300">Cookie-Einstellungen</button> }
