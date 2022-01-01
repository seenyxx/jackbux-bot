import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, jackbuxEmoji } from '../../util/economy'

export default defCommand({
  name: 'weekly',
  aliases: [],
  cooldown: 7 * 24 * 60 * 60,
  description: 'Claim your weekly reward!',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let reward = 25000

    const weekly = new MessageEmbed().setColor('RANDOM').setTitle('Weekly reward!')

    addBalance(message.author.id, reward)
    weekly.setDescription(`You just got \`${reward}\` ${jackbuxEmoji} JACKBUX.`)

    message.reply({ embeds: [weekly] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('weekly')
    .setDescription('Claim your weekly reward!'),
})
