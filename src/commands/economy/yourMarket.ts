import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random, jackbuxEmoji, numberRegex } from '../../util/economy'
import { getFileOwner } from '../../util/files'
import {
  setMarketItem,
  getMarket,
  formatMarket,
  getMarketUser,
  getMarketItem,
} from '../../util/market'

export default defCommand({
  name: 'my-market',
  aliases: ['my-shop-listings', 'mm', 'my-market-listings'],
  cooldown: 10,
  description: 'Views the items that you put up for sale',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let userMarket = getMarketUser(message.author.id).map((itemId) => {
      return {
        ID: itemId,
        data: getMarketItem(itemId),
      }
    })

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('🏪 Your NFT Marketplace Listings 🛒')
      .setDescription(formatMarket(userMarket).join('\n'))
      .addField(
        'If you want to remove some of your market listings',
        `Use \`<prefix>market-remove <itemId>\`\nExample: \`dong market-remove 7m7gkd8m3\``
      )

    message.reply({ embeds: [embed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('market-listings')
    .setDescription('Views the items that you put up for sale'),
})
