import type { CollectionConfig } from 'payload'

export const Cocktails: CollectionConfig = {
  slug: 'cocktails',
  labels: {
    singular: 'Cocktail signature',
    plural: 'Cocktails signature',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SOLISS Bar',
    defaultColumns: ['name', 'price', 'image', 'isActive'],
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
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'instructions',
      type: 'textarea',
      label: 'Préparation',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Prix indicatif (FCFA)',
      min: 0,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
    },
    {
      name: 'composition',
      type: 'array',
      label: 'Composition',
      fields: [
        {
          name: 'ingredient',
          type: 'relationship',
          label: 'Ingrédient',
          relationTo: 'ingredients',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Quantité',
          required: true,
        },
        {
          name: 'unit',
          type: 'text',
          label: 'Unité',
          defaultValue: 'cl',
        },
      ],
    },
    {
      name: 'equipment',
      type: 'relationship',
      label: 'Matériel utilisé',
      relationTo: 'equipment',
      hasMany: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Visible sur le site',
      defaultValue: true,
    },
  ],
}
