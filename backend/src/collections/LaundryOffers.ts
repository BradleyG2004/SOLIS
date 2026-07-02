import type { CollectionConfig } from 'payload'

export const LaundryOffers: CollectionConfig = {
  slug: 'laundry-offers',
  labels: {
    singular: 'Offre pressing',
    plural: 'Offres pressing',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SOLISS Laundry',
    defaultColumns: ['name', 'price', 'deliveryDays', 'isActive'],
  },
  access: {
    read: () => true,
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
      name: 'price',
      type: 'number',
      label: 'Prix à partir de (€)',
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
      name: 'isActive',
      type: 'checkbox',
      label: 'Visible sur le site',
      defaultValue: true,
    },
  ],
}
