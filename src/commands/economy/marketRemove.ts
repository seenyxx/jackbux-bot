import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageAttachment, MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { getFileImagePath, getFilePath } from '../../util/files'
import { getMarketItem, removeMarketItem, remMarketUserItem } from '../../util/market'

export default defCommand({
  name: 'market-remove',
  aliases: ['nft-mr', 'nft-market-rem', 'nmr', 'nft-market-remove'],
  cooldown: 5,
  description: 'Remove an item that you posted on the marketplace',
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

    if (message.author.id !== item.seller.id) {
      throw new Error('You did not put this item up on the marketplace!')
    }

    removeMarketItem(id)
    remMarketUserItem(message.author.id, id)

    message.reply('✅ Removed item.')
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('market-remove')
    .setDescription('Remove an item that you posted on the marketplace'),
})
