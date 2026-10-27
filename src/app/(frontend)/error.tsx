'use client'
export default function Error({reset}:{reset:()=>void}) { return <section className="mx-auto min-h-[70vh] max-w-screen-md px-6 py-36"><h1 className="font-display text-3xl font-bold">Die Seite konnte gerade nicht geladen werden.</h1><p className="mt-4">Bitte versuche es noch einmal.</p><button onClick={reset} className="button-primary mt-8">Erneut versuchen</button></section> }
