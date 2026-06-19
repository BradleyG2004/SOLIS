import type { CollectionConfig } from 'payload'

const orderStatuses = [
  { label: 'Nouvelle', value: 'nouvelle' },
  { label: 'En préparation', value: 'en-preparation' },
  { label: 'Traitée', value: 'traitee' },
  { label: 'Annulée', value: 'annulee' },
]

export const CocktailOrders: CollectionConfig = {
  slug: 'cocktail-orders',
  labels: {
    singular: 'Commande cocktail',
    plural: 'Commandes cocktails',
  },
  admin: {
    useAsTitle: 'cocktailName',
    group: 'Commandes',
    defaultColumns: ['cocktailName', 'customerName', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'cocktailName',
      type: 'text',
      label: 'Nom du cocktail',
      required: true,
    },
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
      name: 'ingredients',
      type: 'array',
      label: 'Ingrédients choisis',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Ingrédient',
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
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notes du client',
    },
    {
      name: 'estimatedPrice',
      type: 'number',
      label: 'Prix estimé (€)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Statut',
      options: orderStatuses,
      defaultValue: 'nouvelle',
      required: true,
    },
  ],
}
