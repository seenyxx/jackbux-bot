import { User } from 'discord.js'
import db from 'quick.db'
import { jackbuxEmoji } from './economy'

const market = new db.table('market')
const marketUsers = new db.table('market_users')

export function timestampId() {
  return Date.now().toString(26)
}

export function setMarketItem(name: string, price: number, user: User) {
  let id = timestampId()

  market.set(`${id}.name`, name)
  market.set(`${id}.price`, price)
  market.set(`${id}.seller.id`, user.id)
  market.set(`${id}.seller.tag`, user.tag)

  marketUsers.push(user.id, id)

  return id
}

export function getMarketUser(userId: string): string[] {
  return marketUsers.get(userId) || []
}

export function setMarketUser(userId: string, value: string[]) {
  marketUsers.set(userId, value)
}

export function remMarketUserItem(userId: string, itemId: string) {
  let inv = getMarketUser(userId)

  let index = inv.indexOf(itemId)

  if (index !== -1) {
    inv.splice(index, 1)
    setMarketUser(userId, inv)
  }
}

export function getMarketItemPrice(name: string): number {
  return market.get(`${name}.price`)
}

export interface Seller {
  id: string
  tag: string
}

export function getMarketItemSeller(name: string): Seller | undefined {
  return market.get(`${name}.seller`)
}

export interface MarketItem {
  name: string
  price: number
  seller: Seller
}

export function getMarketItem(name: string): MarketItem | undefined {
  return market.get(name)
}

export function getMarket() {
  return market.all()
}

export function removeMarketItem(name: string) {
  market.delete(name)
}

export function formatMarket(
  marketData: {
    ID: string
    data: MarketItem
  }[]
) {
  return marketData.map((marketItem) => {
    let marketItemData = marketItem.data as MarketItem
    return `[\`${marketItem.ID.padEnd(10)}\`](https://google.com) | \`${marketItemData.name.padEnd(
      20
    )}\` | **${`${marketItemData.price.toString()}`.padEnd(10)}** ${jackbuxEmoji}`
  })
}
