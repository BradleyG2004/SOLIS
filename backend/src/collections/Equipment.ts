import type { CollectionConfig } from 'payload'

export const Equipment: CollectionConfig = {
  slug: 'equipment',
  labels: {
    singular: 'Matériel',
    plural: 'Matériel',
  },
  admin: {
    useAsTitle: 'name',
    group: 'SOLIS Bar',
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
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
  ],
}
