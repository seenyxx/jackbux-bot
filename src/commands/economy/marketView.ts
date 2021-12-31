import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageAttachment, MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { getFileImagePath, getFilePath } from '../../util/files'
import { getMarketItem } from '../../util/market'

export default defCommand({
  name: 'market-view',
  aliases: ['nmv', 'nft-view-market', 'nft-market-view'],
  cooldown: 5,
  description: 'View an item on the market',
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

    const file = new MessageAttachment(`./data/_${item.name}.png` as string, `preview.png`)

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Item: **${id}**`)
      .setImage(`attachment://preview.png`)

    message.reply({ embeds: [embed], files: [file] }).catch(() => {})
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('market-view')
    .setDescription('View an item on the market'),
})
