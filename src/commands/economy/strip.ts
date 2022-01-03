import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random, jackbuxEmoji } from '../../util/economy'

export default defCommand({
  name: 'strip',
  aliases: ['wank'],
  cooldown: 30,
  description: '😏',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let reward = random(300, 500)
    let lotteryWin = random(1, 10)

    const ofEmbed = new MessageEmbed().setColor('RANDOM').setTitle('😏')

    if (lotteryWin == 69) {
      let highReward = random(20000, 30000)
      addBalance(message.author.id, highReward)
      ofEmbed.setDescription(
        `🤑 You just did the best one and got \`${highReward}\` ${jackbuxEmoji} JACKBUX.`
      )
    } else {
      addBalance(message.author.id, reward)
      ofEmbed.setDescription(
        `You just got \`${reward}\` ${jackbuxEmoji} JACKBUX from 😏`
      )
    }

    message.reply({ embeds: [ofEmbed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('stream')
    .setDescription('Stream on the internet'),
})
