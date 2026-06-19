import type { CollectionConfig } from 'payload'

const quoteStatuses = [
  { label: 'Nouvelle', value: 'nouvelle' },
  { label: 'Devis envoyé', value: 'devis-envoye' },
  { label: 'Acceptée', value: 'acceptee' },
  { label: 'Refusée', value: 'refusee' },
]

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: {
    singular: 'Demande de devis',
    plural: 'Demandes de devis',
  },
  admin: {
    useAsTitle: 'customerName',
    group: 'Commandes',
    defaultColumns: ['customerName', 'offer', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      label: 'Nom du client',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Téléphone',
    },
    {
      name: 'offer',
      type: 'relationship',
      label: 'Offre souhaitée',
      relationTo: 'laundry-offers',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Articles à traiter',
      fields: [
        {
          name: 'itemType',
          type: 'text',
          label: 'Type d\'article',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Quantité',
          required: true,
          min: 1,
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes / instructions',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      options: quoteStatuses,
      defaultValue: 'nouvelle',
      required: true,
    },
  ],
}
