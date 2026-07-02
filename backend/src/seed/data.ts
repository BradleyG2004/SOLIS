export const categories = [
  {
    name: 'Accessoires',
    slug: 'accessoires',
    description: 'Sacs, bijoux et objets du quotidien sélectionnés avec soin.',
    order: 1,
  },
  {
    name: 'Nourriture',
    slug: 'nourriture',
    description: 'Épicerie fine, snacks et produits locaux.',
    order: 2,
  },
  {
    name: 'Électronique',
    slug: 'electronique',
    description: 'Gadgets, accessoires tech et équipements connectés.',
    order: 3,
  },
  {
    name: 'Coin fumeur',
    slug: 'coin-fumeur',
    description: 'Accessoires et produits pour moments de détente.',
    order: 4,
  },
  {
    name: 'Bien-être',
    slug: 'bien-etre',
    description: 'Soins, aromathérapie et produits naturels.',
    order: 5,
  },
  {
    name: 'Numérique & Distrib',
    slug: 'numerique',
    description: 'Cartes prépayées, recharges et services digitaux.',
    order: 6,
  },
]

export const productsByCategory: Record<
  string,
  Array<{ name: string; slug: string; description: string; price: number }>
> = {
  accessoires: [
    { name: 'Tote bag SOLISS', slug: 'tote-bag-SOLISS', description: 'Sac en coton bio, édition limitée.', price: 24.9 },
    { name: 'Porte-clés Trill', slug: 'porte-cles-trill', description: 'Métal brossé, finition mate.', price: 12.5 },
    { name: 'Écharpe lin', slug: 'echarpe-lin', description: 'Lin lavé, coloris sable.', price: 45 },
    { name: 'Carnet artisanal', slug: 'carnet-artisanal', description: 'Papier recyclé, reliure cousue.', price: 18 },
  ],
  nourriture: [
    { name: 'Miel de montagne', slug: 'miel-montagne', description: 'Pot de 250 g, récolte locale.', price: 9.8 },
    { name: 'Granola maison', slug: 'granola-maison', description: 'Noix, graines et sirop d\'érable.', price: 7.5 },
    { name: 'Huile d\'olive AOP', slug: 'huile-olive', description: 'Bouteille 50 cl, première pression.', price: 14.9 },
    { name: 'Confiture figue', slug: 'confiture-figue', description: 'Préparation artisanale, pot 220 g.', price: 6.2 },
  ],
  electronique: [
    { name: 'Écouteurs sans fil', slug: 'ecouteurs-sans-fil', description: 'Bluetooth 5.3, autonomie 24 h.', price: 59.9 },
    { name: 'Batterie externe 10 000 mAh', slug: 'batterie-externe', description: 'Charge rapide USB-C.', price: 29.9 },
    { name: 'Support téléphone', slug: 'support-telephone', description: 'Aluminium, réglable.', price: 19.9 },
    { name: 'Câble USB-C 2 m', slug: 'cable-usbc', description: 'Nylon tressé, charge et données.', price: 12.9 },
    { name: 'Frigo compact', slug: 'frigo-compact', description: 'Mini-réfrigérateur 30 L. Idéal chambre ou bureau. Disponible sur commande.', price: 89 },
  ],
  'coin-fumeur': [
    { name: 'Cendrier design', slug: 'cendrier-design', description: 'Céramique émaillée, format poche.', price: 15 },
    { name: 'Étui cuir', slug: 'etui-cuir', description: 'Cuir végétal, finition sobre.', price: 22 },
    { name: 'Briquet rechargeable', slug: 'briquet-rechargeable', description: 'Flamme électrique, USB.', price: 18.5 },
    { name: 'Porte-cigarettes', slug: 'porte-cigarettes', description: 'Métal laqué, 20 unités.', price: 8.9 },
    { name: 'Glace carbonique', slug: 'glace-carbonique', description: 'Bloc de CO₂ solide pour ambiance et effets visuels. Vente sur place uniquement.', price: 8 },
  ],
  'bien-etre': [
    { name: 'Huile essentielle lavande', slug: 'he-lavande', description: 'Flacon 10 ml, 100 % pure.', price: 11.9 },
    { name: 'Bougie cire soja', slug: 'bougie-soja', description: 'Parfum vanille, 40 h.', price: 16.5 },
    { name: 'Roll-on détente', slug: 'roll-on-detente', description: 'Mélange huiles essentielles.', price: 13.9 },
    { name: 'Sels de bain', slug: 'sels-de-bain', description: 'Sachet 300 g, eucalyptus.', price: 9.5 },
    { name: 'Hormones de croissance', slug: 'hormones-croissance', description: 'Complément naturel stimulant la croissance musculaire. Dosage conseillé à respecter.', price: 35 },
  ],
  numerique: [
    { name: 'Carte cadeau 25 €', slug: 'carte-cadeau-25', description: 'Valable sur SOLISS Market.', price: 25 },
    { name: 'Carte cadeau 50 €', slug: 'carte-cadeau-50', description: 'Valable sur SOLISS Market.', price: 50 },
    { name: 'Recharge mobile 10 €', slug: 'recharge-10', description: 'Opérateurs partenaires.', price: 10 },
    { name: 'Abonnement streaming 1 mois', slug: 'streaming-1-mois', description: 'Code d\'activation partenaire.', price: 12.99 },
    { name: 'Faux compte', slug: 'faux-compte', description: 'Création de compte secondaire sur plateformes partenaires. Discret et sécurisé.', price: 5 },
    { name: 'Réalisation de site simple', slug: 'realisation-site-simple', description: 'Site vitrine clé en main. Délai 5–7 jours. Devis sur demande.', price: 150 },
  ],
}

export const ingredients = [
  { name: 'Rhum blanc', slug: 'rhum-blanc', type: 'alcool', description: 'Rhum agricole léger.', pricePerUnit: 2.5, unit: 'cl' },
  { name: 'Vodka', slug: 'vodka', type: 'alcool', description: 'Vodka neutre premium.', pricePerUnit: 2.2, unit: 'cl' },
  { name: 'Gin', slug: 'gin', type: 'alcool', description: 'Gin aux notes botaniques.', pricePerUnit: 2.8, unit: 'cl' },
  { name: 'Tequila', slug: 'tequila', type: 'alcool', description: 'Tequila blanco.', pricePerUnit: 3, unit: 'cl' },
  { name: 'Cointreau', slug: 'cointreau', type: 'alcool', description: 'Liqueur d\'orange.', pricePerUnit: 2, unit: 'cl' },
  { name: 'Jus de citron vert', slug: 'jus-citron-vert', type: 'jus', description: 'Pressé frais.', pricePerUnit: 0.8, unit: 'cl' },
  { name: 'Jus d\'ananas', slug: 'jus-ananas', type: 'jus', description: 'Pur jus.', pricePerUnit: 0.7, unit: 'cl' },
  { name: 'Jus de cranberry', slug: 'jus-cranberry', type: 'jus', description: 'Sans sucre ajouté.', pricePerUnit: 0.9, unit: 'cl' },
  { name: 'Sirop de sucre de canne', slug: 'sirop-canne', type: 'sirop', description: 'Équilibre sucré classique.', pricePerUnit: 0.5, unit: 'cl' },
  { name: 'Sirop de gingembre', slug: 'sirop-gingembre', type: 'sirop', description: 'Notes épicées.', pricePerUnit: 0.6, unit: 'cl' },
  { name: 'Menthe fraîche', slug: 'menthe-fraiche', type: 'garniture', description: 'Feuilles fraîches.', pricePerUnit: 0.3, unit: 'brin' },
  { name: 'Tranche de citron', slug: 'citron-tranche', type: 'garniture', description: 'Décoration et arôme.', pricePerUnit: 0.2, unit: 'tranche' },
  { name: 'Glaçons', slug: 'glacons', type: 'autre', description: 'Glaçons cristallins.', pricePerUnit: 0, unit: 'portion' },
  { name: 'Eau gazeuse', slug: 'eau-gazeuse', type: 'autre', description: 'Pétillante.', pricePerUnit: 0.4, unit: 'cl' },
  { name: 'Angostura', slug: 'angostura', type: 'autre', description: 'Bitter aromatique.', pricePerUnit: 0.5, unit: 'dash' },
]

export const equipment = [
  { name: 'Shaker boston', description: 'Shaker professionnel en inox.' },
  { name: 'Verre old fashioned', description: 'Verre bas, 30 cl.' },
  { name: 'Verre hurricane', description: 'Verre haut pour cocktails longs.' },
  { name: 'Passoire à cocktail', description: 'Filtration fine.' },
  { name: 'Pilon', description: 'Pour mojitos et caipirinhas.' },
]

export const cocktails = [
  {
    name: 'Mojito SOLISS',
    slug: 'mojito-SOLISS',
    description: 'Classique rafraîchissant aux notes de menthe.',
    instructions: 'Piler la menthe avec le sirop, ajouter le rhum, le citron vert et compléter au glaçon.',
    price: 9.5,
    composition: [
      { ingredientSlug: 'rhum-blanc', quantity: 5, unit: 'cl' },
      { ingredientSlug: 'jus-citron-vert', quantity: 2, unit: 'cl' },
      { ingredientSlug: 'sirop-canne', quantity: 2, unit: 'cl' },
      { ingredientSlug: 'menthe-fraiche', quantity: 6, unit: 'brin' },
      { ingredientSlug: 'glacons', quantity: 1, unit: 'portion' },
    ],
    equipmentNames: ['Verre hurricane', 'Pilon'],
  },
  {
    name: 'Gin Fizz Trill',
    slug: 'gin-fizz-trill',
    description: 'Léger et pétillant, signature maison.',
    instructions: 'Shaker le gin, citron et sirop. Servir dans un verre long avec eau gazeuse.',
    price: 10.5,
    composition: [
      { ingredientSlug: 'gin', quantity: 4, unit: 'cl' },
      { ingredientSlug: 'jus-citron-vert', quantity: 2, unit: 'cl' },
      { ingredientSlug: 'sirop-canne', quantity: 1.5, unit: 'cl' },
      { ingredientSlug: 'eau-gazeuse', quantity: 8, unit: 'cl' },
    ],
    equipmentNames: ['Shaker boston', 'Verre hurricane'],
  },
  {
    name: 'Cosmopolitan',
    slug: 'cosmopolitan',
    description: 'Élégant et fruité.',
    instructions: 'Shaker tous les ingrédients avec glaçons, servir en coupe.',
    price: 11,
    composition: [
      { ingredientSlug: 'vodka', quantity: 4, unit: 'cl' },
      { ingredientSlug: 'cointreau', quantity: 2, unit: 'cl' },
      { ingredientSlug: 'jus-cranberry', quantity: 3, unit: 'cl' },
      { ingredientSlug: 'jus-citron-vert', quantity: 1, unit: 'cl' },
    ],
    equipmentNames: ['Shaker boston'],
  },
  {
    name: 'Margarita',
    slug: 'margarita',
    description: 'Tequila, agrumes et équilibre parfait.',
    instructions: 'Shaker avec glaçons, servir en verre old fashioned.',
    price: 10,
    composition: [
      { ingredientSlug: 'tequila', quantity: 4, unit: 'cl' },
      { ingredientSlug: 'cointreau', quantity: 2, unit: 'cl' },
      { ingredientSlug: 'jus-citron-vert', quantity: 2, unit: 'cl' },
    ],
    equipmentNames: ['Shaker boston', 'Verre old fashioned'],
  },
  {
    name: 'Dark & Stormy',
    slug: 'dark-stormy',
    description: 'Rhum et gingembre, corsé et rafraîchissant.',
    instructions: 'Verser le rhum sur glaçons, compléter au sirop gingembre et eau gazeuse.',
    price: 9.8,
    composition: [
      { ingredientSlug: 'rhum-blanc', quantity: 5, unit: 'cl' },
      { ingredientSlug: 'sirop-gingembre', quantity: 2, unit: 'cl' },
      { ingredientSlug: 'eau-gazeuse', quantity: 6, unit: 'cl' },
    ],
    equipmentNames: ['Verre hurricane'],
  },
  {
    name: 'Old Fashioned',
    slug: 'old-fashioned',
    description: 'Intemporel, aux notes d\'angostura.',
    instructions: 'Mélanger sirop et angostura, ajouter le gin et une grande glace.',
    price: 12,
    composition: [
      { ingredientSlug: 'gin', quantity: 5, unit: 'cl' },
      { ingredientSlug: 'sirop-canne', quantity: 1, unit: 'cl' },
      { ingredientSlug: 'angostura', quantity: 2, unit: 'dash' },
    ],
    equipmentNames: ['Verre old fashioned'],
  },
]

export const laundryOffers = [
  {
    name: 'Express 24 h',
    slug: 'express-24h',
    description: 'Collecte et retour sous 24 heures pour les urgences.',
    price: 19.9,
    deliveryDays: 1,
    features: ['Collecte à domicile', 'Repassage inclus', 'Housse de protection'],
  },
  {
    name: 'Standard 48 h',
    slug: 'standard-48h',
    description: 'Notre formule la plus demandée, qualité et prix maîtrisés.',
    price: 12.9,
    deliveryDays: 2,
    features: ['Collecte à domicile', 'Nettoyage à sec ou eau', 'Plastique recyclable'],
  },
  {
    name: 'Abonnement mensuel',
    slug: 'abonnement-mensuel',
    description: 'Pour les professionnels et foyers actifs, tarif préférentiel.',
    price: 89,
    deliveryDays: 2,
    features: ['2 collectes par mois', 'Jusqu\'à 15 pièces / collecte', 'Priorité planning'],
  },
]

export const siteSettings = {
  homeTagline: 'Trois univers, une même exigence.',
  homeDescription:
    'SOLISS TRILL réunit un market curaté, un bar créatif et un service de pressing à domicile. Découvrez nos trois pôles.',
  marketIntro:
    'Parcourez notre sélection par catégories : accessoires, épicerie, tech, bien-être et plus encore.',
  barIntro:
    'Cocktails signature ou création sur mesure à partir de notre catalogue d\'ingrédients.',
  laundryIntro:
    'Pressing à domicile, collecte et livraison. Demandez votre devis en ligne en quelques clics.',
  paymentNotice: 'Paiement en ligne — bientôt disponible',
}
