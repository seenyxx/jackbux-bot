import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, User } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, getBankBalance, jackbuxEmoji, numberRegex, subtractBankBalance, addBalanceNeutral } from '../../util/economy'

function withdrawEmbed(amount: number,) {
  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`Withdraw`)
    .setDescription(`You have withdrawn \`${amount}\` ${jackbuxEmoji} from your bank.`)

  return embed
}

export default defCommand({
  name: 'withdraw',
  aliases: ['with'],
  cooldown: 3,
  description: 'Withdraw your JACKBUX',
  usage: '<Amount>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let amount = args[0]
    let userBankBalance = getBankBalance(message.author.id)

    if (!amount) {
      throw new Error('You must provide an amount!')
    }

    if (amount == 'all') {
      if (userBankBalance == 0) {
        throw new Error("You don't have any JACKBUX to withdraw!")
      } else {
        let intAmount = userBankBalance

        subtractBankBalance(message.author.id, intAmount)
        addBalanceNeutral(message.author.id, intAmount)

        message.reply({ embeds: [withdrawEmbed(intAmount)] })
      }
    } else {
      if (!amount.match(numberRegex)) {
        throw new Error('You must provide a number or use `all`!')
      }

      let intAmount = parseInt(amount)

      if (userBankBalance < intAmount) {
        throw new Error('You do not have enough JACKBUX!')
      }

      subtractBankBalance(message.author.id, intAmount)
      addBalanceNeutral(message.author.id, intAmount)

      message.reply({ embeds: [withdrawEmbed(intAmount)] })
    }
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder().setName('withdraw').setDescription('Withdraw your JACKBUX!'),
})
