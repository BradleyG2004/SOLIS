import type { CollectionConfig } from 'payload'
import { formatSlug } from '../lib/slug'

export const LaundryOffers: CollectionConfig = {
  slug: 'laundry-offers',
  labels: {
    singular: 'Offre pressing',
    plural: 'Offres pressing',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SOLISS Laundry',
    defaultColumns: ['name', 'price', 'deliveryDays', 'image', 'isActive'],
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
      label: 'Prix à partir de (FCFA)',
      min: 0,
    },
    {
      name: 'deliveryDays',
      type: 'number',
      label: 'Délai (jours)',
      min: 1,
    },
    {
      name: 'features',
      type: 'array',
      label: 'Points inclus',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Point',
          required: true,
        },
      ],
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
