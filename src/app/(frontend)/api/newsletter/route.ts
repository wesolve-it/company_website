import { cms } from '@/lib/cms'
import { readJSON, sameOrigin, rateLimit, validEmail } from '@/lib/forms'
export async function POST(request:Request) {
  if(!sameOrigin(request))return Response.json({error:'Ungültige Anfrage.'},{status:403})
  const ip=process.env.TRUST_PROXY === 'true' ? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown' : 'all'
  if(!rateLimit('newsletter:'+ip))return Response.json({error:'Bitte versuche es in einer Minute erneut.'},{status:429})
  const data=await readJSON(request)
  if(!data || !validEmail(data.email) || data.consent!==true || typeof data.company!=='string')return Response.json({error:'Bitte gib eine gültige E-Mail-Adresse ein und bestätige die Zustimmung.'},{status:400})
  if(data.company)return Response.json({ok:true})
  const payload=await cms(),settings=await payload.findGlobal({slug:'site-settings'})
  const endpoint=process.env.NEWSLETTER_ENDPOINT
  if(!settings.newsletterEnabled || !endpoint)return Response.json({error:'Die Newsletter-Anmeldung ist aktuell nicht verfügbar.'},{status:503})
  try {
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.NEWSLETTER_API_KEY ? {Authorization:`Bearer ${process.env.NEWSLETTER_API_KEY}`} : {})},body:JSON.stringify({email:data.email.trim(),doubleOptIn:true,source:'website',consent:true}),signal:AbortSignal.timeout(10000)})
    if(!response.ok)throw new Error('provider')
    // Neutral result avoids revealing existing subscription status.
    return Response.json({ok:true})
  } catch { return Response.json({error:'Die Anmeldung ist gerade nicht möglich. Bitte versuche es später erneut.'},{status:503}) }
}
