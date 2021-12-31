import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, User } from 'discord.js'

import { defCommand } from '../../util/commands'
import {
  addBalance,
  random,
  getBalance,
  subtractBalance,
  numberRegex,
  jackbuxEmoji,
} from '../../util/economy'

function giveCurrencyEmbed(user: User, amount: number, receivingUser: User) {
  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`**${user.tag}** just gave **${amount} ${jackbuxEmoji}** to ${receivingUser.tag}`)
    .setDescription(`${receivingUser} has received \`${amount}\` ${jackbuxEmoji} from you.`)

  return embed
}

export default defCommand({
  name: 'give',
  aliases: ['donate'],
  cooldown: 5,
  description: 'Give someone else your JACKBUX',
  usage: '<@User> <Amount>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let mentionedUser = message.mentions.users.first()
    if (!mentionedUser) {
      throw new Error('You need to mention a user!')
    }
    if (mentionedUser.bot) {
      throw new Error("You can't give your money to a bot.")
    }

    let amount = args[1]
    let userBalance = getBalance(message.author.id)

    if (!amount) {
      throw new Error('You must provide an amount!')
    }

    if (amount == 'all') {
      if (userBalance == 0) {
        throw new Error("You don't have any JACKBUX to give!")
      } else {
        subtractBalance(message.author.id, userBalance)
        addBalance(mentionedUser.id, userBalance)
        message.reply({ embeds: [giveCurrencyEmbed(message.author, userBalance, mentionedUser)] })
      }
    } else {
      if (!amount.match(numberRegex)) {
        throw new Error('You must provide a number or use `all`!')
      }

      let intAmount = parseInt(amount)

      if (userBalance < intAmount) {
        throw new Error('You do not have enough JACKBUX!')
      }

      subtractBalance(message.author.id, intAmount)
      addBalance(mentionedUser.id, intAmount)
      message.reply({ embeds: [giveCurrencyEmbed(message.author, intAmount, mentionedUser)] })
    }
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give someone else your JACKBUX'),
})
