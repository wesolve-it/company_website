import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateContact, validEmail, sameOrigin, readJSON, rateLimit } from '../src/lib/forms'
import { safeLink } from '../src/lib/links'
const valid={name:'Max Muster',email:'max@example.org',phone:'',subject:'Webseite',message:'Bitte meldet euch zu meinem Projekt.',consent:true,company:''}
test('contact validation accepts trimmed input and rejects missing consent / malformed fields',()=>{
  assert.equal(validateContact({...valid,name:' Max Muster '})?.name,'Max Muster')
  for(const patch of [{consent:false},{email:'max@'},{message:'kurz'},{subject:'x'.repeat(201)},{name:42},{phone:null}])assert.equal(validateContact({...valid,...patch}),null)
})
test('email and editorial links reject executable schemes',()=>{
  assert.equal(validEmail('max@example.org'),true);assert.equal(validEmail('a\r\nb@example.org'),false)
  for(const url of ['javascript:alert(1)','data:text/html,hi','//evil.example'])assert.equal(safeLink(url),'/')
  assert.equal(safeLink('/leistungen/webentwicklung'),'/leistungen/webentwicklung')
})
test('forms require the configured origin and limit body size',async()=>{
  assert.equal(sameOrigin(new Request('http://localhost:3000/api/contact',{headers:{origin:'http://localhost:3000'}})),true)
  assert.equal(sameOrigin(new Request('http://localhost:3000/api/contact',{headers:{origin:'https://evil.example'}})),false)
  assert.equal(sameOrigin(new Request('http://localhost:3000/api/contact')),false)
  assert.equal(await readJSON(new Request('http://localhost:3000',{method:'POST',headers:{'content-type':'application/json'},body:'x'.repeat(25000)})),null)
})
test('flood protection expires the submission window',()=>{
  for(let i=0;i<5;i++)assert.equal(rateLimit('unit-test',1000),true)
  assert.equal(rateLimit('unit-test',1000),false);assert.equal(rateLimit('unit-test',62000),true)
})
