/**
 * Italian translations for game terms (weapons, armor, spells, etc.)
 * These are D&D 5e SRD terms translated to Italian.
 * The key is the English name, the value is the Italian translation.
 */

export const weaponNamesIt: Record<string, string> = {
  // Simple Melee
  'Club': 'Clava',
  'Dagger': 'Pugnale',
  'Greatclub': 'Randello',
  'Handaxe': 'Accetta',
  'Javelin': 'Giavellotto',
  'Light Hammer': 'Martello Leggero',
  'Mace': 'Mazza',
  'Quarterstaff': 'Bastone Ferrato',
  'Sickle': 'Falcetto',
  'Spear': 'Lancia',
  // Simple Ranged
  'Light Crossbow': 'Balestra Leggera',
  'Dart': 'Dardo',
  'Shortbow': 'Arco Corto',
  'Sling': 'Fionda',
  // Martial Melee
  'Battleaxe': 'Ascia da Battaglia',
  'Flail': 'Flagello',
  'Glaive': 'Falcione',
  'Greataxe': 'Ascia Bipenne',
  'Greatsword': 'Spadone',
  'Halberd': 'Alabarda',
  'Lance': 'Lancia da Cavaliere',
  'Longsword': 'Spada Lunga',
  'Maul': 'Maglio',
  'Morningstar': 'Stella del Mattino',
  'Pike': 'Picca',
  'Rapier': 'Stocco',
  'Scimitar': 'Scimitarra',
  'Shortsword': 'Spada Corta',
  'Trident': 'Tridente',
  'War Pick': 'Piccone da Guerra',
  'Warhammer': 'Martello da Guerra',
  'Whip': 'Frusta',
  // Martial Ranged
  'Hand Crossbow': 'Balestra a Mano',
  'Heavy Crossbow': 'Balestra Pesante',
  'Longbow': 'Arco Lungo',
}

export const armorNamesIt: Record<string, string> = {
  // Light
  'Padded': 'Imbottita',
  'Leather': 'Cuoio',
  'Studded Leather': 'Cuoio Borchiato',
  // Medium
  'Hide': 'Pelle',
  'Chain Shirt': 'Giaco di Maglia',
  'Scale Mail': 'Corazza di Scaglie',
  'Breastplate': 'Corazza',
  'Half Plate': 'Mezza Armatura',
  // Heavy
  'Ring Mail': 'Armatura ad Anelli',
  'Chain Mail': 'Cotta di Maglia',
  'Splint': 'Armatura a Stecche',
  'Plate': 'Armatura Completa',
  // Shield
  'Shield': 'Scudo',
}

export const spellNamesIt: Record<string, string> = {
  // Cantrips
  'Acid Splash': 'Schizzo Acido',
  'Blade Ward': 'Interdizione alle Lame',
  'Chill Touch': 'Tocco Gelido',
  'Dancing Lights': 'Luci Danzanti',
  'Druidcraft': 'Trucco Druidico',
  'Eldritch Blast': 'Dardo Mistico',
  'Fire Bolt': 'Dardo di Fuoco',
  'Guidance': 'Guida',
  'Light': 'Luce',
  'Mage Hand': 'Mano Magica',
  'Mending': 'Riparazione',
  'Message': 'Messaggio',
  'Minor Illusion': 'Illusione Minore',
  'Poison Spray': 'Spruzzo Velenoso',
  'Prestidigitation': 'Prestidigitazione',
  'Produce Flame': 'Produrre Fiamma',
  'Ray of Frost': 'Raggio di Gelo',
  'Resistance': 'Resistenza',
  'Sacred Flame': 'Fiamma Sacra',
  'Shillelagh': 'Shillelagh',
  'Shocking Grasp': 'Presa Folgorante',
  'Spare the Dying': 'Salvare i Morenti',
  'Thaumaturgy': 'Taumaturgia',
  'True Strike': 'Colpo Sicuro',
  'Vicious Mockery': 'Scherno Crudele',
  // 1st Level
  'Bless': 'Benedizione',
  'Burning Hands': 'Mani Brucianti',
  'Charm Person': 'Ammaliare Persone',
  'Cure Wounds': 'Cura Ferite',
  'Detect Magic': 'Individuazione del Magico',
  'Disguise Self': 'Travestimento',
  'Faerie Fire': 'Fuoco Fatuo',
  'Guiding Bolt': 'Dardo Luminoso',
  'Healing Word': 'Parola Guaritrice',
  'Hellish Rebuke': 'Punizione Infernale',
  'Hex': 'Maledizione',
  "Hunter's Mark": 'Segno del Cacciatore',
  'Mage Armor': 'Armatura Magica',
  'Magic Missile': 'Dardo Incantato',
  'Shield': 'Scudo',
  'Shield of Faith': 'Scudo della Fede',
  'Sleep': 'Sonno',
  'Thunderwave': 'Onda Tonante',
  // 2nd Level
  'Aid': 'Aiuto',
  'Blur': 'Sfocatura',
  'Hold Person': 'Blocca Persone',
  'Invisibility': 'Invisibilita\'',
  'Lesser Restoration': 'Ristorare Inferiore',
  'Misty Step': 'Passo Brumoso',
  'Scorching Ray': 'Raggio Rovente',
  'Spiritual Weapon': 'Arma Spirituale',
  'Web': 'Ragnatela',
  // 3rd Level
  'Counterspell': 'Controincantesimo',
  'Dispel Magic': 'Dissolvi Magie',
  'Fireball': 'Palla di Fuoco',
  'Fly': 'Volare',
  'Haste': 'Velocita\'',
  'Revivify': 'Revivificare',
  'Spirit Guardians': 'Guardiani Spirituali',
}

export const spellSchoolsIt: Record<string, string> = {
  'Abjuration': 'Abiurazione',
  'Conjuration': 'Evocazione',
  'Divination': 'Divinazione',
  'Enchantment': 'Ammaliamento',
  'Evocation': 'Invocazione',
  'Illusion': 'Illusione',
  'Necromancy': 'Necromanzia',
  'Transmutation': 'Trasmutazione',
}

export const damageTypesIt: Record<string, string> = {
  'bludgeoning': 'contundente',
  'piercing': 'perforante',
  'slashing': 'tagliente',
  'acid': 'acido',
  'cold': 'freddo',
  'fire': 'fuoco',
  'force': 'forza',
  'lightning': 'fulmine',
  'necrotic': 'necrotico',
  'poison': 'veleno',
  'psychic': 'psichico',
  'radiant': 'radiante',
  'thunder': 'tuono',
}

export const equipmentPacksIt: Record<string, string> = {
  "Burglar's Pack": 'Dotazione da Scassinatore',
  "Diplomat's Pack": 'Dotazione da Diplomatico',
  "Dungeoneer's Pack": 'Dotazione da Esploratore di Dungeon',
  "Entertainer's Pack": 'Dotazione da Intrattenitore',
  "Explorer's Pack": 'Dotazione da Esploratore',
  "Priest's Pack": 'Dotazione da Sacerdote',
  "Scholar's Pack": 'Dotazione da Studioso',
}

/**
 * Translate a game term to Italian. Returns the original if no translation exists.
 */
export function translateGameTerm(
  name: string,
  locale: string,
  category: 'weapon' | 'armor' | 'spell' | 'school' | 'damageType' | 'pack',
): string {
  if (locale !== 'it') return name

  switch (category) {
    case 'weapon':
      return weaponNamesIt[name] ?? name
    case 'armor':
      return armorNamesIt[name] ?? name
    case 'spell':
      return spellNamesIt[name] ?? name
    case 'school':
      return spellSchoolsIt[name] ?? name
    case 'damageType':
      return damageTypesIt[name] ?? name
    case 'pack':
      return equipmentPacksIt[name] ?? name
    default:
      return name
  }
}
