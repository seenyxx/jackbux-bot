import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { getInventory } from '../../util/economy'
import { MessageEmbed } from 'discord.js'

export default defCommand({
  name: 'add-inv',
  aliases: ['inv-add', 'invAdd', 'addInv'],
  cooldown: 5,
  description: 'Adds an item to your NFT inventory',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let authorId = message.author.id
    let file = message.attachments.first()
    let name = args[0]

    if (!file) {
      throw new Error('You must upload a file along with your message')
    }

    file
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('add-inv')
    .setDescription('Adds an item to your NFT inventory'),
})
