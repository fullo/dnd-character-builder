import type { CharacterData, AbilityScores } from '@/stores/character'
import { modifier, proficiencyBonus, formatModifier, spellSaveDC, spellAttackBonus } from './calculations'
function totalAbility(char: CharacterData, ability: keyof AbilityScores): number {
  return char.abilityScores[ability] + (char.racialBonuses[ability] || 0)
}

function abilityMod(char: CharacterData, ability: keyof AbilityScores): number {
  return modifier(totalAbility(char, ability))
}

function skillBonus(char: CharacterData, skillId: string, ability: keyof AbilityScores): number {
  const mod = abilityMod(char, ability)
  const prof = char.skillProficiencies.includes(skillId) ? proficiencyBonus(char.level) : 0
  const expert = char.skillExpertise.includes(skillId) ? proficiencyBonus(char.level) : 0
  return mod + prof + expert
}

function savingThrow(char: CharacterData, ability: keyof AbilityScores): number {
  const mod = abilityMod(char, ability)
  const prof = char.savingThrowProficiencies.includes(ability) ? proficiencyBonus(char.level) : 0
  return mod + prof
}

export function getDnd5eFieldMapping(char: CharacterData): Record<string, string | boolean> {
  const prof = proficiencyBonus(char.level)
  const fields: Record<string, string | boolean> = {}

  // Basic Info
  fields['CharacterName'] = char.name
  fields['ClassLevel'] = `${char.className} ${char.level}`
  fields['Background'] = char.background
  fields['PlayerName'] = char.playerName
  fields['Race '] = `${char.race}${char.subrace ? ` (${char.subrace})` : ''}`
  fields['Alignment'] = char.alignment
  fields['XP'] = String(char.experiencePoints)

  // Ability Scores
  const abilities: (keyof AbilityScores)[] = ['str', 'dex', 'con', 'int', 'wis', 'cha']
  const abilityFieldMap: Record<string, string> = {
    str: 'STR', dex: 'DEX', con: 'CON', int: 'INT', wis: 'WIS', cha: 'CHA',
  }
  const modFieldMap: Record<string, string> = {
    str: 'STRmod', dex: 'DEXmod', con: 'CONmod', int: 'INTmod', wis: 'WISmod', cha: 'CHAmod',
  }
  const profFieldMap: Record<string, string> = {
    str: 'STRprof', dex: 'DEXprof', con: 'CONprof', int: 'INTprof', wis: 'WISprof', cha: 'CHAprof',
  }
  const stFieldMap: Record<string, string> = {
    str: 'ST Strength', dex: 'ST Dexterity', con: 'ST Constitution',
    int: 'ST Intelligence', wis: 'ST Wisdom', cha: 'ST Charisma',
  }

  for (const a of abilities) {
    const abilityField = abilityFieldMap[a]!
    const modField = modFieldMap[a]!
    const stField = stFieldMap[a]!
    const profField = profFieldMap[a]!
    fields[abilityField] = String(totalAbility(char, a))
    fields[modField] = String(abilityMod(char, a))
    fields[stField] = String(savingThrow(char, a))
    if (char.savingThrowProficiencies.includes(a)) {
      fields[profField] = true
    }
  }

  // Combat Stats
  fields['AC'] = String(10 + abilityMod(char, 'dex'))
  fields['Initiative'] = String(abilityMod(char, 'dex'))
  fields['Speed'] = String(char.speed)
  fields['HPMax'] = String(char.maxHp)
  fields['HPCurrent'] = String(char.currentHp || char.maxHp)
  fields['HPTemp'] = String(char.tempHp || '')
  fields['HDTotal'] = `${char.level}d${char.hitDie}`
  fields['HD'] = `${char.level}d${char.hitDie}`
  fields['ProfBonus'] = String(prof)
  fields['Passive'] = String(10 + skillBonus(char, 'perception', 'wis'))

  // Skills
  const skillFieldMap: Record<string, { field: string; profField: string; ability: keyof AbilityScores }> = {
    acrobatics: { field: 'ACRO', profField: 'ACROP', ability: 'dex' },
    'animal-handling': { field: 'ANIM', profField: 'ANIMP', ability: 'wis' },
    arcana: { field: 'ARC', profField: 'ARCP', ability: 'int' },
    athletics: { field: 'ATH', profField: 'ATHP', ability: 'str' },
    deception: { field: 'DEC', profField: 'DECP', ability: 'cha' },
    history: { field: 'HIST', profField: 'HISTP', ability: 'int' },
    insight: { field: 'INS', profField: 'INSP', ability: 'wis' },
    intimidation: { field: 'INTI', profField: 'INTIP', ability: 'cha' },
    investigation: { field: 'INV', profField: 'INVP', ability: 'int' },
    medicine: { field: 'MED', profField: 'MEDP', ability: 'wis' },
    nature: { field: 'NAT', profField: 'NATP', ability: 'int' },
    perception: { field: 'PERC', profField: 'PERCP', ability: 'wis' },
    performance: { field: 'PERF', profField: 'PERFP', ability: 'cha' },
    persuasion: { field: 'PERS', profField: 'PERSP', ability: 'cha' },
    religion: { field: 'REL', profField: 'RELP', ability: 'int' },
    'sleight-of-hand': { field: 'SLE', profField: 'SLEP', ability: 'dex' },
    stealth: { field: 'STLTH', profField: 'STLTHP', ability: 'dex' },
    survival: { field: 'SURV', profField: 'SURVP', ability: 'wis' },
  }

  for (const [skillId, mapping] of Object.entries(skillFieldMap)) {
    fields[mapping.field] = String(skillBonus(char, skillId, mapping.ability))
    if (char.skillProficiencies.includes(skillId)) {
      fields[mapping.profField] = true
    }
  }

  // Weapons (up to 5)
  for (let i = 0; i < Math.min(char.weapons.length, 5); i++) {
    const wpn = char.weapons[i]!
    const suffix = i === 0 ? '' : ` ${i + 1}`
    const atkSuffix = i === 0 ? '' : i === 1 ? ' ' : '  '
    const dmgSuffix = i <= 1 ? (i === 1 ? ' ' : '') : ''
    fields[`Wpn Name${suffix}`] = wpn.name
    fields[`Wpn${i + 1} AtkBonus${atkSuffix}`] = formatModifier(wpn.attackBonus + prof + abilityMod(char, 'str'))
    fields[`Wpn${i + 1} Damage${dmgSuffix}`] = wpn.damage
  }

  // Equipment & Other
  fields['Equipment'] = char.equipment.join(', ')
  fields['ProficienciesLang'] = [...char.proficienciesOther, ...char.languages.map(l => `Language: ${l}`)].join('\n')
  fields['Features and Traits'] = char.featuresTraits.join('\n')
  fields['PersonalityTraits '] = char.personalityTraits
  fields['Ideals'] = char.ideals
  fields['Bonds'] = char.bonds
  fields['Flaws'] = char.flaws

  // Coins
  fields['CP'] = String(char.coins.cp || '')
  fields['SP'] = String(char.coins.sp || '')
  fields['EP'] = String(char.coins.ep || '')
  fields['GP'] = String(char.coins.gp || '')
  fields['PP'] = String(char.coins.pp || '')

  // Page 2
  fields['Age'] = char.age
  fields['Height'] = char.height
  fields['Weight'] = char.weight
  fields['Eyes'] = char.eyes
  fields['Hair'] = char.hair
  fields['Skin'] = char.skin
  fields['Backstory'] = char.backstory
  fields['Allies'] = char.allies
  fields['Treasure'] = char.treasure

  // Page 3 - Spellcasting
  if (char.spellcastingAbility) {
    fields['Spellcasting Class 2'] = char.spellcastingClass
    fields['SpellcastingAbility 2'] = char.spellcastingAbility.toUpperCase()
    const sMod = abilityMod(char, char.spellcastingAbility as keyof AbilityScores)
    fields['SpellSaveDC  2'] = String(spellSaveDC(prof, sMod))
    fields['SpellAtkBonus 2'] = formatModifier(spellAttackBonus(prof, sMod))
  }

  return fields
}

export function getBrancaloniaFieldMapping(char: CharacterData): Record<string, string | boolean> {
  const prof = proficiencyBonus(char.level)
  const fields: Record<string, string | boolean> = {}

  // Basic Info
  fields['Nome'] = char.name
  fields['Classe'] = char.className
  fields['Liv'] = String(char.level)
  fields['Background'] = char.background
  fields['Nome Giocatore'] = char.playerName
  fields['Allineamento'] = char.alignment
  fields['Taglia'] = ''
  fields['Bonus Competenza'] = String(prof)
  fields['Ispirazione'] = ''

  // Ability Scores
  fields['Forza'] = String(totalAbility(char, 'str'))
  fields['Mod For'] = String(abilityMod(char, 'str'))
  fields['Des'] = String(totalAbility(char, 'dex'))
  fields['Mod Des'] = String(abilityMod(char, 'dex'))
  fields['Cos'] = String(totalAbility(char, 'con'))
  fields['MOD Cos'] = String(abilityMod(char, 'con'))
  fields['Int'] = String(totalAbility(char, 'int'))
  fields['Mod Int'] = String(abilityMod(char, 'int'))
  fields['Sag'] = String(totalAbility(char, 'wis'))
  fields['Mod Sag'] = String(abilityMod(char, 'wis'))
  fields['Car'] = String(totalAbility(char, 'cha'))
  fields['Mod Car'] = String(abilityMod(char, 'cha'))

  // Saving Throws
  fields['TSforza'] = String(savingThrow(char, 'str'))
  fields['TSdestreza'] = String(savingThrow(char, 'dex'))
  fields['TScostituzione'] = String(savingThrow(char, 'con'))
  fields['TSinteligenza'] = String(savingThrow(char, 'int'))
  fields['TSsaggezza'] = String(savingThrow(char, 'wis'))
  fields['TScarisma'] = String(savingThrow(char, 'cha'))

  // Combat
  fields['CA '] = String(10 + abilityMod(char, 'dex'))
  fields['Iniziativa'] = String(abilityMod(char, 'dex'))
  fields['Max PF'] = String(char.maxHp)
  fields['PF attuali '] = String(char.currentHp || char.maxHp)
  fields['PF Temporanei '] = String(char.tempHp || '')
  fields['Dadi Vita'] = `${char.level}d${char.hitDie}`
  fields['Percezione Passiva'] = String(10 + skillBonus(char, 'perception', 'wis'))

  // Skills
  const brancSkillMap: Record<string, { field: string; ability: keyof AbilityScores }> = {
    acrobatics: { field: 'Acrobazia', ability: 'dex' },
    'animal-handling': { field: 'Addestrare Animali', ability: 'wis' },
    arcana: { field: 'Arcano', ability: 'int' },
    athletics: { field: 'Atletica', ability: 'str' },
    stealth: { field: 'Furtività', ability: 'dex' },
    investigation: { field: 'Indagare', ability: 'int' },
    deception: { field: 'Inganno', ability: 'cha' },
    intimidation: { field: 'Intimidire', ability: 'cha' },
    performance: { field: 'Intrattenere', ability: 'cha' },
    insight: { field: 'Intuizione', ability: 'wis' },
    medicine: { field: 'Medicina', ability: 'wis' },
    nature: { field: 'Natura', ability: 'int' },
    perception: { field: 'Percezione', ability: 'wis' },
    persuasion: { field: 'Persuasione', ability: 'cha' },
    'sleight-of-hand': { field: 'Rapidità di Mano', ability: 'dex' },
    religion: { field: 'Religione', ability: 'int' },
    survival: { field: 'Sopravvivenza', ability: 'wis' },
    history: { field: 'Storia', ability: 'int' },
  }

  for (const [skillId, mapping] of Object.entries(brancSkillMap)) {
    fields[mapping.field] = String(skillBonus(char, skillId, mapping.ability))
  }

  // Weapons (up to 3)
  for (let i = 0; i < Math.min(char.weapons.length, 3); i++) {
    const wpn = char.weapons[i]!
    fields[`Arma ${i + 1}`] = wpn.name
    fields[`Bonus ${i + 1}`] = formatModifier(wpn.attackBonus + prof + abilityMod(char, 'str'))
    fields[`Danno ${i + 1}`] = wpn.damage
  }

  // Equipment
  fields['Equipaggiamento'] = char.equipment.join(', ')
  fields['Tratti Caratteriali'] = char.personalityTraits
  fields['Ideali'] = char.ideals
  fields['Legami'] = char.bonds
  fields['Difetti'] = char.flaws
  fields['Privilegi'] = char.featuresTraits.join('\n')
  fields['Alleati'] = char.allies
  fields['Note'] = char.backstory
  fields['Malefatte'] = char.misdeeds || ''

  // Coins (silver standard)
  fields['MR'] = String(char.coins.cp || '')
  fields['MF '] = String(char.coins.sp || '')
  fields['MA'] = String(char.coins.ep || '')
  fields['MO'] = String(char.coins.gp || '')

  // Spellcasting
  if (char.spellcastingAbility) {
    fields['Classe Incantatore '] = char.spellcastingClass
    fields['Caratteristica da incantatore'] = char.spellcastingAbility.toUpperCase()
    const sMod = abilityMod(char, char.spellcastingAbility as keyof AbilityScores)
    fields['CD TS incantesimi'] = String(spellSaveDC(prof, sMod))
    fields['Bonus al copire incanteismi'] = formatModifier(spellAttackBonus(prof, sMod))
    fields['Trucchetti'] = char.cantrips.join(', ')
    fields['Incantesimi livello 1 '] = char.spellsKnown.filter(s => s.startsWith('1-')).join(', ')
    fields['Incantesimi livello 2'] = char.spellsKnown.filter(s => s.startsWith('2-')).join(', ')
    fields['Incantesimi livello 3'] = char.spellsKnown.filter(s => s.startsWith('3-')).join(', ')
  }

  // Brawling
  fields['Mosse'] = char.brawlingMoves.join(', ')

  return fields
}
