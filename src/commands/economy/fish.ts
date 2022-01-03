import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random, jackbuxEmoji } from '../../util/economy'

export default defCommand({
  name: 'fish',
  aliases: [],
  cooldown: 1 * 60,
  description: '😏',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let reward = random(500, 1000)
    let lotteryWin = random(1, 100000)

    const ofEmbed = new MessageEmbed().setColor('RANDOM').setTitle('🐟 Fish')

    if (lotteryWin == 69) {
      let highReward = random(5000, 12500)
      addBalance(message.author.id, highReward)
      ofEmbed.setDescription(
        `🤑 You just caught a whale and got \`${highReward}\` ${jackbuxEmoji} JACKBUX. \nGO BUY A LOTTERY TICKET!`
      )
      ofEmbed.setFooter('1 in 10,000 chance btw')
    } else {
      addBalance(message.author.id, reward)
      ofEmbed.setDescription(
        `You just got \`${reward}\` ${jackbuxEmoji} JACKBUX from fishing in the water!`
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
