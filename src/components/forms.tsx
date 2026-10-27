'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
function HoneyPot() { return <div className="absolute -left-[10000px]" aria-hidden="true"><label>Firma<input name="company" tabIndex={-1} autoComplete="off" /></label></div> }
export function ContactForm() {
  const [error,setError]=useState(''), [pending,setPending]=useState(false),router=useRouter()
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if(pending)return;setPending(true);setError('')
    const form=new FormData(event.currentTarget)
    try {
      const result=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:form.get('name'),email:form.get('email'),phone:form.get('phone'),subject:form.get('subject'),message:form.get('message'),consent:form.get('consent')==='on',company:form.get('company') || ''})})
      const body=await result.json(); if(!result.ok)throw new Error(body.error || 'Die Anfrage ist fehlgeschlagen.')
      router.push('/thank-you')
    } catch(e) { setError(e instanceof Error ? e.message:'Bitte versuche es später erneut.');setPending(false) }
  }
  return <form onSubmit={submit} className="relative rounded-3xl border-2 border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-10"><HoneyPot />
    {([{name:'name',label:'Name',type:'text',required:true,max:150,auto:'name'},{name:'email',label:'E-Mail',type:'email',required:true,max:254,auto:'email'},{name:'phone',label:'Telefonnummer',type:'tel',required:false,max:100,auto:'tel'},{name:'subject',label:'Betreff',type:'text',required:true,max:200,auto:'off'}]).map(field=><div className="mb-5" key={field.name}><label className="mb-2 block font-display font-semibold" htmlFor={field.name}>{field.label}{field.required && <span className="text-lime-600"> *</span>}</label><input className="form-input" id={field.name} name={field.name} type={field.type} required={field.required} maxLength={field.max} autoComplete={field.auto} /></div>)}
    <label className="mb-2 block font-display font-semibold" htmlFor="message">Nachricht <span className="text-lime-600">*</span></label><textarea id="message" name="message" className="form-input mb-5 min-h-40" required minLength={10} maxLength={10000} placeholder="Erzähle uns von deiner Idee, deinem Projekt, deinem Unternehmen …" />
    <label className="mb-6 flex items-start gap-3 text-sm"><input name="consent" type="checkbox" required className="mt-1 accent-lime-500" /><span>Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu. Details stehen in der <a className="underline" href="/datenschutz">Datenschutzerklärung</a>.</span></label>
    {error && <p role="alert" className="mb-4 text-red-700 dark:text-red-300">{error}</p>}<button type="submit" disabled={pending} className="button-primary w-full disabled:opacity-60">{pending ? 'Wird gesendet …':'Anfrage senden →'}</button>
  </form>
}
export function NewsletterForm() {
  const [message,setMessage]=useState(''),[pending,setPending]=useState(false),[success,setSuccess]=useState(false)
  async function submit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();setPending(true);setMessage(''); const form=event.currentTarget,values=new FormData(form)
    try {
      const response=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:values.get('newsletter-email'),consent:values.get('consent')==='on',company:values.get('company') || ''})})
      const data=await response.json();if(!response.ok)throw new Error(data.error)
      setSuccess(true);setMessage('Bitte prüfe dein Postfach und bestätige die Anmeldung über den zugesandten Link.');form.reset()
    } catch(e) {setSuccess(false);setMessage(e instanceof Error ? e.message:'Die Anmeldung ist fehlgeschlagen.')} finally {setPending(false)}
  }
  return <form onSubmit={submit} className="relative mt-8"><h2 className="font-display text-lg font-bold">Neuigkeiten von wesolve-IT</h2><HoneyPot /><label htmlFor="newsletter-email" className="mt-3 block text-sm">E-Mail-Adresse</label><input className="form-input mt-2 text-neutral-900 dark:text-white" id="newsletter-email" name="newsletter-email" type="email" required maxLength={254} autoComplete="email" /><label className="mt-3 flex items-start gap-2 text-xs"><input className="mt-1" name="consent" type="checkbox" required /><span>Ich möchte den Newsletter erhalten. Informationen zur Verarbeitung und Abmeldung stehen in der <a href="/datenschutz" className="underline">Datenschutzerklärung</a>.</span></label><button disabled={pending} className="mt-4 rounded-full bg-lime-400 px-5 py-3 font-display font-semibold text-neutral-900 disabled:opacity-50">{pending?'Wird gesendet …':'Anmelden'}</button>{message && <p role={success?'status':'alert'} className="mt-3 text-sm">{message}</p>}</form>
}
