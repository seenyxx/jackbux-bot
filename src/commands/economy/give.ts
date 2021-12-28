import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random } from '../../util/economy'

export default defCommand({
  name: 'give',
  aliases: ['donate'],
  cooldown: 18 * 60 * 60,
  description: 'Give someone else your JACKBUX',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let mentionedUser = message.mentions.users.first()
    if (!mentionedUser) {
      throw new Error('You need to mention a user!')
    }

    message.channel.send({ embeds: [kissEmbed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give someone else your JACKBUX'),
})
