import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBankBalance, getBalance, jackbuxEmoji, numberRegex, subtractBalance, getBankMax, getBankBalance, remInventoryItem } from '../../util/economy'

function depositEmbed(amount: number,) {
  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`Withdraw`)
    .setDescription(`You have deposited \`${amount}\` ${jackbuxEmoji} into your bank.`)

  return embed
}

export default defCommand({
  name: 'deposit',
  aliases: ['dep'],
  cooldown: 3,
  description: 'Deposit your JACKBUX',
  usage: '<Amount>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let amount = args[0]
    let userBalance = getBalance(message.author.id)
    let userBankMax = getBankMax(message.author.id)
    let userBankBal = getBankBalance(message.author.id)

    if (!amount) {
      throw new Error('You must provide an amount!')
    }

    if (amount == 'all') {
      if (userBalance == 0) {
        throw new Error("You don't have any JACKBUX to deposit!")
      } else {
        let intAmount = userBalance

        let remainingAmount = userBankMax - userBankBal
        
        if (intAmount > remainingAmount) {
          intAmount = remainingAmount
        }

        subtractBalance(message.author.id, intAmount)
        addBankBalance(message.author.id, intAmount)

        message.reply({ embeds: [depositEmbed(intAmount)] })
      }
    } else {
      if (!amount.match(numberRegex)) {
        throw new Error('You must provide a number or use `all`!')
      }

      let intAmount = parseInt(amount)

      if (userBalance < intAmount) {
        throw new Error('You do not have enough JACKBUX!')
      }

      let remainingAmount = userBankMax - userBankBal

      if (intAmount > remainingAmount) {
        intAmount = remainingAmount
      }

      subtractBalance(message.author.id, intAmount)
      addBankBalance(message.author.id, intAmount)

      message.reply({ embeds: [depositEmbed(intAmount)] })
    }
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder().setName('deposit').setDescription('Deposit your JACKBUX!'),
})
