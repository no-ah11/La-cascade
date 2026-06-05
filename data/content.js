const CAPSULES = [
  {
    id: 1,
    titre: "L'église Notre-Dame",
    sous_titre: "Au niveau de l'église — point de repère",
    theme: "Patrimoine",
    theme_color: "#F5A623",
    theme_key: "patrimoine",
    distance: "0 m",
    citation: "Voyageur, ici commence ton chemin. Écoute les cloches du temps.",
    texte: `L'église Notre-Dame de l'Assomption surplombe Sillans-la-Cascade depuis le XIIᵉ siècle. Reconstruite et remaniée au fil des âges, elle conserve une nef romane caractéristique et un clocher-tour qui a longtemps servi de repère aux paysans de la vallée de la Bresque.

Son emplacement est aussi celui d'un point d'observation : depuis le parvis, on embrasse d'un seul regard le village médiéval, la plaine cultivée et les collines boisées qui annoncent la garrigue. C'est ici que commence ton circuit.`,
    saviez_vous: "La cloche de l'église, fondue à la fin du XVIᵉ siècle, sonne encore aujourd'hui les heures du village.",
    image: "assets/images/capsule-1.jpg",
    video: "assets/videos/capsule-1.mp4",
    audio: "assets/videos/capsule-1-audio.mp3",
    schema: "assets/images/capsule-1-schema.jpg",
    photos: ["assets/images/capsule-1-photo-1.jpg", "assets/images/capsule-1-photo-2.jpg", "assets/images/capsule-1-photo-3.jpg"],
    duree_audio: "2 min",
    pos: { x: 295, y: 90 }
  },
  {
    id: 2,
    titre: "Le tuff",
    sous_titre: "Roche née de l'eau",
    theme: "Eau & Géologie",
    theme_color: "#4DB8FF",
    theme_key: "eau",
    distance: "150 m",
    citation: "Cette pierre tendre est née de l'eau, goutte après goutte.",
    texte: `Le tuff — aussi appelé travertin — se forme lorsque l'eau de la Bresque, chargée de calcaire dissous, dépose ses minéraux couche après couche autour des mousses et des végétaux. Au fil des siècles, ces dépôts façonnent les vasques, les concrétions et les cascades qui font la singularité du site.

Pose la main sur la pierre : elle garde la mémoire de l'eau. Les empreintes de mousses fossilisées y dessinent encore la trame du vivant qui l'a fait naître.`,
    saviez_vous: "À Sillans, le tuff se forme encore aujourd'hui. La cascade fabrique sa propre roche, lentement, à la vitesse de quelques millimètres par siècle.",
    image: "assets/images/capsule-2.jpg",
    video: "assets/videos/capsule-2.mp4",
    audio: "assets/videos/capsule-2-audio.mp3",
    schema: "assets/images/capsule-2-schema.jpg",
    photos: ["assets/images/capsule-2-photo-1.jpg", "assets/images/capsule-2-photo-2.jpg", "assets/images/capsule-2-photo-3.jpg"],
    duree_audio: "2 min",
    pos: { x: 320, y: 230 }
  },
  {
    id: 3,
    titre: "Le belvédère",
    sous_titre: "Zone d'attente — vue sur la cascade",
    theme: "Biodiversité",
    theme_color: "#A8E63D",
    theme_key: "biodiv",
    distance: "300 m",
    citation: "Reste ici en silence. La cascade chante à qui sait l'écouter.",
    texte: `Le belvédère offre la plus belle perspective sur la cascade et les gorges de la Bresque. C'est aussi un poste d'observation privilégié de la faune locale : martins-pêcheurs filant comme des flèches turquoise, cincles plongeurs marchant sous l'eau, libellules à reflets métalliques.

Reste un instant immobile. Le tympan capte le grondement de l'eau, puis, peu à peu, les voix plus fines : insectes, chant des fauvettes, frémissement des feuilles. C'est ici que la forêt commence à se confier.`,
    saviez_vous: "Le martin-pêcheur, ce petit oiseau bleu et orange, peut plonger jusqu'à 1 m de profondeur pour attraper de petits poissons.",
    image: "assets/images/capsule-3.jpg",
    video: "assets/videos/capsule-3.mp4",
    audio: "assets/videos/capsule-3-audio.mp3",
    schema: "assets/images/capsule-3-schema.jpg",
    photos: ["assets/images/capsule-3-photo-1.jpg", "assets/images/capsule-3-photo-2.jpg", "assets/images/capsule-3-photo-3.jpg"],
    duree_audio: "3 min",
    pos: { x: 270, y: 350 }
  },
  {
    id: 4,
    titre: "La Bresque",
    sous_titre: "La rivière qui fait la cascade",
    theme: "Eau & Géologie",
    theme_color: "#4DB8FF",
    theme_key: "eau",
    distance: "480 m",
    citation: "L'eau prend son temps, comme la pierre qu'elle façonne.",
    texte: `La Bresque prend sa source sur le plateau de Fox-Amphoux et serpente sur près de 30 kilomètres avant de rejoindre l'Argens. À Sillans, elle franchit un seuil de tuff d'une quarantaine de mètres : c'est la fameuse cascade, l'une des plus spectaculaires du Var.

Son eau est chargée en calcaire dissous, hérité de la traversée des couches géologiques de la garrigue. C'est ce calcaire qui, en se déposant, sculpte les concrétions du tuff et donne au site sa physionomie si particulière.`,
    saviez_vous: "La cascade de Sillans mesure environ 42 mètres de hauteur. Son débit peut décupler en quelques heures lors des épisodes méditerranéens d'automne.",
    image: "assets/images/capsule-4.jpg",
    video: "assets/videos/capsule-4.mp4",
    audio: "assets/videos/capsule-4-audio.mp3",
    schema: "assets/images/capsule-4-schema.jpg",
    photos: ["assets/images/capsule-4-photo-1.jpg", "assets/images/capsule-4-photo-2.jpg", "assets/images/capsule-4-photo-3.jpg"],
    duree_audio: "3 min",
    pos: { x: 200, y: 490 }
  },
  {
    id: 5,
    titre: "Le pied des remparts",
    sous_titre: "Aux pierres du Moyen Âge",
    theme: "Gestion des risques",
    theme_color: "#E05C3A",
    theme_key: "risques",
    distance: "620 m",
    citation: "Ces pierres ont vu venir des dangers d'un autre temps.",
    texte: `Le tracé des remparts médiévaux ceinture encore le vieux Sillans. Bâtis pour défendre le village contre les raids et les troubles de la fin du Moyen Âge, ils dessinent aujourd'hui un parcours minéral entre les maisons et la falaise.

Sous tes pieds, la pierre raconte deux histoires de risques superposés : celui des hommes — guerres, brigands, conflits — et celui de la nature — éboulements, érosion des falaises calcaires, crues de la Bresque. Aujourd'hui, le sanctuaire surveille ces risques par un débroussaillement raisonné et le confortement régulier des murs.`,
    saviez_vous: "Certaines portions de remparts intègrent des pierres romaines réemployées : les bâtisseurs médiévaux récupéraient les matériaux des ruines antiques alentour.",
    image: "assets/images/capsule-5.jpg",
    video: "assets/videos/capsule-5.mp4",
    audio: "assets/videos/capsule-5-audio.mp3",
    schema: "assets/images/capsule-5-schema.jpg",
    photos: ["assets/images/capsule-5-photo-1.jpg", "assets/images/capsule-5-photo-2.jpg", "assets/images/capsule-5-photo-3.jpg"],
    duree_audio: "3 min",
    pos: { x: 85, y: 350 }
  },
  {
    id: 6,
    titre: "La Grande Rue",
    sous_titre: "Le cœur du vieux village",
    theme: "Patrimoine",
    theme_color: "#F5A623",
    theme_key: "patrimoine",
    distance: "750 m",
    citation: "Marche lentement : chaque pierre garde une histoire.",
    texte: `La Grande Rue est l'artère historique de Sillans. Pavée de calades, bordée de façades aux volets provençaux, elle a vu défiler des siècles de marchands, d'artisans, de processions et de fêtes votives.

Lève les yeux : sur les linteaux, des cadrans solaires et des dates gravées rappellent qui a bâti, qui a remanié, qui a habité. Les fontaines, alimentées par les eaux du plateau, témoignent d'une époque où l'eau publique était au cœur de la vie quotidienne. Ton circuit s'achève ici, dans le tissu vivant du village.`,
    saviez_vous: "Plusieurs maisons de la Grande Rue datent du XVIᵉ siècle. Certaines portes encore visibles arborent des décors sculptés Renaissance.",
    image: "assets/images/capsule-6.jpg",
    video: "assets/videos/capsule-6.mp4",
    audio: "assets/videos/capsule-6-audio.mp3",
    schema: "assets/images/capsule-6-schema.jpg",
    photos: ["assets/images/capsule-6-photo-1.jpg", "assets/images/capsule-6-photo-2.jpg", "assets/images/capsule-6-photo-3.jpg"],
    duree_audio: "2 min",
    pos: { x: 130, y: 170 }
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
    explication: "L'eau de la Bresque, riche en calcaire dissous, dépose ses minéraux couche par couche autour des mousses et des végétaux."
  },
  {
    id: 2,
    capsule_ref: 1,
    citation_indice: "Le clocher du village veille depuis longtemps.",
    question: "De quel siècle date principalement l'église Notre-Dame de Sillans ?",
    reponses: [
      { lettre: "A", texte: "Le IXᵉ siècle", correct: false },
      { lettre: "B", texte: "Le XIIᵉ siècle", correct: true },
      { lettre: "C", texte: "Le XVIᵉ siècle", correct: false },
      { lettre: "D", texte: "Le XVIIIᵉ siècle", correct: false }
    ],
    explication: "L'église est d'origine romane et remonte au XIIᵉ siècle, même si elle a été plusieurs fois remaniée."
  },
  {
    id: 3,
    capsule_ref: 4,
    citation_indice: "Le saut de la rivière est un moment vertigineux.",
    question: "Quelle est environ la hauteur de la cascade de Sillans ?",
    reponses: [
      { lettre: "A", texte: "12 mètres", correct: false },
      { lettre: "B", texte: "25 mètres", correct: false },
      { lettre: "C", texte: "42 mètres", correct: true },
      { lettre: "D", texte: "80 mètres", correct: false }
    ],
    explication: "La cascade mesure environ 42 m. Elle est l'une des plus spectaculaires du département du Var."
  },
  {
    id: 4,
    capsule_ref: 3,
    citation_indice: "Un éclair bleu file au ras de l'eau.",
    question: "Quel oiseau coloré, sentinelle des eaux propres, peut s'observer le long de la Bresque ?",
    reponses: [
      { lettre: "A", texte: "Le martin-pêcheur", correct: true },
      { lettre: "B", texte: "L'aigle royal", correct: false },
      { lettre: "C", texte: "Le grand corbeau", correct: false },
      { lettre: "D", texte: "La huppe fasciée", correct: false }
    ],
    explication: "Le martin-pêcheur — petit oiseau bleu et orange — est une espèce bio-indicatrice : il n'occupe que les cours d'eau de très bonne qualité."
  },
  {
    id: 5,
    capsule_ref: 5,
    citation_indice: "La pierre se souvient des dangers passés.",
    question: "À quoi servaient principalement les remparts qui ceinturent Sillans ?",
    reponses: [
      { lettre: "A", texte: "À canaliser les eaux de la Bresque", correct: false },
      { lettre: "B", texte: "À se protéger des raids et conflits médiévaux", correct: true },
      { lettre: "C", texte: "À marquer la frontière du domaine royal", correct: false },
      { lettre: "D", texte: "À soutenir des terrasses de culture", correct: false }
    ],
    explication: "Bâtis à la fin du Moyen Âge, les remparts défendaient le village contre les raids et les troubles politiques de l'époque."
  }
];

const THEMES = [
  { id: 1, key: "eau", numero: "01", titre: "Eau &<br>Géologie", icon: "drop", color: "#4DB8FF" },
  { id: 2, key: "biodiv", numero: "02", titre: "Biodiversité", icon: "leaf", color: "#A8E63D" },
  { id: 3, key: "patrimoine", numero: "03", titre: "Patrimoine", icon: "monument", color: "#F5A623" },
  { id: 4, key: "risques", numero: "04", titre: "Gestion<br>des risques", icon: "shield", color: "#E05C3A" }
];

const COULEUR_LABELS = {
  blue: { nom: "Le Bleu de la Bresque", desc: "Couleur de l'eau qui sculpte la pierre et fait vivre le sanctuaire." },
  green: { nom: "Le Vert des gorges", desc: "Couleur du vivant : oiseaux, insectes et végétation des berges." },
  orange: { nom: "L'Ocre du vieux Sillans", desc: "Couleur du bâti médiéval et de la mémoire des hommes." },
  red: { nom: "Le Rouge des remparts", desc: "Couleur du feu, des dangers passés et de la vigilance présente." }
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
