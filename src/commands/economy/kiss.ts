import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random } from '../../util/economy'

export default defCommand({
  name: 'kiss',
  aliases: ['kiss'],
  cooldown: 18 * 60 * 60,
  description: 'Give a kiss for 5 JACKBUX',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let reward = random(2, 10)
    let lotteryWin = random(1, 10000)

    const kissEmbed = new MessageEmbed().setColor('RANDOM').setTitle('😘 Mwah!')

    if (lotteryWin == 69) {
      addBalance(message.author.id, 2500)
      kissEmbed.setDescription(
        `🤑 You just hit the jackpot and got \`⏣ 2500\` JACKBUX.\nGO BUY A LOTTERY TICKET!`
      )
      kissEmbed.setFooter('1 in 10,000 chance btw')
    } else {
      addBalance(message.author.id, reward)
      kissEmbed.setDescription(`You just got \`⏣ ${reward}\` JACKBUX.`)
    }

    message.channel.send({ embeds: [kissEmbed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Give a kiss for some JACKBUX.'),
})
