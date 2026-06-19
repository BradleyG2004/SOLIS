export type Category = {
  id: string
  name: string
  slug: string
  description?: string | null
  order?: number | null
  isActive?: boolean | null
}

export type Product = {
  id: string
  name: string
  slug: string
  description?: string | null
  price: number
  category: Category | string
  image?: Media | string | null
  isActive?: boolean | null
}

export type Media = {
  id: string
  url?: string | null
  alt?: string | null
  filename?: string | null
}

export type Ingredient = {
  id: string
  name: string
  slug: string
  type: string
  description?: string | null
  pricePerUnit: number
  unit: string
  available?: boolean | null
}

export type Equipment = {
  id: string
  name: string
  description?: string | null
}

export type CocktailComposition = {
  ingredient: Ingredient | string
  quantity: number
  unit: string
  id?: string | null
}

export type Cocktail = {
  id: string
  name: string
  slug: string
  description?: string | null
  instructions?: string | null
  price?: number | null
  image?: Media | string | null
  composition?: CocktailComposition[] | null
  equipment?: (Equipment | string)[] | null
  isActive?: boolean | null
}

export type LaundryOffer = {
  id: string
  name: string
  slug: string
  description?: string | null
  price?: number | null
  deliveryDays?: number | null
  features?: { feature: string; id?: string | null }[] | null
  isActive?: boolean | null
}

export type SiteSettings = {
  homeTagline?: string | null
  homeDescription?: string | null
  marketIntro?: string | null
  barIntro?: string | null
  laundryIntro?: string | null
  paymentNotice?: string | null
}
