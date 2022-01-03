import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, User } from 'discord.js'

import { defCommand } from '../../util/commands'
import { subtractBankBalance } from '../../util/economy'
import {
  addBalance,
  getBalance,
  jackbuxEmoji,
  random,
  subtractBalance,
  addBalanceNeutral,
  getBankBalance,
} from '../../util/economy'

const robLimit = 10000

export default defCommand({
  name: 'steal',
  aliases: ['rob'],
  cooldown: 60,
  description: 'Steal JACKBUX from someone else',
  usage: '<@User>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let mentionedUser = message.mentions.users.first()
    if (!mentionedUser) {
      throw new Error('You need to mention a user!')
    }
    if (mentionedUser.bot) {
      throw new Error("You can't steal from a bot.")
    }

    let userBal = getBankBalance(message.author.id)
    let targetBal = getBalance(mentionedUser.id)

    if (userBal < robLimit) {
      throw new Error(`You must at least have ${robLimit}!`)
    }

    if (targetBal < robLimit) {
      throw new Error(`Your target must at least have ${robLimit} JACKBUX!`)
    }

    let stealSuccess = random(1, 10)
    let stolenAmount = random(Math.floor(targetBal / 8), Math.floor(targetBal / 2))
    let lostAmount = random(Math.floor(userBal / 4), Math.floor(userBal / 2))

    if (stealSuccess == 1) {
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`You stole from **${mentionedUser.tag}**`)
        .setDescription(
          `You just stole \`${stolenAmount}\` ${jackbuxEmoji} from **${mentionedUser.tag}**`
        )

      addBalanceNeutral(message.author.id, stolenAmount)
      subtractBalance(mentionedUser.id, stolenAmount)

      mentionedUser
        .send(
          `**${message.author.tag}** has stolen \`${stolenAmount}\`${jackbuxEmoji} from you in **${message.guild?.name}**`
        )
        .catch(() => {})

      message.reply({ embeds: [embed] })
    } else {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(`You tried to steal from **${mentionedUser.tag}**`)
        .setDescription(
          `You just paid a fine of \`${lostAmount}\` ${jackbuxEmoji} for trying to steal from **${mentionedUser.tag}**!`
        )

      addBalanceNeutral(mentionedUser.id, lostAmount)
      subtractBankBalance(message.author.id, lostAmount)

      mentionedUser
        .send(
          `You almost got stolen from by **${message.author.tag}** in **${message.guild?.name}** but they failed and paid you \`${lostAmount}\`${jackbuxEmoji}`
        )
        .catch(() => {})

      message.reply({ embeds: [embed] })
    }
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('steal')
    .setDescription('Steal JACKBUX from someone else'),
})
