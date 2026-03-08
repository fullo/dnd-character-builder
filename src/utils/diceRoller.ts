/** Roll a single die */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1
}

/** Roll multiple dice and return individual results */
export function rollDice(count: number, sides: number): number[] {
  return Array.from({ length: count }, () => rollDie(sides))
}

/** Roll 4d6, drop lowest - standard D&D stat generation */
export function roll4d6DropLowest(): { rolls: number[]; dropped: number; total: number } {
  const rolls = rollDice(4, 6)
  const sorted = [...rolls].sort((a, b) => a - b)
  const dropped = sorted[0]!
  const total = sorted.slice(1).reduce((sum, v) => sum + v, 0)
  return { rolls, dropped, total }
}

/** Generate a full set of 6 ability scores using 4d6 drop lowest */
export function rollAbilityScores(): { rolls: number[][]; dropped: number[]; totals: number[] } {
  const results = Array.from({ length: 6 }, () => roll4d6DropLowest())
  return {
    rolls: results.map(r => r.rolls),
    dropped: results.map(r => r.dropped),
    totals: results.map(r => r.total),
  }
}

/** The standard array for ability scores */
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8]

/** Point buy costs per score value */
export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
}

/** Total points available for point buy */
export const POINT_BUY_TOTAL = 27

/** Calculate remaining points in point buy */
export function pointBuyRemaining(scores: number[]): number {
  const spent = scores.reduce((sum, s) => sum + (POINT_BUY_COSTS[s] ?? 0), 0)
  return POINT_BUY_TOTAL - spent
}
