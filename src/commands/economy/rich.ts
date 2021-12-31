import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { jackbuxEmoji, getBalance } from '../../util/economy'
import { formatMarket, getMarket } from '../../util/market'

export default defCommand({
  name: 'rich',
  aliases: ['list'],
  cooldown: 10,
  description: 'Views the richest people in the server.',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    interface MemberBalanceData {
      tag: string
      id: string
      bal: number
    }

    let userBalances = (
      message.guild?.members.cache
        .map((m) => {
          let balance = getBalance(m.id)

          if (m.user.bot) {
            return
          }

          return {
            tag: m.user.tag,
            id: m.id,
            bal: balance,
          }
        })
        .filter((m) => m) as MemberBalanceData[]
    )
      .sort((a, b) => {
        return b.bal - a.bal
      })
      .slice(0, 20)

    let userBalanceText = ''

    userBalances.forEach((balance, i) => {
      userBalanceText = `${userBalanceText}**\`#${(i + 1)
        .toString()
        .padEnd(3)}\`** | **\`${balance.tag.padEnd(37)}\`** | \`${balance.bal
        .toString()
        .padEnd(10)}\` ${jackbuxEmoji}\n`
    })

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`🏅 Richest people in **${message.guild?.name}** ${jackbuxEmoji}`)
      .setDescription(userBalanceText)
      .setFooter('This only accounts for the amount of money in their wallet')

    message.reply({ embeds: [embed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('rich')
    .setDescription('Views richest people in the server.'),
})
