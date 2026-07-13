import type { FieldHook } from 'payload'

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const formatSlug: FieldHook = ({ value }) => {
  if (typeof value !== 'string' || value.length === 0) return value
  return slugify(value)
}
