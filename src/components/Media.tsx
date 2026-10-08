import Image from 'next/image'
import type { Media as MediaDoc } from '@/payload-types'
export function Media({ media, className='', priority=false, sizes='(max-width: 768px) 100vw, 50vw' }: {
  media?: number | MediaDoc | null; className?: string; priority?: boolean; sizes?: string
}) {
  if (!media || typeof media === 'number' || !media.url) return null
  const src = media.url.replace(/^https?:\/\/[^/]+(?=\/api\/media\/file\/)/, '')
  return <Image src={src} alt={media.alt} width={media.width || 1200} height={media.height || 800}
    className={className} sizes={sizes} priority={priority} unoptimized={media.mimeType === 'image/svg+xml'} />
}
