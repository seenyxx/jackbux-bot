import { randomBytes } from 'crypto'
import db from 'quick.db'

const economy = new db.table('economy')
export const jackbuxEmoji = '<:dongbux:925549549660028979>'
export const numberRegex = /^[0-9]+$/g
export const dailyStreakAllowedTime = (18 + 12) * 60 * 60 * 1000

export function addBalance(userId: string, added: number) {
  // Alternative add method to account for the 50 coins that you start with
  setBalance(userId, getBalance(userId) + added)
  // Add to bank max
  addBankMax(userId, Math.floor(added / 8))
}

export function addBalanceNeutral(userId: string, added: number) {
  // Alternative add method to account for the 50 coins that you start with
  setBalance(userId, getBalance(userId) + added)
}

export function getDailyStreak(userId: string) {
  return economy.get(`${userId}.streak`)
}

export function setDailyStreak(userId: string, streak: number) {
  economy.set(`${userId}.streak`, streak)
}

export function getNextDailyTimestamp(userId: string) {
  return economy.get(`${userId}.streakTimestamp`) || 0
}

export function setNextDailyTimestamp(userId: string, timestamp: number) {
  return economy.set(`${userId}.streakTimestamp`, timestamp)
}
export function incrementDailyStreak(userId: string) {
  let now = Date.now()

  if (now <= getNextDailyTimestamp(userId)) {
    setDailyStreak(userId, getDailyStreak(userId) + 1)
    setNextDailyTimestamp(userId, now + dailyStreakAllowedTime)
  } else {
    setDailyStreak(userId, 0)

    setNextDailyTimestamp(userId, now + dailyStreakAllowedTime)
  }

  return getDailyStreak(userId)
}

export function subtractBalance(userId: string, subtracted: number) {
  economy.subtract(`${userId}.wallet`, subtracted)
}

export function setBalance(userId: string, amount: number) {
  economy.set(`${userId}.wallet`, amount)
}

export function setBankBalance(userId: string, amount: number) {
  economy.set(`${userId}.bank`, amount)
}

export function addBankBalance(userId: string, added: number) {
  economy.add(`${userId}.bank`, added)
}

export function subtractBankBalance(userId: string, subtracted: number) {
  economy.subtract(`${userId}.bank`, subtracted)
}

export function getBankBalance(userId: string): number {
  return economy.get(`${userId}.bank`) || 0
}

export function getBalance(userId: string): number {
  let bal = economy.get(`${userId}.wallet`)

  if (typeof bal == 'undefined' || typeof bal == 'object') {
    setBalance(userId, 50)
    return 50
  } else {
    return bal
  }
}

export function getBankMax(userId: string): number {
  return economy.get(`${userId}.bankmax`) || 10000
}

export function addBankMax(userId: string, added: number) {
  setBankMax(userId, getBankMax(userId) + added)
}

export function setBankMax(userId: string, amount: number) {
  economy.set(`${userId}.bankmax`, amount)
}

export function random(min: number, max: number) {
  const buf = randomBytes(1)

  let decimal = parseInt(buf.toString('hex'), 16).toString().substring(0, 2)

  return Math.floor(parseFloat(`0.${decimal}`) * (max - min + 1) + min)
  // return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getInventory(userId: string): string[] {
  let inv = economy.get(`${userId}.inv`)

  return inv ? inv : []
}

export function addInventoryItem(userId: string, itemId: string) {
  economy.push(`${userId}.inv`, itemId)
}

export function setInventory(userId: string, inventory: string[]) {
  economy.set(`${userId}.inv`, inventory)
}

export function remInventoryItem(userId: string, itemId: string) {
  let inv = getInventory(userId)

  let index = inv.indexOf(itemId)

  if (index !== -1) {
    inv.splice(index, 1)
    setInventory(userId, inv)
  }
}

export function lockBank(userId: string) {
  economy.set(`${userId}.lockbank`, true)
}

export function unlockBank(userId: string) {
  economy.set(`${userId}.lockbank`, false)
}

export function lockBankStatus(userId: string) {
  return economy.get(`${userId}.lockbank`) || false
}