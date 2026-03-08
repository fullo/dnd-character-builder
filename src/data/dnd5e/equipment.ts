export interface WeaponData {
  name: string
  damage: string
  damageType: string
  properties: string[]
  weight: number
}

export interface ArmorData {
  name: string
  type: 'light' | 'medium' | 'heavy' | 'shield'
  baseAC: number
  maxDexBonus: number | null
  stealthDisadvantage: boolean
  weight: number
  strengthReq: number
}

export interface EquipmentPack {
  name: string
  items: string[]
}

export interface EquipmentSet {
  simpleWeapons: WeaponData[]
  martialWeapons: WeaponData[]
  armor: ArmorData[]
  packs: EquipmentPack[]
}

export const simpleWeapons: readonly WeaponData[] = [
  { name: 'Club', damage: '1d4', damageType: 'bludgeoning', properties: ['light'], weight: 2 },
  { name: 'Dagger', damage: '1d4', damageType: 'piercing', properties: ['finesse', 'light', 'thrown (20/60)'], weight: 1 },
  { name: 'Greatclub', damage: '1d8', damageType: 'bludgeoning', properties: ['two-handed'], weight: 10 },
  { name: 'Handaxe', damage: '1d6', damageType: 'slashing', properties: ['light', 'thrown (20/60)'], weight: 2 },
  { name: 'Javelin', damage: '1d6', damageType: 'piercing', properties: ['thrown (30/120)'], weight: 2 },
  { name: 'Light Hammer', damage: '1d4', damageType: 'bludgeoning', properties: ['light', 'thrown (20/60)'], weight: 2 },
  { name: 'Mace', damage: '1d6', damageType: 'bludgeoning', properties: [], weight: 4 },
  { name: 'Quarterstaff', damage: '1d6', damageType: 'bludgeoning', properties: ['versatile (1d8)'], weight: 4 },
  { name: 'Sickle', damage: '1d4', damageType: 'slashing', properties: ['light'], weight: 2 },
  { name: 'Spear', damage: '1d6', damageType: 'piercing', properties: ['thrown (20/60)', 'versatile (1d8)'], weight: 3 },
  { name: 'Light Crossbow', damage: '1d8', damageType: 'piercing', properties: ['ammunition (80/320)', 'loading', 'two-handed'], weight: 5 },
  { name: 'Dart', damage: '1d4', damageType: 'piercing', properties: ['finesse', 'thrown (20/60)'], weight: 0.25 },
  { name: 'Shortbow', damage: '1d6', damageType: 'piercing', properties: ['ammunition (80/320)', 'two-handed'], weight: 2 },
  { name: 'Sling', damage: '1d4', damageType: 'bludgeoning', properties: ['ammunition (30/120)'], weight: 0 },
]

export const martialWeapons: readonly WeaponData[] = [
  { name: 'Battleaxe', damage: '1d8', damageType: 'slashing', properties: ['versatile (1d10)'], weight: 4 },
  { name: 'Flail', damage: '1d8', damageType: 'bludgeoning', properties: [], weight: 2 },
  { name: 'Glaive', damage: '1d10', damageType: 'slashing', properties: ['heavy', 'reach', 'two-handed'], weight: 6 },
  { name: 'Greataxe', damage: '1d12', damageType: 'slashing', properties: ['heavy', 'two-handed'], weight: 7 },
  { name: 'Greatsword', damage: '2d6', damageType: 'slashing', properties: ['heavy', 'two-handed'], weight: 6 },
  { name: 'Halberd', damage: '1d10', damageType: 'slashing', properties: ['heavy', 'reach', 'two-handed'], weight: 6 },
  { name: 'Lance', damage: '1d12', damageType: 'piercing', properties: ['reach', 'special'], weight: 6 },
  { name: 'Longsword', damage: '1d8', damageType: 'slashing', properties: ['versatile (1d10)'], weight: 3 },
  { name: 'Maul', damage: '2d6', damageType: 'bludgeoning', properties: ['heavy', 'two-handed'], weight: 10 },
  { name: 'Morningstar', damage: '1d8', damageType: 'piercing', properties: [], weight: 4 },
  { name: 'Pike', damage: '1d10', damageType: 'piercing', properties: ['heavy', 'reach', 'two-handed'], weight: 18 },
  { name: 'Rapier', damage: '1d8', damageType: 'piercing', properties: ['finesse'], weight: 2 },
  { name: 'Scimitar', damage: '1d6', damageType: 'slashing', properties: ['finesse', 'light'], weight: 3 },
  { name: 'Shortsword', damage: '1d6', damageType: 'piercing', properties: ['finesse', 'light'], weight: 2 },
  { name: 'Trident', damage: '1d6', damageType: 'piercing', properties: ['thrown (20/60)', 'versatile (1d8)'], weight: 4 },
  { name: 'War Pick', damage: '1d8', damageType: 'piercing', properties: [], weight: 2 },
  { name: 'Warhammer', damage: '1d8', damageType: 'bludgeoning', properties: ['versatile (1d10)'], weight: 2 },
  { name: 'Whip', damage: '1d4', damageType: 'slashing', properties: ['finesse', 'reach'], weight: 3 },
  { name: 'Hand Crossbow', damage: '1d6', damageType: 'piercing', properties: ['ammunition (30/120)', 'light', 'loading'], weight: 3 },
  { name: 'Heavy Crossbow', damage: '1d10', damageType: 'piercing', properties: ['ammunition (100/400)', 'heavy', 'loading', 'two-handed'], weight: 18 },
  { name: 'Longbow', damage: '1d8', damageType: 'piercing', properties: ['ammunition (150/600)', 'heavy', 'two-handed'], weight: 2 },
]

export const armor: readonly ArmorData[] = [
  // Light
  { name: 'Padded', type: 'light', baseAC: 11, maxDexBonus: null, stealthDisadvantage: true, weight: 8, strengthReq: 0 },
  { name: 'Leather', type: 'light', baseAC: 11, maxDexBonus: null, stealthDisadvantage: false, weight: 10, strengthReq: 0 },
  { name: 'Studded Leather', type: 'light', baseAC: 12, maxDexBonus: null, stealthDisadvantage: false, weight: 13, strengthReq: 0 },
  // Medium
  { name: 'Hide', type: 'medium', baseAC: 12, maxDexBonus: 2, stealthDisadvantage: false, weight: 12, strengthReq: 0 },
  { name: 'Chain Shirt', type: 'medium', baseAC: 13, maxDexBonus: 2, stealthDisadvantage: false, weight: 20, strengthReq: 0 },
  { name: 'Scale Mail', type: 'medium', baseAC: 14, maxDexBonus: 2, stealthDisadvantage: true, weight: 45, strengthReq: 0 },
  { name: 'Breastplate', type: 'medium', baseAC: 14, maxDexBonus: 2, stealthDisadvantage: false, weight: 20, strengthReq: 0 },
  { name: 'Half Plate', type: 'medium', baseAC: 15, maxDexBonus: 2, stealthDisadvantage: true, weight: 40, strengthReq: 0 },
  // Heavy
  { name: 'Ring Mail', type: 'heavy', baseAC: 14, maxDexBonus: 0, stealthDisadvantage: true, weight: 40, strengthReq: 0 },
  { name: 'Chain Mail', type: 'heavy', baseAC: 16, maxDexBonus: 0, stealthDisadvantage: true, weight: 55, strengthReq: 13 },
  { name: 'Splint', type: 'heavy', baseAC: 17, maxDexBonus: 0, stealthDisadvantage: true, weight: 60, strengthReq: 15 },
  { name: 'Plate', type: 'heavy', baseAC: 18, maxDexBonus: 0, stealthDisadvantage: true, weight: 65, strengthReq: 15 },
  // Shield
  { name: 'Shield', type: 'shield', baseAC: 2, maxDexBonus: null, stealthDisadvantage: false, weight: 6, strengthReq: 0 },
]

export const equipmentData: EquipmentSet = {
  simpleWeapons: [...simpleWeapons],
  martialWeapons: [...martialWeapons],
  armor: [...armor],
  packs: [
    {
      name: "Burglar's Pack",
      items: ['Backpack', 'Bag of 1,000 ball bearings', '10 feet of string', 'Bell', '5 candles', 'Crowbar', 'Hammer', '10 pitons', 'Hooded lantern', '2 flasks of oil', '5 days rations', 'Tinderbox', 'Waterskin', '50 feet of hempen rope'],
    },
    {
      name: "Diplomat's Pack",
      items: ['Chest', '2 cases for maps and scrolls', 'Fine clothes', 'Bottle of ink', 'Ink pen', 'Lamp', '2 flasks of oil', '5 sheets of paper', 'Vial of perfume', 'Sealing wax', 'Soap'],
    },
    {
      name: "Dungeoneer's Pack",
      items: ['Backpack', 'Crowbar', 'Hammer', '10 pitons', '10 torches', 'Tinderbox', '10 days of rations', 'Waterskin', '50 feet of hempen rope'],
    },
    {
      name: "Entertainer's Pack",
      items: ['Backpack', 'Bedroll', '2 costumes', '5 candles', '5 days of rations', 'Waterskin', 'Disguise kit'],
    },
    {
      name: "Explorer's Pack",
      items: ['Backpack', 'Bedroll', 'Mess kit', 'Tinderbox', '10 torches', '10 days of rations', 'Waterskin', '50 feet of hempen rope'],
    },
    {
      name: "Priest's Pack",
      items: ['Backpack', 'Blanket', '10 candles', 'Tinderbox', 'Alms box', '2 blocks of incense', 'Censer', 'Vestments', '2 days of rations', 'Waterskin'],
    },
    {
      name: "Scholar's Pack",
      items: ['Backpack', 'Book of lore', 'Bottle of ink', 'Ink pen', '10 sheets of parchment', 'Little bag of sand', 'Small knife'],
    },
  ],
}
