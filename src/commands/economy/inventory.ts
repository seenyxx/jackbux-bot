import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { getInventory } from '../../util/economy'
import { MessageEmbed } from 'discord.js'

export default defCommand({
  name: 'inventory',
  aliases: ['inv'],
  cooldown: 5,
  description: 'Checks your NFT inventory',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let authorId = message.author.id
    let inv = getInventory(authorId)

    if (inv.length == 0) {
      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${message.author.tag}'s Inventory`)
        .setDescription('No items in inventory')

      message.reply({ embeds: [embed] })
    } else {
      let invText = inv.join('`\n· `')

      const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`${message.author.tag}'s Inventory`)
        .setDescription(`· \`${invText}\``)

      message.reply({ embeds: [embed] })
    }
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('Checks your NFT inventory'),
})
