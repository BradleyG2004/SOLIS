import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Catégorie',
    plural: 'Catégories',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SOLISS Market',
    defaultColumns: ['name', 'slug', 'image', 'isActive'],
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
      admin: {
        description: 'Ex. accessoires, nourriture',
      },
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
      name: 'order',
      type: 'number',
      label: 'Ordre d\'affichage',
      defaultValue: 0,
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
