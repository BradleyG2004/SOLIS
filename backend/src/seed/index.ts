import { getPayload } from 'payload'
import config from '../payload.config'
import {
  categories,
  cocktails,
  equipment,
  ingredients,
  laundryOffers,
  productsByCategory,
  siteSettings,
} from './data'

async function seed() {
  const payload = await getPayload({ config })

  const existingCategories = await payload.find({ collection: 'categories', limit: 1 })
  if (existingCategories.totalDocs > 0) {
    console.log('Base déjà peuplée — seed ignoré.')
    process.exit(0)
  }

  console.log('Peuplement de la base SOLISS TRILL…')

  const categoryMap = new Map<string, number>()
  for (const cat of categories) {
    const doc = await payload.create({
      collection: 'categories',
      data: { ...cat, isActive: true },
    })
    categoryMap.set(cat.slug, Number(doc.id))
  }

  for (const [categorySlug, products] of Object.entries(productsByCategory)) {
    const categoryId = categoryMap.get(categorySlug)
    if (!categoryId) continue
    for (const product of products) {
      await payload.create({
        collection: 'products',
        data: {
          ...product,
          category: categoryId,
          isActive: true,
        },
      })
    }
  }

  const ingredientMap = new Map<string, number>()
  for (const ing of ingredients) {
    const doc = await payload.create({
      collection: 'ingredients',
      data: { ...ing, available: true },
    })
    ingredientMap.set(ing.slug, Number(doc.id))
  }

  const equipmentMap = new Map<string, number>()
  for (const eq of equipment) {
    const doc = await payload.create({ collection: 'equipment', data: eq })
    equipmentMap.set(eq.name, Number(doc.id))
  }

  for (const cocktail of cocktails) {
    const { composition, equipmentNames, ...rest } = cocktail
    await payload.create({
      collection: 'cocktails',
      data: {
        ...rest,
        isActive: true,
        composition: composition.map((item) => ({
          ingredient: ingredientMap.get(item.ingredientSlug)!,
          quantity: item.quantity,
          unit: item.unit,
        })),
        equipment: equipmentNames
          .map((name) => equipmentMap.get(name))
          .filter((id): id is number => id !== undefined),
      },
    })
  }

  for (const offer of laundryOffers) {
    await payload.create({
      collection: 'laundry-offers',
      data: {
        ...offer,
        features: offer.features.map((feature) => ({ feature })),
        isActive: true,
      },
    })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: siteSettings,
  })

  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@SOLISS-trill.fr',
        password: 'SOLISSTrill2025!',
        name: 'Administrateur SOLISS',
      },
    })
    console.log('Compte admin créé : admin@SOLISS-trill.fr / SOLISSTrill2025!')
    console.log('⚠️  Changez ce mot de passe après la première connexion.')
  }

  console.log('Seed terminé avec succès.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Erreur seed:', err)
  process.exit(1)
})
