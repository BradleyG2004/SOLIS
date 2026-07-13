import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produit',
    plural: 'Produits',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SOLISS Market',
    defaultColumns: ['name', 'category', 'price', 'image', 'isActive'],
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
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Prix (FCFA)',
      required: true,
      min: 0,
    },
    {
      name: 'category',
      type: 'relationship',
      label: 'Catégorie',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Visible sur le site',
      defaultValue: true,
    },
  ],
}
