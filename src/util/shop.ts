import { readFileSync } from 'fs'
import { MessageEmbed } from 'discord.js'
import db from 'quick.db'

const shopData: ShopData[] = JSON.parse(readFileSync('./shop.json').toString())
const economy = new db.table('economy')

interface ShopData {
  name: string
  price: number
  desc: string
}

export function shopEmbed() {
  let shopDesc = shopData.map((item) => `**${item.name}**\n${item.desc}`).join('\n')

  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('🏪 Item Shop 🛍️')
    .setDescription(shopDesc)
    .setFooter(`Use <prefix>shop <item> to see more information about an item`)

  return embed
}

export function getShopItemCount(userId: string, itemName: string) {
  return economy.get(`${userId}.items.${itemName}`) || 0
}

export function setShopitemCount(userId: string, itemName: string, amount: number) {
  economy.set(`${userId}.items.${itemName}`, amount)
}

export function incrementItem(userId: string, itemName: string) {
  setShopitemCount(userId, itemName, getShopItemCount(userId, itemName) + 1)
}

export function decrementItem(userId: string, itemName: string) {
  economy.subtract(`${userId}.items.${itemName}`, 1)
}
