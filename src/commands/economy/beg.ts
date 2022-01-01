import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, random, jackbuxEmoji } from '../../util/economy'

export default defCommand({
  name: 'beg',
  aliases: [],
  cooldown: 30,
  description: 'Beg for money',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let reward = random(200, 500)
    let win = random(1, 3)
    let lotteryWin = random(1, 100000)

    const ofEmbed = new MessageEmbed().setColor('RANDOM').setTitle('Beg')

    if (lotteryWin == 69) {
      let highReward = random(2500, 10000)
      addBalance(message.author.id, highReward)
      ofEmbed.setDescription(
        `🤑 A rich guy just walked buy and gave you \`${highReward}\` ${jackbuxEmoji} JACKBUX.\nGO BUY A LOTTERY TICKET!`
      )
      ofEmbed.setFooter('1 in 100,000 chance btw')
    } else {
      addBalance(message.author.id, win == 1 ? 0 : reward)
      ofEmbed.setDescription(`You just got \`${win == 1 ? 0 : reward}\` ${jackbuxEmoji} JACKBUX from begging.`)
    }

    message.reply({ embeds: [ofEmbed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder().setName('beg').setDescription('Beg for money'),
})
