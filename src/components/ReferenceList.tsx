'use client'
import { useState } from 'react'
import type { Reference } from '@/payload-types'
import { categoryLabels, ReferenceCard } from './catalog'
export function ReferenceList({ references }: { references:Reference[] }) {
  const [filter,setFilter]=useState('all')
  return <div className="mx-auto max-w-screen-xl px-6 pb-20"><div className="mb-14 flex flex-wrap gap-3" aria-label="Referenzen filtern">{[{value:'all',label:'Alle Projekte'},...Object.entries(categoryLabels).map(([value,label])=>({value,label}))].map(({value,label})=><button key={value} aria-pressed={filter===value} onClick={()=>setFilter(value)} className={`rounded-full border-2 px-5 py-2.5 font-display text-sm font-semibold ${filter===value?'border-neutral-900 bg-lime-300 text-neutral-900 dark:border-lime-300':'border-neutral-200 dark:border-neutral-800'}`}>{label}</button>)}</div><div className="space-y-10">{references.filter(r=>filter==='all'||r.category===filter).map(r=><ReferenceCard key={r.id} reference={r} />)}</div>{!references.some(r=>filter==='all'||r.category===filter) && <p role="status">In dieser Kategorie sind aktuell keine Projekte veröffentlicht.</p>}</div>
}
