import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random, jackbuxEmoji, numberRegex } from '../../util/economy'
import { getFileOwner } from '../../util/files'
import { setMarketItem } from '../../util/market'

export default defCommand({
  name: 'market-sell',
  aliases: ['sell'],
  cooldown: 10,
  description: 'Put your NFT up for sale!',
  usage: '<Price> <Name>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let price = args.shift()

    if (!price) {
      throw new Error('No price provided!')
    }

    let name = args.join(' ')

    if (!name) {
      throw new Error('No name provided!')
    }

    let owner = getFileOwner(name)

    if (!owner) {
      throw new Error('This NFT does not exist!')
    }

    if (message.author.id !== owner) {
      throw new Error('You do not own this NFT.')
    }

    if (!price.match(numberRegex)) {
      throw new Error('You must provide a number!')
    }

    if (price.length > 10) {
      throw new Error('Price must not be higher than 9 999 999 999')
    }

    let priceAmount = parseInt(price)

    let id = setMarketItem(name, priceAmount, message.author)

    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Item is now on the marketplace')
      .addField('ID', `\`${id}\``)
      .addField(
        'Info',
        `**Name:** ${name}\n**Price:** \`${priceAmount}\` ${jackbuxEmoji}\n**Vendor:** ${message.author.tag} (${message.author.id})`
      )

    message.reply({ embeds: [embed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('sell')
    .setDescription('Put your NFT up for sale!'),
})
