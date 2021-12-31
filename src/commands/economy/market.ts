import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { formatMarket, getMarket } from '../../util/market'

export default defCommand({
  name: 'nft-market',
  aliases: ['nft-shop', 'nm', 'nshop', 'nmarket', 'nft'],
  cooldown: 10,
  description: 'Views the NFTs up for sale',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle('🏪 NFT Marketplace 🛒')
      .setDescription(formatMarket(getMarket()).join('\n'))
      .addField(
        'Usage',
        `Use \`<prefix>market-view <itemId>\`\nExample: \`dong market-view 7m7gkd8m3\``
      )

    message.reply({ embeds: [embed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('market')
    .setDescription('Views the NFTs up for sale'),
})
