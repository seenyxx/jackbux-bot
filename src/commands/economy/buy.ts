import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageAttachment, MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import {
  jackbuxEmoji,
  remInventoryItem,
  addInventoryItem,
  subtractBalance,
  getBalance,
  addBalance,
} from '../../util/economy'
import { getMarketItem, removeMarketItem, remMarketUserItem } from '../../util/market'
import { setFileOwner } from '../../util/files'

export default defCommand({
  name: 'market-buy',
  aliases: ['mb', 'buy'],
  cooldown: 5,
  description: 'Buys an item on the market',
  usage: '<ID>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let id = args[0]

    if (!id) {
      throw new Error('You must provide an ID!')
    }

    let item = getMarketItem(id)

    if (!item) {
      throw new Error('That item does not exist!')
    }

    if (item.seller.id == message.author.id) {
      throw new Error("You can't buy your own item.")
    }

    let bal = getBalance(message.author.id)

    if (bal < item.price) {
      throw new Error('You do not have enough to buy this item.')
    }

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Successfully bought item!`)
      .setDescription(
        `**${message.author.tag}** has bought \`${item.name}\` from **${item.seller.tag}** for \`${item.price}\` ${jackbuxEmoji}`
      )

    remInventoryItem(item.seller.id, item.name)
    addInventoryItem(message.author.id, item.name)

    setFileOwner(item.name, message.author.id)

    subtractBalance(message.author.id, item.price)
    addBalance(item.seller.id, item.price)

    removeMarketItem(id)
    remMarketUserItem(item.seller.id, id)

    let user = await client.users.fetch(item.seller.id)

    user
      .send(
        `**${message.author.tag}** has bought \`${item.name}\` from **you** for \`${item.price}\` ${jackbuxEmoji}`
      )
      .catch(() => {})

    message.reply({ embeds: [embed] }).catch(() => {})
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('market-buy')
    .setDescription('Buys an item on the market'),
})
