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
