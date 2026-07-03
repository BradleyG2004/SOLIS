# SOLISS TRILL — Manuel d'utilisation

Ce manuel s'adresse à toute personne qui gère le contenu du site SOLISS TRILL au quotidien : ajout de produits, de cocktails, d'offres de pressing, suivi des commandes et des demandes de devis.

Le site est composé de deux parties :

- **Le site public** — ce que vos visiteurs voient et utilisent (`https://votre-domaine.fr`)
- **Le portail admin** — l'espace où vous gérez le contenu (`https://votre-domaine.fr/admin`)

---

## 1. Le site public

Le site présente cinq pôles d'activité, accessibles depuis la page d'accueil :

| Pôle | Adresse | Ce qu'il propose |
|---|---|---|
| **SOLISS Market** | `/market` | Catalogue de produits par catégories |
| **SOLISS Bar** | `/bar` | Cocktails signature + création de cocktail sur mesure |
| **SOLISS Laundry** | `/laundry` | Offres de pressing + demande de devis |
| **SOLISS Immo** | `/immo` | Transport de meubles/charges lourdes + demande de devis |
| **SOLISS Transit** | `/transit` | Logistique — page d'annonce, service pas encore actif |

### 1.1 SOLISS Market

Les visiteurs parcourent les **catégories** (Accessoires, Nourriture, Électronique, etc.), puis les **produits** de chaque catégorie. Chaque fiche produit affiche nom, description, prix et une image.

### 1.2 SOLISS Bar

Deux façons de commander :

- **Cocktails signature** : une liste de recettes prêtes, avec composition et prix. Le client clique sur "Commander" pour envoyer sa demande.
- **Créer mon cocktail** (`/bar/creer`) : le client compose lui-même son cocktail à partir du catalogue d'ingrédients, ajuste les quantités, et envoie sa commande avec ses coordonnées.

Chaque commande envoyée depuis cette page atterrit dans le portail admin sous **Commandes cocktails**.

### 1.3 SOLISS Laundry

Le visiteur consulte les offres de pressing (Express 24h, Standard 48h, Abonnement mensuel...) puis remplit un formulaire de **demande de devis** (`/laundry/devis`) : type d'articles, quantités, coordonnées. La demande atterrit dans le portail admin sous **Demandes de devis**.

### 1.4 SOLISS Immo

Page vitrine pour le transport de meubles/charges par tricycle motorisé, avec un lien vers un formulaire de devis (`/immo/devis`).

### 1.5 SOLISS Transit

Page d'annonce uniquement — le service n'est pas encore actif. Rien à gérer ici pour l'instant.

---

## 2. Se connecter au portail admin

1. Allez sur `https://votre-domaine.fr/admin`
2. Connectez-vous avec votre email et votre mot de passe administrateur
3. Vous arrivez sur le tableau de bord, avec le menu à gauche organisé par groupes :
   - **Globals** — Paramètres du site
   - **Administration** — Utilisateurs, Médias
   - **SOLISS Market** — Catégories, Produits
   - **SOLISS Bar** — Ingrédients, Matériel, Cocktails signature
   - **SOLISS Laundry** — Offres pressing
   - **Commandes** — Commandes cocktails, Demandes de devis

> **Important — premier accès** : si on vous a fourni un compte par défaut (`admin@SOLISS-trill.fr`), changez le mot de passe dès la première connexion via **Administration → Utilisateurs → votre compte**.

---

## 3. Gérer le catalogue

### 3.1 Catégories (Market)

**Administration → SOLISS Market → Catégories**

Chaque catégorie a :
- **Nom** — affiché sur le site (ex. "Accessoires")
- **Identifiant URL** — technique, utilisé dans l'adresse de la page (ex. `accessoires`). Ne pas mettre d'espaces ni d'accents.
- **Description** — courte phrase affichée sous le nom
- **Ordre d'affichage** — un nombre ; les catégories s'affichent de la plus petite à la plus grande valeur
- **Image** — voir [section 5](#5-gérer-les-images)
- **Visible sur le site** — décochez pour masquer la catégorie sans la supprimer

Pour créer une catégorie : cliquez sur **Create New**, remplissez les champs, cliquez sur **Save**.

### 3.2 Produits (Market)

**Administration → SOLISS Market → Produits**

Chaque produit appartient à une catégorie (champ **Catégorie**, à choisir dans la liste). Les autres champs (nom, description, prix, image, visibilité) fonctionnent comme pour les catégories.

Un produit avec **Visible sur le site** décoché n'apparaît plus dans le catalogue, mais reste enregistré — pratique pour une rupture de stock temporaire.

### 3.3 Ingrédients et Matériel (Bar)

**Administration → SOLISS Bar → Ingrédients** / **Matériel**

Ces deux collections alimentent le configurateur "Créer mon cocktail" du site. Un ingrédient a un **Type** (alcool, jus, sirop, garniture, autre), un **prix unitaire** et une **unité** (cl, brin, dash...). Décochez **Disponible** pour retirer temporairement un ingrédient du configurateur.

Le **Matériel** (shaker, verre, passoire...) est utilisé pour indiquer ce qu'il faut pour préparer un cocktail signature — champ informatif uniquement.

### 3.4 Cocktails signature (Bar)

**Administration → SOLISS Bar → Cocktails signature**

En plus des champs habituels (nom, description, prix, image, visibilité) :
- **Préparation** — les instructions affichées sur la fiche du cocktail
- **Composition** — liste des ingrédients avec quantité et unité ; cliquez sur **Add Row** pour ajouter une ligne
- **Matériel utilisé** — sélection dans la liste Matériel

### 3.5 Offres pressing (Laundry)

**Administration → SOLISS Laundry → Offres pressing**

Une offre a un nom, une description, un prix, un délai de livraison (en jours) et une liste de **Points inclus** (ex. "Collecte à domicile", "Repassage inclus") — cliquez sur **Add Row** pour ajouter un point.

---

## 4. Suivre les commandes et devis

### 4.1 Commandes cocktails

**Administration → Commandes → Commandes cocktails**

Chaque ligne correspond à une commande passée depuis le site (cocktail signature ou création sur mesure). Ouvrez une commande pour voir le détail (client, ingrédients, notes) et mettre à jour le **Statut** :

`Nouvelle` → `En préparation` → `Traitée` (ou `Annulée`)

### 4.2 Demandes de devis

**Administration → Commandes → Demandes de devis**

Fonctionne comme les commandes cocktails : chaque demande envoyée depuis `/laundry/devis` apparaît ici avec les coordonnées du client, les articles à traiter, et un statut à faire évoluer :

`Nouvelle` → `Devis envoyé` → `Acceptée` (ou `Refusée`)

---

## 5. Gérer les images

Chaque catégorie, produit, cocktail et offre pressing a un champ **Image**. Tant qu'aucune image n'est ajoutée, le site affiche automatiquement une photo générique de remplacement — dès que vous uploadez une image sur une fiche, elle la remplace sur le site.

**Pour ajouter une image à une fiche :**

1. Ouvrez la fiche (catégorie, produit, cocktail ou offre)
2. Cliquez sur le champ **Image**
3. Choisissez **Upload a new file** (nouvel envoi) ou sélectionnez un média déjà présent dans **Médias**
4. Renseignez le **texte alternatif** (description courte de l'image, utile pour l'accessibilité)
5. **Save**

Toutes les images envoyées sont centralisées dans **Administration → Médias** — vous pouvez les réutiliser sur plusieurs fiches.

> **Conseil** : privilégiez des photos assez larges (au moins 800 px de large) et au format paysage pour un rendu net sur toutes les pages.

---

## 6. Paramètres généraux du site

**Globals → Paramètres du site**

Ce formulaire unique contrôle les textes d'introduction affichés sur la page d'accueil et en tête de chaque pôle :

- **Accroche accueil** / **Description accueil** — le titre et le texte sous "SOLISS TRILL" en page d'accueil
- **Introduction SOLISS Market / Bar / Laundry** — le texte en haut de chaque page de pôle
- **Message paiement en cours** — bandeau affiché tant que le paiement en ligne n'est pas activé

---

## 7. Gérer les comptes administrateurs

**Administration → Utilisateurs**

Chaque utilisateur créé ici peut se connecter à `/admin` avec les mêmes droits (création, modification, suppression sur tout le catalogue et les commandes). Pour ajouter un collaborateur :

1. **Create New**
2. Renseignez son email, un mot de passe temporaire, et son nom
3. **Save** — communiquez-lui ses identifiants pour qu'il puisse se connecter et changer son mot de passe

---

## 8. Bon à savoir

- **Rien n'est jamais définitivement perdu par accident** : décocher "Visible sur le site" masque un élément sans le supprimer. Préférez toujours cette option à la suppression si vous n'êtes pas sûr.
- **L'identifiant URL (slug)** d'une catégorie, d'un produit, d'un cocktail ou d'une offre ne doit jamais contenir d'espaces ni d'accents, et doit être unique. Si vous le changez après publication, l'ancienne adresse ne fonctionnera plus.
- **Les statuts de commandes/devis sont uniquement internes** — les changer ne notifie pas automatiquement le client par email ; pensez à le recontacter directement (téléphone/email indiqués sur sa fiche).
