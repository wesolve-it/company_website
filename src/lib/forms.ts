export type ContactInput = { name:string; email:string; phone:string; subject:string; message:string; consent:boolean; company:string }
export function validateContact(value:unknown): ContactInput | null {
  if (!value || typeof value !== 'object') return null
  const data=value as Record<string,unknown>
  for(const key of ['name','email','phone','subject','message','company']) if(typeof data[key] !== 'string') return null
  const name=(data.name as string).trim(), email=(data.email as string).trim(), phone=(data.phone as string).trim(), subject=(data.subject as string).trim(), message=(data.message as string).trim(), company=(data.company as string).trim()
  if (!name || name.length>150 || !validEmail(email) || phone.length>100 || !subject || subject.length>200 || message.length<10 || message.length>10000 || data.consent !== true || company.length>200) return null
  return { name,email,phone,subject,message,consent:true,company }
}
export function validEmail(email:unknown): email is string { return typeof email==='string' && email.length<=254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) }
export function sameOrigin(request:Request) {
  const origin=request.headers.get('origin')
  const allowed=new URL(process.env.SERVER_URL || 'http://localhost:3000').origin
  return Boolean(origin && origin===allowed)
}
export async function readJSON(request:Request) {
  if(!request.headers.get('content-type')?.includes('application/json')) return null
  const reader=request.body?.getReader(); if(!reader) return null
  let bytes=0; const chunks:Uint8Array[]=[]
  while(true) { const {done,value}=await reader.read(); if(done)break; bytes+=value.byteLength; if(bytes>24000){ await reader.cancel(); return null }; chunks.push(value) }
  try { return JSON.parse(new TextDecoder().decode(Buffer.concat(chunks))) } catch { return null }
}
/** Process-local flood protection. Use a shared limiter before scaling to multiple replicas. */
const windows = new Map<string,{ count:number; until:number }>()
export function rateLimit(key:string,now=Date.now()) {
  for(const [k,v] of windows) if(v.until<now)windows.delete(k)
  const bucket=windows.get(key) || {count:0,until:now+60000}
  bucket.count++; windows.set(key,bucket)
  return bucket.count<=5
}
