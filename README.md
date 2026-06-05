# Coracia — Web app de visite guidée immersive

Application mobile-first de médiation culturelle pour un sanctuaire naturel provençal. Le visiteur suit un parcours linéaire de 6 points d'intérêt, découvre des capsules de contenu, répond à des questions et restaure progressivement les couleurs du sanctuaire.

## Architecture

```
coracia/
├── index.html              splash screen
├── onboarding.html         introduction (2 slides)
├── accueil.html            hub principal
├── carte.html              carte SVG interactive
├── capsule.html            vue capsule (contenu dynamique via JS)
├── quiz.html               quiz 5 questions
├── apres-visite.html       récap post-visite
│
├── css/
│   ├── base.css            reset, variables CSS, typographie
│   ├── components.css      boutons, cards, badges, nav, bottom-sheet
│   └── animations.css      keyframes et transitions
│
├── js/
│   ├── state.js            état global + localStorage
│   ├── navigation.js       transitions entre pages
│   ├── carte.js            logique SVG carte + interactions
│   ├── capsule.js          chargement dynamique des capsules
│   ├── quiz.js             logique quiz, scoring
│   └── rollier.js          mascotte (apparitions, citations)
│
├── assets/
│   ├── images/             images des capsules (à déposer)
│   ├── videos/             vidéos et audios (à déposer)
│   └── icons/              icônes SVG custom
│
└── data/
    └── content.js          contenu (capsules, quiz, citations)
```

## Ajouter ses assets

Dans `assets/images/`, dépose tes fichiers selon ce nommage :

- `capsule-1.jpg` à `capsule-6.jpg` : image hero de chaque capsule
- `capsule-1-photo-1.jpg`, `capsule-1-photo-2.jpg`, `capsule-1-photo-3.jpg` : photos du diaporama (idem pour 2 à 6)
- `capsule-1-schema.jpg` à `capsule-6-schema.jpg` : schémas légendés

Dans `assets/videos/`, dépose :

- `capsule-1.mp4` à `capsule-6.mp4` : vidéos
- `capsule-1-audio.mp3` à `capsule-6-audio.mp3` : narrations audio

Si un fichier est absent, un placeholder élégant s'affiche à sa place.

## Modifier le contenu

Tout le texte (capsules, quiz, citations) est dans `data/content.js`. Édite directement les chaînes — pas de build ni de compilation requise.

## Installation hors-ligne (PWA)

L'app est une **PWA** : elle s'installe sur le téléphone et fonctionne sans connexion une fois la première visite faite.

### iPhone (Safari)
1. Ouvrir https://no-ah11.github.io/La-cascade/ dans Safari
2. Bouton **Partager** (carré avec flèche) → **Sur l'écran d'accueil**
3. L'icône Sillans apparaît sur le bureau ; ouvrir, faire défiler une fois toute l'app pour pré-charger
4. À partir de là, fonctionne hors-ligne (vol avion / forêt sans réseau)

### Android (Chrome)
1. Ouvrir l'URL dans Chrome
2. Menu ⋮ → **Installer l'application** (ou bannière qui apparaît)
3. Lancer depuis l'écran d'accueil, hors-ligne OK après première visite

### Ce qui est mis en cache automatiquement
- Toutes les pages HTML, CSS, JS, données (content.js)
- Le logo SVG
- Les polices Google Fonts (au premier chargement)
- Les images de capsules sont mises en cache **à la volée** quand tu les visites — donc fais un tour complet des 6 capsules en connexion avant de partir.

### Pousser une mise à jour
Quand tu modifies le code, incrémente `CACHE_VERSION` dans [service-worker.js](service-worker.js) — sinon les utilisateurs garderont l'ancienne version en cache. Un toast "Nouvelle version disponible" apparaît automatiquement chez les utilisateurs.

## Lancer en local

```bash
# Avec Python
python3 -m http.server 8000

# Ou avec Node
npx serve .
```

Puis ouvre http://localhost:8000

## Déployer sur GitHub Pages

Aucune configuration nécessaire :

1. Push sur GitHub
2. Settings → Pages → Source : `main`
3. URL : `https://<user>.github.io/<repo>/`

## Stack

- HTML/CSS/JS vanilla — zéro dépendance, zéro build
- Fonts : Cormorant Garamond + DM Sans (Google Fonts)
- Persistance : `localStorage`
- Compatibilité : iOS Safari, Chrome Android, navigateurs modernes
