import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random, jackbuxEmoji, incrementDailyStreak } from '../../util/economy'

export default defCommand({
  name: 'kiss',
  aliases: ['daily'],
  cooldown: 18 * 60 * 60,
  description: 'Give a kiss for 5 JACKBUX',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let reward = 1000
    let lotteryWin = random(1, 10000)

    let streak = incrementDailyStreak(message.author.id)
    let jackpot = 2500

    const kissEmbed = new MessageEmbed().setColor('RANDOM').setTitle('😘 Mwah!')

    if (lotteryWin == 69) {
      addBalance(message.author.id, jackpot)
      kissEmbed.setDescription(
        `🤑 You just hit the jackpot and got \`${jackpot + streak * 500}\` ${jackbuxEmoji} JACKBUX.\nGO BUY A LOTTERY TICKET!`
      )
      kissEmbed.setFooter('1 in 10,000 chance btw')
    } else {
      addBalance(message.author.id, reward + streak * 500)
      kissEmbed.setDescription(`You just got \`${reward + streak * 500}\` ${jackbuxEmoji} JACKBUX.`)
    }

    message.reply({ embeds: [kissEmbed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Give a kiss for some JACKBUX.'),
})
