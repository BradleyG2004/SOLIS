export type Category = {
  id: number
  name: string
  slug: string
  description?: string | null
  order?: number | null
  image?: Media | number | null
  isActive?: boolean | null
}

export type Product = {
  id: number
  name: string
  slug: string
  description?: string | null
  price: number
  category: Category | number
  image?: Media | number | null
  isActive?: boolean | null
}

export type Media = {
  id: number
  url?: string | null
  alt?: string | null
  filename?: string | null
}

export type Ingredient = {
  id: number
  name: string
  slug: string
  type: string
  description?: string | null
  pricePerUnit: number
  unit: string
  available?: boolean | null
}

export type Equipment = {
  id: number
  name: string
  description?: string | null
}

export type CocktailComposition = {
  ingredient: Ingredient | number
  quantity: number
  unit: string
  id?: string | null
}

export type Cocktail = {
  id: number
  name: string
  slug: string
  description?: string | null
  instructions?: string | null
  price?: number | null
  image?: Media | number | null
  composition?: CocktailComposition[] | null
  equipment?: (Equipment | number)[] | null
  isActive?: boolean | null
}

export type LaundryOffer = {
  id: number
  name: string
  slug: string
  description?: string | null
  price?: number | null
  deliveryDays?: number | null
  features?: { feature: string; id?: string | null }[] | null
  image?: Media | number | null
  isActive?: boolean | null
}

export type SiteSettings = {
  homeTagline?: string | null
  homeDescription?: string | null
  marketIntro?: string | null
  barIntro?: string | null
  laundryIntro?: string | null
  paymentNotice?: string | null
  whatsappNumber?: string | null
}
