import db from 'quick.db'

const economy = new db.table('economy')

export function addBalance(userId: string, added: number) {
  economy.add(userId, added)
}

export function subtractBalance(userId: string, subtracted: number) {
  economy.subtract(userId, subtracted)
}

export function setBalance(userId: string, amount: number) {
  economy.set(userId, amount)
}

export function getBalance(userId: string): number {
  let bal = economy.get(userId)

  if (!bal) {
    setBalance(userId, 50)
  }

  return bal ? bal : 50
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
