const CAPSULES = [
  {
    id: 1,
    titre: "L'église Saint-Étienne",
    sous_titre: "Au niveau de l'église — point de repère",
    theme: "Patrimoine",
    theme_color: "#F5A623",
    theme_key: "patrimoine",
    distance: "0 m",
    citation: "Voyageur, ici commence ton chemin. Écoute les cloches du temps.",
    texte: `L'église Saint-Étienne surplombe Sillans-la-Cascade depuis le XIIᵉ siècle. Reconstruite et remaniée au fil des âges, elle conserve une nef romane caractéristique et un clocher-tour qui a longtemps servi de repère aux paysans de la vallée de la Bresque.

Son emplacement est aussi celui d'un point d'observation : depuis le parvis, on embrasse d'un seul regard le village médiéval, la plaine cultivée et les collines boisées qui annoncent la garrigue. C'est ici que commence ton circuit.`,
    saviez_vous: "La cloche de l'église, fondue à la fin du XVIᵉ siècle, sonne encore aujourd'hui les heures du village.",
    schema: `<div style="color:var(--color-text); font-size:13px;"><p style="color:var(--color-text-muted); text-align:center; margin-bottom:14px; font-style:italic;">Évolution de l'église Saint-Étienne</p><div style="position:relative; padding-left:28px; border-left:2px solid rgba(245,166,35,0.3); margin-left:10px;"><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:#F5A623;"></div><span style="color:#F5A623; font-weight:700; font-size:11px;">XIIe S. — </span>Fondation romane, nef et clocher-tour en pierre locale</div><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:#F5A623; opacity:0.7;"></div><span style="color:rgba(245,166,35,0.7); font-weight:700; font-size:11px;">XVe S. — </span>Remaniements gothiques, voûtes et portail</div><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:#F5A623; opacity:0.5;"></div><span style="color:rgba(245,166,35,0.5); font-weight:700; font-size:11px;">XVIe S. — </span>Cloche fondue, sonne encore aujourd'hui</div><div style="position:relative;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:#F5CE18; box-shadow:0 0 6px #F5CE1880;"></div><span style="color:#F5CE18; font-weight:700; font-size:11px;">AUJOURD'HUI — </span>Point de départ, vue sur le village et la garrigue</div></div><div style="margin-top:14px; padding:10px; background:rgba(245,166,35,0.07); border-left:3px solid rgba(245,166,35,0.4); border-radius:0 6px 6px 0; font-size:12px; color:rgba(245,166,35,0.85);">Nef romane · Clocher-tour · Voûtes en berceau · Portail roman</div></div>`,
    image: "assets/images/EGLISE.jpg",
    image_position: "center 80%",
    audio: "assets/videos/eglise.mp4",
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
    schema: `<div style="color:var(--color-text); font-size:13px;"><p style="color:var(--color-text-muted); text-align:center; margin-bottom:14px; font-style:italic;">Comment se forme le tuff ?</p><div style="display:flex; flex-direction:column; gap:2px;"><div style="display:flex; gap:10px; align-items:flex-start; padding:10px; background:rgba(77,184,255,0.08); border-radius:8px 8px 0 0; border:1px solid rgba(77,184,255,0.2);"><div style="min-width:26px; height:26px; border-radius:50%; background:#4DB8FF; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#0A1628; flex-shrink:0;">1</div><div><strong style="color:#4DB8FF;">Eau + CO₂</strong> → acide carbonique<br><span style="font-size:12px; color:var(--color-text-muted);">La pluie absorbe le CO₂ de l'atmosphère</span></div></div><div style="display:flex; gap:10px; align-items:flex-start; padding:10px; background:rgba(77,184,255,0.06); border:1px solid rgba(77,184,255,0.15); border-top:none;"><div style="min-width:26px; height:26px; border-radius:50%; background:#4DB8FF; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#0A1628; flex-shrink:0;">2</div><div><strong style="color:#4DB8FF;">Calcaire dissous</strong><br><span style="font-size:12px; color:var(--color-text-muted);">L'eau traverse les roches calcaires de la garrigue</span></div></div><div style="display:flex; gap:10px; align-items:flex-start; padding:10px; background:rgba(77,184,255,0.06); border:1px solid rgba(77,184,255,0.15); border-top:none;"><div style="min-width:26px; height:26px; border-radius:50%; background:#4DB8FF; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#0A1628; flex-shrink:0;">3</div><div><strong style="color:#4DB8FF;">CO₂ s'échappe</strong> à l'air libre<br><span style="font-size:12px; color:var(--color-text-muted);">Le calcaire ne reste plus en solution</span></div></div><div style="display:flex; gap:10px; align-items:flex-start; padding:10px; background:rgba(77,184,255,0.1); border-radius:0 0 8px 8px; border:1px solid rgba(77,184,255,0.25); border-top:none;"><div style="min-width:26px; height:26px; border-radius:50%; background:#F5CE18; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:#0A1628; flex-shrink:0;">4</div><div><strong style="color:#F5CE18;">Tuff = roche vivante</strong><br><span style="font-size:12px; color:var(--color-text-muted);">Calcaire déposé sur les mousses, quelques mm par siècle</span></div></div></div><div style="margin-top:12px; padding:10px; background:rgba(245,206,24,0.07); border-left:3px solid rgba(245,206,24,0.5); border-radius:0 6px 6px 0; font-size:12px; color:rgba(245,206,24,0.9);">⏱ Vitesse de formation : quelques millimètres par siècle</div></div>`,
    image: "assets/images/11197312(43).JPG",
    image_height: "clamp(260px, 48vh, 420px)",
    audio: "assets/videos/le tuff.mp4",
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
    schema: `<div style="color:var(--color-text); font-size:13px;"><p style="color:var(--color-text-muted); text-align:center; margin-bottom:14px; font-style:italic;">Qui vit dans les gorges de la Bresque ?</p><div style="display:flex; flex-direction:column; gap:8px;"><div style="padding:10px 12px; background:rgba(168,230,61,0.06); border:1px solid rgba(168,230,61,0.2); border-radius:8px; border-left:3px solid rgba(168,230,61,0.5);"><div style="font-size:11px; font-weight:700; color:rgba(168,230,61,0.8); text-transform:uppercase; margin-bottom:5px;">🪨 Falaise &amp; garrigue</div>Rollier d'Europe · Fauvette pitchou · Ophrys miroir</div><div style="padding:10px 12px; background:rgba(168,230,61,0.04); border:1px solid rgba(168,230,61,0.15); border-radius:8px; border-left:3px solid rgba(168,230,61,0.35);"><div style="font-size:11px; font-weight:700; color:rgba(168,230,61,0.6); text-transform:uppercase; margin-bottom:5px;">🌿 Canopée</div>Chauves-souris (nocturnes) · Espèces végétales protégées</div><div style="padding:10px 12px; background:rgba(77,184,255,0.06); border:1px solid rgba(77,184,255,0.2); border-radius:8px; border-left:3px solid rgba(77,184,255,0.5);"><div style="font-size:11px; font-weight:700; color:#4DB8FF; text-transform:uppercase; margin-bottom:5px;">🌊 Berges</div>Martin-pêcheur · Cincle plongeur · Libellules</div><div style="padding:10px 12px; background:rgba(77,184,255,0.08); border:1px solid rgba(77,184,255,0.25); border-radius:8px; border-left:3px solid #4DB8FF;"><div style="font-size:11px; font-weight:700; color:#4DB8FF; text-transform:uppercase; margin-bottom:5px;">💧 Dans l'eau</div>Cincle plongeur (plonge à 1 m) · Truite · Invertébrés aquatiques</div></div><div style="margin-top:12px; padding:10px; background:rgba(168,230,61,0.07); border-left:3px solid rgba(168,230,61,0.5); border-radius:0 6px 6px 0; font-size:12px; color:rgba(168,230,61,0.9);">🐦 Plus de 50 espèces d'oiseaux recensées sur le site</div></div>`,
    image: "assets/images/CASCADE.jpg",
    audio: "assets/videos/belevedere.mp4",
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
    schema: `<div style="color:var(--color-text); font-size:13px;"><p style="color:var(--color-text-muted); text-align:center; margin-bottom:14px; font-style:italic;">Le voyage de la Bresque</p><div style="position:relative; padding-left:32px; margin-left:8px; border-left:3px solid rgba(77,184,255,0.4);"><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-39px; top:2px; width:14px; height:14px; border-radius:50%; background:#4DB8FF; box-shadow:0 0 6px #4DB8FF60; border:2px solid #0A1628;"></div><strong style="color:#4DB8FF;">Source</strong> — Plateau de Fox-Amphoux</div><div style="position:relative; margin-bottom:14px; color:var(--color-text-muted); font-size:12px; font-style:italic;">↓ 30 km à travers la garrigue calcaire</div><div style="position:relative; margin-bottom:6px;"><div style="position:absolute; left:-39px; top:2px; width:14px; height:14px; border-radius:50%; background:#F5CE18; box-shadow:0 0 6px #F5CE1860; border:2px solid #0A1628;"></div><strong style="color:#F5CE18;">Cascade de Sillans</strong> — 42 m de hauteur</div><div style="margin-bottom:14px; font-size:12px; color:var(--color-text-muted); margin-left:0;">Seuil de tuff · débit ×10 en automne</div><div style="position:relative; margin-bottom:14px; color:var(--color-text-muted); font-size:12px; font-style:italic;">↓ Confluence</div><div style="position:relative;"><div style="position:absolute; left:-39px; top:2px; width:14px; height:14px; border-radius:50%; background:rgba(77,184,255,0.5); border:2px solid #0A1628;"></div><strong style="color:rgba(77,184,255,0.7);">L'Argens</strong> — vers la mer Méditerranée</div></div><div style="margin-top:14px; padding:10px; background:rgba(77,184,255,0.07); border-left:3px solid rgba(77,184,255,0.5); border-radius:0 6px 6px 0; font-size:12px; color:#4DB8FF;">⚡ Le débit peut décupler en quelques heures lors des épisodes méditerranéens d'automne</div></div>`,
    image: "assets/images/11197312(48).JPG",
    image_position: "center 70%",
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
    texte: `Le tracé des remparts médiévaux ceinture encore le vieux Sillans. Bâtis pour défendre le village contre les raids de la fin du Moyen Âge, ils dessinent aujourd'hui un parcours minéral entre les maisons et la falaise.

Mais le site fait face à des risques bien réels aujourd'hui. Chaque été, des centaines de milliers de visiteurs foulent ces chemins. En 2021, plus de 224 000 personnes ont fréquenté le site en deux mois. Cette pression provoque des incidents : cigarettes jetées en pleine garrigue, baigneurs dans la vasque interdite, dégradations des infrastructures. En période de risque incendie, le dispositif ZAPEF peut restreindre l'accès au site entre 10h et 18h pour protéger tout le monde.`,
    saviez_vous: "En juillet 2025, la ZAPEF a été activée 3 jours. Le 27 juillet, 2 010 visiteurs ont fréquenté la Rive Gauche en une seule journée — et 10 cigarettes ont quand même été signalées ce jour-là.",
    schema: `<div style="color:var(--color-text); font-size:13px;"><p style="color:var(--color-text-muted); text-align:center; margin-bottom:14px; font-style:italic;">Les risques du sanctuaire</p><div style="display:flex; flex-direction:column; gap:8px;"><div style="padding:10px 12px; background:rgba(224,92,58,0.08); border:1px solid rgba(224,92,58,0.25); border-radius:8px;"><div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;"><span style="font-size:18px;">🔥</span><strong style="color:#E05C3A;">Risque incendie</strong></div>ZAPEF activée : accès interdit 10h–18h · Garrigue sèche · Été &amp; automne</div><div style="padding:10px 12px; background:rgba(224,92,58,0.06); border:1px solid rgba(224,92,58,0.2); border-radius:8px;"><div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;"><span style="font-size:18px;">🪨</span><strong style="color:#E05C3A;">Chutes de blocs</strong></div>Zones sanctuarisées sous la falaise · Les ganivelles protègent et régénèrent la végétation</div><div style="padding:10px 12px; background:rgba(224,92,58,0.06); border:1px solid rgba(224,92,58,0.2); border-radius:8px;"><div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;"><span style="font-size:18px;">👥</span><strong style="color:#E05C3A;">Surfréquentation</strong></div><div style="display:flex; gap:8px;"><div style="flex:1; padding:8px; background:rgba(245,206,24,0.08); border-radius:6px; text-align:center;"><div style="font-size:18px; font-weight:700; color:#F5CE18;">224 000</div><div style="font-size:10px; color:var(--color-text-muted);">visiteurs / 2 mois</div></div><div style="flex:1; padding:8px; background:rgba(245,206,24,0.08); border-radius:6px; text-align:center;"><div style="font-size:18px; font-weight:700; color:#F5CE18;">2 010</div><div style="font-size:10px; color:var(--color-text-muted);">visiteurs / 1 journée</div></div></div></div></div><div style="margin-top:10px; padding:10px 12px; background:rgba(145,255,5,0.06); border:1px solid rgba(145,255,5,0.2); border-radius:8px;"><div style="font-size:11px; font-weight:700; color:#91FF05; margin-bottom:6px; letter-spacing:0.08em;">RÈGLES D'OR</div>Ne pas fumer · Ne pas se baigner · Rester sur les sentiers · Emporter ses déchets</div></div>`,
    image: "assets/images/cascades-de-sillans20160724202406.jpg",
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
    saviez_vous: "En 2022, 28 sacs de 110 litres de déchets ont été collectés sur la seule Rive Gauche en une saison. Chaque déchet laissé sur place finit dans la Bresque.",
    schema: `<div style="color:var(--color-text); font-size:13px;"><p style="color:var(--color-text-muted); text-align:center; margin-bottom:14px; font-style:italic;">Sillans à travers les âges</p><div style="position:relative; padding-left:28px; border-left:2px solid rgba(245,166,35,0.3); margin-left:10px;"><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:rgba(245,166,35,0.3); border:2px solid rgba(245,166,35,0.4);"></div><span style="color:rgba(245,166,35,0.4); font-weight:700; font-size:11px;">ÂGE DU BRONZE — </span>Premières occupations humaines sur le site</div><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:rgba(245,166,35,0.45); border:2px solid rgba(245,166,35,0.55);"></div><span style="color:rgba(245,166,35,0.55); font-weight:700; font-size:11px;">GALLO-ROMAIN — </span>Villa, moulins et patrimoine lié à l'eau</div><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:rgba(245,166,35,0.65); border:2px solid rgba(245,166,35,0.75);"></div><span style="color:rgba(245,166,35,0.75); font-weight:700; font-size:11px;">MOYEN ÂGE (XIIe-XVe) — </span>Remparts, église Saint-Étienne, fortification du village</div><div style="position:relative; margin-bottom:14px;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:#F5A623; border:2px solid #0A1628;"></div><span style="color:#F5A623; font-weight:700; font-size:11px;">ÉPOQUE MODERNE — </span>Fontaines, calades pavées, façades provençales</div><div style="position:relative;"><div style="position:absolute; left:-35px; top:2px; width:12px; height:12px; border-radius:50%; background:#F5CE18; border:2px solid #0A1628; box-shadow:0 0 6px #F5CE1880;"></div><span style="color:#F5CE18; font-weight:700; font-size:11px;">AUJOURD'HUI — </span>ENS classé, 200 000 visiteurs/été, protection active</div></div><div style="margin-top:14px; padding:10px; background:rgba(245,166,35,0.07); border-left:3px solid rgba(245,166,35,0.4); border-radius:0 6px 6px 0; font-size:12px; color:rgba(245,166,35,0.85);">🏛 Les linteaux gravés et cadrans solaires de la Grande Rue témoignent encore de cette histoire</div></div>`,
    image: "assets/images/sillans-la-cascade-33534-10_w800.png",
    photos: ["assets/images/capsule-6-photo-1.jpg", "assets/images/capsule-6-photo-2.jpg", "assets/images/capsule-6-photo-3.jpg"],
    duree_audio: "2 min",
    pos: { x: 130, y: 170 }
  }
];

const QUIZ = [
  // CAPSULE 1 — L'église
  {
    capsule_id: 1,
    questions: [
      {
        question: "De quel siècle date l'église Saint-Étienne de Sillans ?",
        reponses: [
          { lettre: "A", texte: "Le IXe siècle", correct: false },
          { lettre: "B", texte: "Le XIIe siècle", correct: true },
          { lettre: "C", texte: "Le XVIe siècle", correct: false },
          { lettre: "D", texte: "Le XVIIIe siècle", correct: false }
        ],
        explication: "L'église est d'origine romane et remonte au XIIe siècle, même si elle a été plusieurs fois remaniée."
      },
      {
        question: "Qu'observe-t-on depuis le parvis de l'église ?",
        reponses: [
          { lettre: "A", texte: "La mer Méditerranée", correct: false },
          { lettre: "B", texte: "Le village, la plaine et les collines boisées", correct: true },
          { lettre: "C", texte: "Le lac de Saint-Cassien", correct: false },
          { lettre: "D", texte: "Les gorges du Verdon", correct: false }
        ],
        explication: "Le parvis offre une vue sur le village médiéval, la plaine cultivée et les collines boisées qui annoncent la garrigue."
      },
      {
        question: "Quel geste simple protège ce patrimoine lors de ta visite ?",
        reponses: [
          { lettre: "A", texte: "Graver ton nom sur les pierres", correct: false },
          { lettre: "B", texte: "Cueillir des plantes autour de l'église", correct: false },
          { lettre: "C", texte: "Rester sur les chemins balisés et ne rien dégrader", correct: true },
          { lettre: "D", texte: "Laisser tes déchets sur place", correct: false }
        ],
        explication: "Rester sur les sentiers et ne rien abîmer est le geste essentiel pour protéger ce patrimoine commun."
      }
    ]
  },
  // CAPSULE 2 — Le tuff
  {
    capsule_id: 2,
    questions: [
      {
        question: "Comment se forme le tuff ?",
        reponses: [
          { lettre: "A", texte: "Par fusion de roches volcaniques", correct: false },
          { lettre: "B", texte: "Par dépôt de calcaire dans l'eau", correct: true },
          { lettre: "C", texte: "Par érosion du vent sur le calcaire", correct: false },
          { lettre: "D", texte: "Par sédimentation marine ancienne", correct: false }
        ],
        explication: "L'eau de la Bresque dépose son calcaire couche par couche autour des mousses et des végétaux."
      },
      {
        question: "À quelle vitesse se forme le tuff à Sillans ?",
        reponses: [
          { lettre: "A", texte: "Quelques centimètres par jour", correct: false },
          { lettre: "B", texte: "Quelques mètres par an", correct: false },
          { lettre: "C", texte: "Quelques millimètres par siècle", correct: true },
          { lettre: "D", texte: "Il ne se forme plus", correct: false }
        ],
        explication: "Le tuff se forme encore aujourd'hui à Sillans, mais très lentement — quelques millimètres par siècle seulement."
      },
      {
        question: "Pourquoi ne faut-il pas marcher sur les concrétions de tuff ?",
        reponses: [
          { lettre: "A", texte: "C'est glissant uniquement pour toi", correct: false },
          { lettre: "B", texte: "Elles mettent des siècles à se former et sont très fragiles", correct: true },
          { lettre: "C", texte: "Elles appartiennent à un propriétaire privé", correct: false },
          { lettre: "D", texte: "Elles sont radioactives", correct: false }
        ],
        explication: "Ces formations millénaires peuvent être détruites en quelques secondes par un mauvais geste."
      }
    ]
  },
  // CAPSULE 3 — Le belvédère
  {
    capsule_id: 3,
    questions: [
      {
        question: "Quel oiseau s'observe le long de la Bresque et n'occupe que les eaux très propres ?",
        reponses: [
          { lettre: "A", texte: "L'aigle royal", correct: false },
          { lettre: "B", texte: "Le martin-pêcheur", correct: true },
          { lettre: "C", texte: "Le grand corbeau", correct: false },
          { lettre: "D", texte: "La huppe fasciée", correct: false }
        ],
        explication: "Le martin-pêcheur est une espèce bio-indicatrice : il n'occupe que les cours d'eau de très bonne qualité."
      },
      {
        question: "Combien d'espèces d'oiseaux compte le site de Sillans ?",
        reponses: [
          { lettre: "A", texte: "Plus de 10", correct: false },
          { lettre: "B", texte: "Plus de 30", correct: false },
          { lettre: "C", texte: "Plus de 50", correct: true },
          { lettre: "D", texte: "Plus de 200", correct: false }
        ],
        explication: "Le site abrite plus de 50 espèces d'oiseaux dont le Rollier d'Europe, mascotte du sanctuaire."
      },
      {
        question: "Que fais-tu si tu croises un animal sauvage sur le sentier ?",
        reponses: [
          { lettre: "A", texte: "Tu l'approches pour le photographier de près", correct: false },
          { lettre: "B", texte: "Tu lui donnes de la nourriture", correct: false },
          { lettre: "C", texte: "Tu cries pour le faire fuir", correct: false },
          { lettre: "D", texte: "Tu restes silencieux et à distance", correct: true }
        ],
        explication: "S'approcher ou nourrir les animaux perturbe leur comportement naturel et les met en danger."
      }
    ]
  },
  // CAPSULE 4 — La Bresque
  {
    capsule_id: 4,
    questions: [
      {
        question: "Quelle est la hauteur de la cascade de Sillans ?",
        reponses: [
          { lettre: "A", texte: "12 mètres", correct: false },
          { lettre: "B", texte: "25 mètres", correct: false },
          { lettre: "C", texte: "42 mètres", correct: true },
          { lettre: "D", texte: "80 mètres", correct: false }
        ],
        explication: "La cascade mesure environ 42 m. Elle est l'une des plus spectaculaires du département du Var."
      },
      {
        question: "D'où vient le calcaire qui forme le tuff de la cascade ?",
        reponses: [
          { lettre: "A", texte: "De la mer Méditerranée", correct: false },
          { lettre: "B", texte: "Des couches géologiques de la garrigue traversées par la Bresque", correct: true },
          { lettre: "C", texte: "Des rejets industriels en amont", correct: false },
          { lettre: "D", texte: "Des roches volcaniques", correct: false }
        ],
        explication: "L'eau de la Bresque traverse des couches calcaires de la garrigue avant d'arriver à Sillans."
      },
      {
        question: "La baignade est interdite à Sillans. Pourquoi est-ce important de respecter cette règle ?",
        reponses: [
          { lettre: "A", texte: "Pour garder l'eau froide", correct: false },
          { lettre: "B", texte: "Pour réserver l'accès aux locaux", correct: false },
          { lettre: "C", texte: "Pour protéger les berges fragiles et la biodiversité aquatique", correct: true },
          { lettre: "D", texte: "Pour éviter les embouteillages sur le sentier", correct: false }
        ],
        explication: "La baignade érode les berges de tuff millénaires et détruit l'habitat d'espèces protégées."
      }
    ]
  },
  // CAPSULE 5 — Les remparts
  {
    capsule_id: 5,
    questions: [
      {
        question: "Qu'est-ce que la ZAPEF ?",
        reponses: [
          { lettre: "A", texte: "Un sentier de randonnée balisé", correct: false },
          { lettre: "B", texte: "Un dispositif qui restreint l'accès au site en période de risque incendie", correct: true },
          { lettre: "C", texte: "Une association de protection des oiseaux", correct: false },
          { lettre: "D", texte: "Un panneau d'information touristique", correct: false }
        ],
        explication: "La ZAPEF impose des horaires d'accès stricts pour protéger le site et les visiteurs en période à risque."
      },
      {
        question: "Combien de visiteurs le site a-t-il accueilli en juillet-août 2021 ?",
        reponses: [
          { lettre: "A", texte: "10 000 personnes", correct: false },
          { lettre: "B", texte: "76 000 personnes", correct: false },
          { lettre: "C", texte: "224 000 personnes", correct: true },
          { lettre: "D", texte: "1 million de personnes", correct: false }
        ],
        explication: "Plus de 224 000 personnes en deux mois. Cette pression fragilise durablement les berges et la faune."
      },
      {
        question: "Quelle infraction reste la plus signalée sur le site même en période ZAPEF ?",
        reponses: [
          { lettre: "A", texte: "Les chiens sans laisse", correct: false },
          { lettre: "B", texte: "Les cigarettes", correct: true },
          { lettre: "C", texte: "Les pique-niques", correct: false },
          { lettre: "D", texte: "Les vélos hors-piste", correct: false }
        ],
        explication: "En juillet 2025, 10 cigarettes ont été signalées en une seule journée de ZAPEF. Le risque incendie est réel."
      }
    ]
  },
  // CAPSULE 6 — La Grande Rue
  {
    capsule_id: 6,
    questions: [
      {
        question: "Qu'est-ce qu'une calade ?",
        reponses: [
          { lettre: "A", texte: "Une fontaine provençale", correct: false },
          { lettre: "B", texte: "Un pavage traditionnel de pierres", correct: true },
          { lettre: "C", texte: "Un type de volet ancien", correct: false },
          { lettre: "D", texte: "Un four à pain collectif", correct: false }
        ],
        explication: "La calade est un pavage en pierres disposées sur chant, typique des villages provençaux."
      },
      {
        question: "Combien de sacs de déchets ont été collectés sur la Rive Gauche en 2022 ?",
        reponses: [
          { lettre: "A", texte: "2 sacs", correct: false },
          { lettre: "B", texte: "10 sacs", correct: false },
          { lettre: "C", texte: "28 sacs de 110 litres", correct: true },
          { lettre: "D", texte: "100 sacs", correct: false }
        ],
        explication: "28 sacs de 110 litres en une seule saison. Chaque déchet laissé sur place finit dans la Bresque."
      },
      {
        question: "Quel geste retiens-tu de cette visite pour protéger le sanctuaire ?",
        reponses: [
          { lettre: "A", texte: "Prendre des pierres en souvenir", correct: false },
          { lettre: "B", texte: "Respecter les sentiers, ne rien laisser, ne rien dégrader", correct: true },
          { lettre: "C", texte: "Partager ta position GPS sur les réseaux sociaux", correct: false },
          { lettre: "D", texte: "Revenir en voiture le plus souvent possible", correct: false }
        ],
        explication: "Ce sanctuaire fragile ne tient qu'à la somme de petits gestes. Le tien compte."
      }
    ]
  }
];

const THEMES = [
  { id: 1, key: "eau", numero: "01", titre: "Eau &<br>Géologie", icon: "drop", color: "#4DB8FF" },
  { id: 2, key: "biodiv", numero: "02", titre: "Biodiversité", icon: "leaf", color: "#A8E63D" },
  { id: 3, key: "patrimoine", numero: "03", titre: "Patrimoine", icon: "monument", color: "#F5A623" },
  { id: 4, key: "risques", numero: "04", titre: "Gestion<br>des risques", icon: "shield", color: "#E05C3A" }
];

const COULEUR_LABELS = {
  blue:   { nom: "L'Or de la garrigue",     desc: "Couleur du soleil et du bâti médiéval de Sillans." },
  green:  { nom: "L'Ocre du vieux Sillans", desc: "Couleur chaude du village et de la mémoire des hommes." },
  orange: { nom: "Le Vert des gorges",      desc: "Couleur du vivant : oiseaux, insectes et végétation des berges." },
  red:    { nom: "Le Bleu de la Bresque",   desc: "Couleur de l'eau qui sculpte la pierre et fait vivre le sanctuaire." }
};

if (typeof window !== 'undefined') {
  window.CAPSULES = CAPSULES;
  window.QUIZ = QUIZ;
  window.THEMES = THEMES;
  window.COULEUR_LABELS = COULEUR_LABELS;
}
