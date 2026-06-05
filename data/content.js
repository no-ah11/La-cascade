const CAPSULES = [
  {
    id: 1,
    titre: "La source sacrée",
    theme: "Eau & Géologie",
    theme_color: "#4DB8FF",
    theme_key: "eau",
    distance: "50 m",
    citation: "L'eau qui sourd ici murmure depuis des siècles, voyageur.",
    texte: `Cette source naturelle est le cœur battant du sanctuaire. Alimentée par les nappes phréatiques de la colline calcaire, elle maintient une température constante de 13°C tout au long de l'année. Les moines médiévaux l'avaient déjà canalisée pour irriguer leurs jardins.

L'eau de source s'infiltre dans le calcaire en surface, se charge en minéraux au fil de son parcours souterrain, et ressurgit ici après plusieurs années de filtration naturelle.`,
    saviez_vous: "Cette source n'a jamais tari depuis 800 ans, même lors des grandes sécheresses de 2003 et 2022.",
    image: "assets/images/capsule-1.jpg",
    video: "assets/videos/capsule-1.mp4",
    audio: "assets/videos/capsule-1-audio.mp3",
    schema: "assets/images/capsule-1-schema.jpg",
    photos: ["assets/images/capsule-1-photo-1.jpg", "assets/images/capsule-1-photo-2.jpg", "assets/images/capsule-1-photo-3.jpg"],
    duree_audio: "2 min",
    pos: { x: 195, y: 520 }
  },
  {
    id: 2,
    titre: "Le tuff",
    theme: "Eau & Géologie",
    theme_color: "#4DB8FF",
    theme_key: "eau",
    distance: "120 m",
    citation: "Cette pierre tendre est née de l'eau, goutte après goutte.",
    texte: `Le tuff se forme lorsque l'eau chargée de calcaire dépose, couche après couche, une roche poreuse autour des mousses et des végétaux. Au fil des siècles, ces dépôts façonnent vasques et cascades.

Pose la main : la pierre garde la mémoire de l'eau. Tu peux encore distinguer les empreintes de mousses fossilisées dans la roche.`,
    saviez_vous: "Le tuff est aussi appelé travertin. Les Romains l'utilisaient déjà pour construire leurs aqueducs.",
    image: "assets/images/capsule-2.jpg",
    video: "assets/videos/capsule-2.mp4",
    audio: "assets/videos/capsule-2-audio.mp3",
    schema: "assets/images/capsule-2-schema.jpg",
    photos: ["assets/images/capsule-2-photo-1.jpg", "assets/images/capsule-2-photo-2.jpg", "assets/images/capsule-2-photo-3.jpg"],
    duree_audio: "2 min",
    pos: { x: 280, y: 400 }
  },
  {
    id: 3,
    titre: "La chênaie ancestrale",
    theme: "Biodiversité",
    theme_color: "#A8E63D",
    theme_key: "biodiv",
    distance: "200 m",
    citation: "Chaque arbre ici est une bibliothèque vivante.",
    texte: `Cette chênaie de chênes pubescents a plus de trois siècles. Certains spécimens mesurent plus de 18 mètres et abritent des dizaines d'espèces d'insectes, oiseaux et champignons en symbiose.

Le chêne pubescent est l'essence emblématique de la Provence calcaire. Il résiste remarquablement à la sécheresse grâce à ses feuilles duveteuses qui limitent l'évaporation.`,
    saviez_vous: "Un seul vieux chêne peut abriter plus de 500 espèces d'insectes différentes.",
    image: "assets/images/capsule-3.jpg",
    video: "assets/videos/capsule-3.mp4",
    audio: "assets/videos/capsule-3-audio.mp3",
    schema: "assets/images/capsule-3-schema.jpg",
    photos: ["assets/images/capsule-3-photo-1.jpg", "assets/images/capsule-3-photo-2.jpg", "assets/images/capsule-3-photo-3.jpg"],
    duree_audio: "3 min",
    pos: { x: 150, y: 310 }
  },
  {
    id: 4,
    titre: "Le moulin des moines",
    theme: "Patrimoine",
    theme_color: "#F5A623",
    theme_key: "patrimoine",
    distance: "280 m",
    citation: "Ces pierres ont gardé le silence des siècles.",
    texte: `Ce moulin à eau du XIIe siècle appartenait à l'abbaye cistercienne voisine. Sa roue à aubes, aujourd'hui disparue, exploitait la force du ruisseau pour moudre le grain et presser les olives.

Les moines avaient creusé un canal de dérivation de 400 mètres pour alimenter le moulin même en période de basses eaux. Ce travail hydraulique témoigne d'un savoir-faire remarquable.`,
    saviez_vous: "Le moulin a fonctionné jusqu'en 1943. Les meules en granit, importées d'Alsace, pèsent chacune 800 kg.",
    image: "assets/images/capsule-4.jpg",
    video: "assets/videos/capsule-4.mp4",
    audio: "assets/videos/capsule-4-audio.mp3",
    schema: "assets/images/capsule-4-schema.jpg",
    photos: ["assets/images/capsule-4-photo-1.jpg", "assets/images/capsule-4-photo-2.jpg", "assets/images/capsule-4-photo-3.jpg"],
    duree_audio: "3 min",
    pos: { x: 260, y: 210 }
  },
  {
    id: 5,
    titre: "Les espèces protégées",
    theme: "Biodiversité",
    theme_color: "#A8E63D",
    theme_key: "biodiv",
    distance: "340 m",
    citation: "La beauté ici est fragile. Marche doucement.",
    texte: `Ce secteur humide abrite plusieurs espèces strictement protégées par la loi européenne : la Diane (papillon rare), le Triton palmé et l'Agrion de Mercure (libellule). Leur présence indique une eau de très haute qualité.

Ces espèces bio-indicatrices sont les sentinelles de la santé du sanctuaire. Leur disparition serait le premier signe d'une dégradation de l'écosystème.`,
    saviez_vous: "La Diane, ce papillon blanc et rouge, ne vit que dans les sources calcaires propres. Il est absent de 90% de ses habitats historiques.",
    image: "assets/images/capsule-5.jpg",
    video: "assets/videos/capsule-5.mp4",
    audio: "assets/videos/capsule-5-audio.mp3",
    schema: "assets/images/capsule-5-schema.jpg",
    photos: ["assets/images/capsule-5-photo-1.jpg", "assets/images/capsule-5-photo-2.jpg", "assets/images/capsule-5-photo-3.jpg"],
    duree_audio: "3 min",
    pos: { x: 130, y: 130 }
  },
  {
    id: 6,
    titre: "Vivre avec le feu",
    theme: "Gestion des risques",
    theme_color: "#E05C3A",
    theme_key: "risques",
    distance: "420 m",
    citation: "Le feu est l'ancien maître de cette forêt.",
    texte: `La Provence vit avec le risque incendie depuis toujours. Ce belvédère offre une vue sur la DFCI (piste de Défense des Forêts Contre l'Incendie) et la citerne de 120 000 litres installée en 2018.

Le sanctuaire applique un débroussaillement raisonné : les zones tampons autour des sentiers sont entretenues tous les deux ans pour ralentir la propagation d'un éventuel feu sans détruire les habitats naturels.`,
    saviez_vous: "Certaines plantes provençales comme la lavande ont évolué pour favoriser les incendies : leurs huiles essentielles sont inflammables, ce qui élimine leurs concurrents moins résistants.",
    image: "assets/images/capsule-6.jpg",
    video: "assets/videos/capsule-6.mp4",
    audio: "assets/videos/capsule-6-audio.mp3",
    schema: "assets/images/capsule-6-schema.jpg",
    photos: ["assets/images/capsule-6-photo-1.jpg", "assets/images/capsule-6-photo-2.jpg", "assets/images/capsule-6-photo-3.jpg"],
    duree_audio: "3 min",
    pos: { x: 220, y: 50 }
  }
];

const QUIZ = [
  {
    id: 1,
    capsule_ref: 2,
    citation_indice: "Rappelle-toi : la pierre garde l'empreinte du temps.",
    question: "Comment se forme le tuff dans la nature ?",
    reponses: [
      { lettre: "A", texte: "Par dépôt de calcaire dans l'eau", correct: true },
      { lettre: "B", texte: "Par fusion de roches volcaniques", correct: false },
      { lettre: "C", texte: "Par érosion du vent sur le calcaire", correct: false },
      { lettre: "D", texte: "Par sédimentation marine ancienne", correct: false }
    ],
    explication: "L'eau minéralisée dépose le calcaire couche par couche autour des végétaux et des mousses."
  },
  {
    id: 2,
    capsule_ref: 1,
    citation_indice: "L'eau a ses propres chemins, invisibles sous nos pieds.",
    question: "Quelle température constante maintient la source sacrée du sanctuaire ?",
    reponses: [
      { lettre: "A", texte: "7°C", correct: false },
      { lettre: "B", texte: "13°C", correct: true },
      { lettre: "C", texte: "18°C", correct: false },
      { lettre: "D", texte: "22°C", correct: false }
    ],
    explication: "La filtration souterraine à travers le calcaire stabilise naturellement la température à 13°C."
  },
  {
    id: 3,
    capsule_ref: 3,
    citation_indice: "Les vieux arbres parlent à qui sait les écouter.",
    question: "Combien d'espèces d'insectes un seul vieux chêne peut-il abriter ?",
    reponses: [
      { lettre: "A", texte: "Environ 50 espèces", correct: false },
      { lettre: "B", texte: "Environ 150 espèces", correct: false },
      { lettre: "C", texte: "Plus de 500 espèces", correct: true },
      { lettre: "D", texte: "Environ 1000 espèces", correct: false }
    ],
    explication: "La complexité structurelle d'un vieux chêne (écorce, cavités, feuilles, glands) crée des centaines de niches écologiques."
  },
  {
    id: 4,
    capsule_ref: 5,
    citation_indice: "Les plus petites créatures sont souvent les plus précieuses.",
    question: "Que signifie la présence de la Diane (papillon) dans un cours d'eau ?",
    reponses: [
      { lettre: "A", texte: "Que l'eau est polluée", correct: false },
      { lettre: "B", texte: "Que l'eau est de très haute qualité", correct: true },
      { lettre: "C", texte: "Que la température est élevée", correct: false },
      { lettre: "D", texte: "Que le cours d'eau est artificiel", correct: false }
    ],
    explication: "La Diane est une espèce bio-indicatrice : elle ne survit que dans les eaux calcaires très propres, non polluées."
  },
  {
    id: 5,
    capsule_ref: 6,
    citation_indice: "Certaines plantes ont apprivoisé la flamme elle-même.",
    question: "Pourquoi certaines plantes provençales favorisent-elles les incendies ?",
    reponses: [
      { lettre: "A", texte: "Pour attirer les insectes pollinisateurs", correct: false },
      { lettre: "B", texte: "Pour se réchauffer en hiver", correct: false },
      { lettre: "C", texte: "Leurs huiles essentielles inflammables éliminent leurs concurrents", correct: true },
      { lettre: "D", texte: "Pour libérer leurs graines plus facilement", correct: false }
    ],
    explication: "La lavande et d'autres garrigues ont évolué pour utiliser le feu comme outil concurrentiel — une adaptation remarquable."
  }
];

const THEMES = [
  { id: 1, key: "eau", numero: "01", titre: "Eau &<br>Géologie", icon: "drop", color: "#4DB8FF" },
  { id: 2, key: "biodiv", numero: "02", titre: "Biodiversité", icon: "leaf", color: "#A8E63D" },
  { id: 3, key: "patrimoine", numero: "03", titre: "Patrimoine", icon: "monument", color: "#F5A623" },
  { id: 4, key: "risques", numero: "04", titre: "Gestion<br>des risques", icon: "shield", color: "#E05C3A" }
];

const COULEUR_LABELS = {
  blue: { nom: "Le Bleu des sources", desc: "Couleur de l'eau pure et de la mémoire géologique." },
  green: { nom: "Le Vert des vivants", desc: "Couleur du règne végétal et de la biodiversité." },
  orange: { nom: "L'Ocre des hommes", desc: "Couleur du patrimoine bâti et de l'histoire." },
  red: { nom: "Le Rouge de la flamme", desc: "Couleur du feu et de la gestion des risques." }
};

const ROLLIER_COLORS = ['#4DB8FF', '#A8E63D', '#F5A623', '#9B6BD8', '#4DE6E6'];

const ROLLIER_FELICITATIONS = [
  "Bien joué, voyageur !",
  "Tu écoutes bien la forêt.",
  "Le sanctuaire te reconnaît.",
  "La sagesse t'accompagne.",
  "Magnifique, voyageur !"
];

if (typeof window !== 'undefined') {
  window.CAPSULES = CAPSULES;
  window.QUIZ = QUIZ;
  window.THEMES = THEMES;
  window.COULEUR_LABELS = COULEUR_LABELS;
  window.ROLLIER_COLORS = ROLLIER_COLORS;
  window.ROLLIER_FELICITATIONS = ROLLIER_FELICITATIONS;
}
