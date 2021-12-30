import db from 'quick.db'

const economy = new db.table('economy')
export const jackbuxEmoji = '<:dongbux:925549549660028979>'
export const numberRegex = /^[0-9]+$/g

export function addBalance(userId: string, added: number) {
  // Alternative add method to account for the 50 coins that you start with
  setBalance(userId, getBalance(userId) + added)
}

export function subtractBalance(userId: string, subtracted: number) {
  economy.subtract(`${userId}.wallet`, subtracted)
}

export function setBalance(userId: string, amount: number) {
  economy.set(`${userId}.wallet`, amount)
}

export function getBalance(userId: string): number {
  let bal = economy.get(`${userId}.wallet`)

  if (typeof bal == 'undefined') {
    setBalance(userId, 50)
    return 50
  } else {
    return bal
  }
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
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
