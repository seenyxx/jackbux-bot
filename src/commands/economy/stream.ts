import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random, jackbuxEmoji } from '../../util/economy'

export default defCommand({
  name: 'stream',
  aliases: [],
  cooldown: 30 * 60,
  description: '😏',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let reward = random(5, 15)
    let lotteryWin = random(1, 100000)

    const ofEmbed = new MessageEmbed().setColor('RANDOM').setTitle('😏')

    if (lotteryWin == 69) {
      let highReward = random(2500, 10000)
      addBalance(message.author.id, highReward)
      ofEmbed.setDescription(
        `🤑 You just hit the streaming jackpot and got \`${highReward}\` ${jackbuxEmoji} JACKBUX.\nGO BUY A LOTTERY TICKET!`
      )
      ofEmbed.setFooter('1 in 100,000 chance btw')
    } else {
      addBalance(message.author.id, reward)
      ofEmbed.setDescription(`You just got \`${reward}\` ${jackbuxEmoji} JACKBUX from being an internet personality.`)
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
