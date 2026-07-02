import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du site',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'homeTagline',
      type: 'text',
      label: 'Accroche accueil',
      defaultValue: 'Trois univers, une même exigence.',
    },
    {
      name: 'homeDescription',
      type: 'textarea',
      label: 'Description accueil',
    },
    {
      name: 'marketIntro',
      type: 'textarea',
      label: 'Introduction SOLISS Market',
    },
    {
      name: 'barIntro',
      type: 'textarea',
      label: 'Introduction SOLISS Bar',
    },
    {
      name: 'laundryIntro',
      type: 'textarea',
      label: 'Introduction SOLISS Laundry',
    },
    {
      name: 'paymentNotice',
      type: 'text',
      label: 'Message paiement en cours',
      defaultValue: 'Paiement en ligne — bientôt disponible',
    },
  ],
}
