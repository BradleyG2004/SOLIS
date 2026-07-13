import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/slug'

const ingredientTypes = [
  { label: 'Alcool', value: 'alcool' },
  { label: 'Jus', value: 'jus' },
  { label: 'Sirop', value: 'sirop' },
  { label: 'Garniture', value: 'garniture' },
  { label: 'Autre', value: 'autre' },
]

export const Ingredients: CollectionConfig = {
  slug: 'ingredients',
  labels: {
    singular: 'Ingrédient',
    plural: 'Ingrédients',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SOLISS Bar',
    defaultColumns: ['name', 'type', 'pricePerUnit', 'available'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Identifiant URL',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [formatSlug],
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      options: ingredientTypes,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'pricePerUnit',
      type: 'number',
      label: 'Prix unitaire (FCFA)',
      min: 0,
      defaultValue: 0,
    },
    {
      name: 'unit',
      type: 'text',
      label: 'Unité',
      defaultValue: 'cl',
    },
    {
      name: 'available',
      type: 'checkbox',
      label: 'Disponible',
      defaultValue: true,
    },
  ],
}
