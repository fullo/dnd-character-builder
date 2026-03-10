import { describe, it, expect } from 'vitest'
import {
  modifier,
  proficiencyBonus,
  hpAtLevel1,
  hpPerLevel,
  totalHp,
  baseAC,
  spellSaveDC,
  spellAttackBonus,
  formatModifier,
  feetToMeters,
} from './calculations'

describe('modifier', () => {
  it('returns correct modifier for standard scores', () => {
    expect(modifier(10)).toBe(0)
    expect(modifier(11)).toBe(0)
    expect(modifier(12)).toBe(1)
    expect(modifier(14)).toBe(2)
    expect(modifier(20)).toBe(5)
  })

  it('returns negative modifiers for low scores', () => {
    expect(modifier(8)).toBe(-1)
    expect(modifier(6)).toBe(-2)
    expect(modifier(1)).toBe(-5)
  })
})

describe('proficiencyBonus', () => {
  it('returns +2 for levels 1-4', () => {
    for (let lvl = 1; lvl <= 4; lvl++) {
      expect(proficiencyBonus(lvl)).toBe(2)
    }
  })

  it('returns +3 for levels 5-8', () => {
    for (let lvl = 5; lvl <= 8; lvl++) {
      expect(proficiencyBonus(lvl)).toBe(3)
    }
  })

  it('returns +6 for level 20', () => {
    expect(proficiencyBonus(20)).toBe(6)
  })
})

describe('hpAtLevel1', () => {
  it('calculates max hit die + con modifier', () => {
    expect(hpAtLevel1(10, 2)).toBe(12) // d10 fighter, +2 CON
    expect(hpAtLevel1(6, -1)).toBe(5)  // d6 wizard, -1 CON
    expect(hpAtLevel1(12, 3)).toBe(15) // d12 barbarian, +3 CON
  })
})

describe('hpPerLevel', () => {
  it('uses average die roll + 1 + con modifier', () => {
    expect(hpPerLevel(10, 2)).toBe(8)  // floor(10/2)+1+2 = 8
    expect(hpPerLevel(6, 0)).toBe(4)   // floor(6/2)+1+0 = 4
    expect(hpPerLevel(12, 3)).toBe(10) // floor(12/2)+1+3 = 10
  })
})

describe('totalHp', () => {
  it('calculates correct HP at level 1', () => {
    expect(totalHp(10, 2, 1)).toBe(12) // 10 + 2
  })

  it('calculates correct HP at higher levels', () => {
    expect(totalHp(10, 2, 5)).toBe(44) // 12 + 4*8 = 44
  })

  it('returns 0 for level 0 or below', () => {
    expect(totalHp(10, 2, 0)).toBe(0)
    expect(totalHp(10, 2, -1)).toBe(0)
  })

  it('returns at least 1 HP', () => {
    expect(totalHp(6, -5, 1)).toBe(1) // 6 + (-5) = 1 (clamped)
  })
})

describe('baseAC', () => {
  it('returns 10 + DEX modifier', () => {
    expect(baseAC(0)).toBe(10)
    expect(baseAC(2)).toBe(12)
    expect(baseAC(-1)).toBe(9)
  })
})

describe('spellSaveDC', () => {
  it('returns 8 + proficiency + ability mod', () => {
    expect(spellSaveDC(2, 3)).toBe(13) // 8+2+3
    expect(spellSaveDC(4, 5)).toBe(17) // 8+4+5
  })
})

describe('spellAttackBonus', () => {
  it('returns proficiency + ability mod', () => {
    expect(spellAttackBonus(2, 3)).toBe(5)
    expect(spellAttackBonus(6, 5)).toBe(11)
  })
})

describe('formatModifier', () => {
  it('adds + sign for positive and zero', () => {
    expect(formatModifier(0)).toBe('+0')
    expect(formatModifier(3)).toBe('+3')
  })

  it('uses - sign for negative', () => {
    expect(formatModifier(-2)).toBe('-2')
  })
})

describe('feetToMeters', () => {
  it('converts standard D&D distances', () => {
    expect(feetToMeters(30)).toBe('9')   // 30ft = 9m
    expect(feetToMeters(25)).toBe('7.5') // 25ft = 7.5m
    expect(feetToMeters(5)).toBe('1.5')  // 5ft = 1.5m
  })

  it('handles zero', () => {
    expect(feetToMeters(0)).toBe('0')
  })
})
