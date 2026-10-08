import { cms } from '@/lib/cms'
import { readJSON, sameOrigin, rateLimit, validateContact } from '@/lib/forms'
export async function POST(request:Request) {
  if(!sameOrigin(request))return Response.json({error:'Ungültige Anfrage.'},{status:403})
  // Only trust forwarded IPs when the reverse proxy overwrites them.
  const ip=process.env.TRUST_PROXY === 'true' ? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown' : 'all'
  if(!rateLimit('contact:'+ip))return Response.json({error:'Bitte warte eine Minute und versuche es erneut.'},{status:429})
  const data=validateContact(await readJSON(request))
  if(!data)return Response.json({error:'Bitte prüfe deine Eingaben und die Zustimmung.'},{status:400})
  if(data.company)return Response.json({ok:true})
  try {
    const payload=await cms()
    const inquiry=await payload.create({collection:'inquiries',overrideAccess:true,data:{name:data.name,email:data.email,phone:data.phone,subject:data.subject,message:data.message,consent:true}})
    if(process.env.SMTP_HOST) {
      try {
        await payload.sendEmail({to:process.env.CONTACT_EMAIL || 'info@wesolve-it.com',replyTo:data.email,subject:'Neue Website-Anfrage',text:`Name: ${data.name}\nE-Mail: ${data.email}\nTelefon: ${data.phone}\nBetreff: ${data.subject}\n\n${data.message}`})
        await payload.update({collection:'inquiries',id:inquiry.id,overrideAccess:true,data:{notificationSent:true}})
      } catch { console.error('Kontaktanfrage gespeichert; E-Mail-Benachrichtigung fehlgeschlagen:',inquiry.id) }
    }
    return Response.json({ok:true})
  } catch { console.error('Kontaktanfrage konnte nicht gespeichert werden.');return Response.json({error:'Deine Anfrage konnte nicht gespeichert werden. Bitte versuche es später erneut oder kontaktiere uns direkt.'},{status:503}) }
}
