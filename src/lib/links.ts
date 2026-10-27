/** CMS links are editorial input; never render javascript:/data: URLs. */
export function safeLink(value?: string | null, fallback = '/') {
  if (!value) return fallback
  if (/^\/(?!\/)/.test(value) || /^https?:\/\//i.test(value) || /^(mailto:|tel:)/i.test(value)) return value
  return fallback
}
