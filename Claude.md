# Coracia — Instructions Claude Code

## Règles absolues
- Ne modifie AUCUN fichier sans que je te le demande explicitement
- Ne crée un nouveau fichier que si je te le demande explicitement
- Ne supprime AUCUNE fonctionnalité existante sans confirmation
- Après chaque modification : indiquer précisément quel fichier,
  quelle ligne, ce qui a changé

## État actuel du projet (juin 2026)

### Pages existantes
- index.html → splash screen
- onboarding.html → 2 slides intro (Sillans + mission Coracia)
- accueil.html → hub principal avec logo dynamique Coracia
- parcours.html → liste des 6 points avec statuts
- carte.html → carte Leaflet + Maptiler + GeoJSON sentier
- capsule.html → contenu dynamique via js/capsule.js
- quiz.html → 3 questions par capsule
- apres-visite.html → bilan final

### Fichiers JS
- js/state.js → état global, localStorage, couleurs Coracia
- js/navigation.js → transitions entre pages
- js/carte.js → carte Leaflet, marqueurs, GeoJSON, GPS
- js/capsule.js → rendu capsule dynamique
- js/quiz.js → système questions/réponses
- js/rollier.js → mascotte
- js/ambiance.js → fond animé orbes bleues + particules
- js/pwa.js → installation PWA
- data/content.js → CAPSULES, QUIZ, THEMES, COULEUR_LABELS

### Fichiers CSS
- css/base.css → reset, variables, typographie
- css/components.css → boutons, cards, badges, nav, pop-ups
- css/animations.css → keyframes, orbes, flottement

### Assets icons
- assets/icons/logo-sillans.svg → oiseau principal
- assets/icons/logo-sillans-ecrit.svg → wordmark header
- assets/icons/Coracia fatigué.svg → 0 couleur
- assets/icons/Coracia 1 sur 4.svg → 1 couleur
- assets/icons/Coracia 2 sur 4.svg → 2 couleurs
- assets/icons/Coracia 3 sur 4.svg → 3 couleurs
- assets/icons/Coracia 4 sur 4.svg → à venir

## Charte graphique (DA)
Palette : #000000, #FFFFFF, #50B1FE, #91FF05, #F5CE18
Fond : #0A1628
Glassmorphism : backdrop-filter blur, bordures rgba(80,177,254,0.4)
Typographie : serif italic pour citations/titres poétiques
Ton : poétique, immersif, "Le Rollier gardien du sanctuaire"

## Système de jeu
- 6 capsules, 4 couleurs à débloquer (1 par capsule 1→4)
- Score quiz : 0/3 perd couleur, 1/3 rien, 2/3 gagne, 3/3 gagne + bénédiction
- Ordre couleurs : #F5CE18 → #91FF05 → #0A4A8A → #50B1FE
- localStorage : coracia_couleurs, coracia_completed,
  coracia_visited, coracia_benediction, app-installed,
  popup-install-seen

## Carte Leaflet
- Tuiles Maptiler : clé j5GTbvHC4ExI3Tj8orVK
- 6 marqueurs avec coordonnées terrain exactes
- Tracé GeoJSON du sentier réel
- GPS temps réel via navigator.geolocation
- Panneau info au clic sur marqueur : z-index 9999,
  ajouté au document.body (pas dans #map)

## Problèmes connus en cours de résolution
- Bouton "Passer →" dans capsule.js : utiliser
  window.location.href au lieu de navigateTo()
- Panneau carte doit être dans document.body z-index 9999
- Tous les boutons CTA : padding-bottom env(safe-area-inset-bottom)
  pour iOS Safari
- Hauteurs : utiliser 100dvh au lieu de 100vh

## Ce qui fonctionne
- Pop-up installation PWA avec vraie API beforeinstallprompt
- Badge hors-ligne dynamique (orange agaçant → vert après install)
- Fond animé orbes bleues avec hue-rotate smooth
- Onboarding 2 slides
- Parcours avec déverrouillage progressif
- Quiz 3 questions par capsule avec feedback DA
- Logo Coracia dynamique selon couleurs débloquées
- Tracé sentier GeoJSON exact sur la carte