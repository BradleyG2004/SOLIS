import type {
  Category,
  Cocktail,
  Ingredient,
  LaundryOffer,
  Product,
  SiteSettings,
} from './types'
import { getPayloadClient } from './payload'

export async function getSiteSettings(): Promise<SiteSettings> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' })
}

export async function getCategories(): Promise<Category[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: { isActive: { equals: true } },
    sort: 'order',
    limit: 20,
  })
  return result.docs as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return (result.docs[0] as Category) ?? null
}

export async function getProductsByCategory(categoryId: string | number): Promise<Product[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: {
      and: [
        { category: { equals: categoryId } },
        { isActive: { equals: true } },
      ],
    },
    depth: 1,
    limit: 50,
  })
  return result.docs as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return (result.docs[0] as Product) ?? null
}

export async function getIngredients(): Promise<Ingredient[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'ingredients',
    where: { available: { equals: true } },
    limit: 50,
  })
  return result.docs as Ingredient[]
}

export async function getCocktails(): Promise<Cocktail[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'cocktails',
    where: { isActive: { equals: true } },
    depth: 2,
    limit: 20,
  })
  return result.docs as Cocktail[]
}

export async function getCocktailBySlug(slug: string): Promise<Cocktail | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'cocktails',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return (result.docs[0] as Cocktail) ?? null
}

export async function getLaundryOffers(): Promise<LaundryOffer[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'laundry-offers',
    where: { isActive: { equals: true } },
    limit: 10,
  })
  return result.docs as LaundryOffer[]
}
