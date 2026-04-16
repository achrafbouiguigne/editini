# EDITINI — Site Web

Site one-page pour EDITINI, agence de marketing digital à Rabat. Construit avec [Astro](https://astro.build/), sortie 100 % statique.

---

## Démarrage rapide

```bash
npm install          # première fois uniquement
npm run dev          # dev server sur http://localhost:4321
npm run build        # génère le site dans dist/
npm run preview      # prévisualise le build statique
```

Déploiement : le dossier `dist/` généré par `npm run build` est un site statique complet. Vous pouvez l’héberger tel quel sur **Vercel**, **Netlify**, **Cloudflare Pages**, **GitHub Pages**, ou n’importe quel serveur de fichiers.

---

## Avant la mise en ligne

### 1. Définir votre domaine de production

Ouvrez [`astro.config.mjs`](astro.config.mjs) et décommentez / remplacez la ligne `site` :

```js
site: "https://editini.ma",   // <-- mettez votre vrai domaine
```

Cela active automatiquement les balises `<link rel="canonical">` et `<meta property="og:url">` avec la bonne URL — indispensable pour le SEO et les aperçus sur réseaux sociaux.

### 2. Ajouter les vrais liens réseaux sociaux

Dans [`src/components/CTA.astro`](src/components/CTA.astro), les liens Instagram / YouTube / Facebook pointent pour l’instant sur `#`. Remplacez chaque `href="#"` par l’URL réelle :

```astro
<a href="https://instagram.com/editini" ... >
<a href="https://youtube.com/@editini" ... >
<a href="https://facebook.com/editini" ... >
<a href="https://wa.me/212XXXXXXXXX" ... >   <!-- WhatsApp : format international sans + -->
```

Le lien WhatsApp apparaît **deux fois** (pilule sociale + bouton principal "Démarrer votre Succès") — remplacez les deux.

### 3. Titre, description, SEO

Dans [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro), ajustez les valeurs par défaut en haut du fichier :

```ts
const {
  title = "EDITINI — Digital Marketing Agency à Rabat",
  description = "…",
}
```

L’adresse et le pays (Rabat / Maroc) pour les données Google (JSON-LD `LocalBusiness`) sont aussi dans ce fichier — cherchez `businessSchema` et adaptez.

---

## Modifier le contenu

Chaque section est un fichier indépendant dans [`src/components/`](src/components/). Le texte est directement dans ces fichiers. Pas besoin de base de données, pas de CMS.

| Pour changer…                                 | Ouvrez                                                    |
| --------------------------------------------- | --------------------------------------------------------- |
| Le titre et la description du héros           | [`src/components/Hero.astro`](src/components/Hero.astro)  |
| Les chiffres clés (100+, 4, ∞)                | [`src/components/Hero.astro`](src/components/Hero.astro)  |
| Les mots défilants (marquee)                  | [`src/components/Marquee.astro`](src/components/Marquee.astro) |
| Le texte "Qui sommes-nous" + les 4 piliers    | [`src/components/About.astro`](src/components/About.astro) |
| Les 4 cartes de services                      | [`src/components/Services.astro`](src/components/Services.astro) |
| Les packs, leurs fonctionnalités, tarifs      | [`src/components/Packs.astro`](src/components/Packs.astro) |
| La liste des services de montage              | [`src/components/Montage.astro`](src/components/Montage.astro) |
| Le bloc CTA final et les boutons sociaux      | [`src/components/CTA.astro`](src/components/CTA.astro)    |
| Le menu de navigation                         | [`src/components/Nav.astro`](src/components/Nav.astro)    |
| Le pied de page                               | [`src/components/Footer.astro`](src/components/Footer.astro) |

### Exemple : ajouter / modifier un pack

Dans `Packs.astro`, le haut du fichier contient les données :

```ts
const contentPacks: Pack[] = [
  {
    tier: "Pack",
    name: "GOLD",
    features: [
      "8 Montages Vidéo Premium",
      "8 Designs Miniatures Premium",
      // ajoutez ou modifiez des lignes ici
    ],
    cta: "Choisir ce Pack",
  },
  // …
];
```

Ajoutez `featured: true` à un pack pour le mettre en avant (badge "Most Wanted", style doré).

### Exemple : ajouter un service

Dans `Services.astro`, ajoutez un objet au tableau `services` :

```ts
{
  num: "05",
  icon: "🎨",
  title: "Design Graphique",
  body: "Description du nouveau service.",
  href: "#packs",
  cta: "Voir Packs →",
},
```

Pensez à adapter `grid-template-columns: repeat(4, 1fr)` dans le `<style>` si vous changez le nombre de cartes.

---

## Design (couleurs, polices)

### Couleurs

Toutes les couleurs sont des variables CSS définies en haut de [`src/styles/global.css`](src/styles/global.css) :

```css
:root {
  --gold: #c9933a;         /* couleur principale dorée */
  --gold-light: #e8b84b;
  --gold-dark: #8b6120;
  --black: #060606;        /* fond principal */
  --dark: #0d0d0d;
  --dark2: #141414;
  --white: #f5f0e8;        /* texte principal */
  --border: rgba(201, 147, 58, 0.18);
}
```

Changez ces valeurs et toute la charte graphique se met à jour automatiquement.

### Polices

Configurées dans [`astro.config.mjs`](astro.config.mjs) via l’API officielle de polices d’Astro. Elles sont **auto-hébergées** (téléchargées pendant le build), sous-ensemblées aux caractères latins utilisés, et préchargées — pas d’appel à Google à l’exécution.

Pour changer une police, remplacez le `name` :

```js
{
  name: "Inter",               // au lieu de "DM Sans"
  cssVariable: "--font-dm-sans",  // gardez la variable, ou renommez-la
  provider: fontProviders.google(),
  weights: [300, 400, 500],
  ...
}
```

---

## Favicon et image de partage

- **Favicon** : [`public/favicon.svg`](public/favicon.svg) — remplacez ce fichier par votre logo (SVG recommandé, sinon PNG 512×512).
- **Image Open Graph** (aperçu sur WhatsApp / Facebook / LinkedIn) : ajoutez un fichier `og-image.jpg` (1200×630 px) dans `public/`, puis ajoutez cette ligne dans [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) à côté des autres balises `og:` :

```astro
<meta property="og:image" content={new URL("/og-image.jpg", Astro.site)} />
```

---

## Déploiement

### Vercel / Netlify / Cloudflare Pages

Connectez le dépôt, laissez les paramètres par défaut :
- **Build command** : `npm run build`
- **Output directory** : `dist`

### GitHub Pages

Ajoutez le workflow fourni par Astro : https://docs.astro.build/en/guides/deploy/github/

### N’importe quel hébergeur statique

Lancez `npm run build` et uploadez le contenu du dossier `dist/` (FTP, SCP, etc.).

---

## Structure du projet

```
editini-astro/
├── astro.config.mjs     # config Astro + polices
├── public/              # fichiers servis tels quels (favicon, images, etc.)
└── src/
    ├── layouts/
    │   └── BaseLayout.astro   # <head>, meta SEO, structure commune
    ├── pages/
    │   └── index.astro        # page d'accueil (assemble les sections)
    ├── components/            # une section = un fichier
    └── styles/
        └── global.css         # variables de couleur + styles partagés
```

---

## Aide

- Documentation Astro : https://docs.astro.build/
- Discord Astro (support gratuit) : https://astro.build/chat
