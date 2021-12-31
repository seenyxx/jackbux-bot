import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, User, Interaction } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalance, getBalance, jackbuxEmoji, numberRegex, random, subtractBalance } from '../../util/economy'

let luckyUsers = ['470782419868319744']

function gambleEmbed(
  user: User,
  amount: number,
  result: 'win' | 'lose' | 'draw',
  roll: number,
  dealerRoll: number
) {
  const embed = new MessageEmbed()
    .setColor(result == 'win' ? 'GREEN' : result == 'lose' ? 'RED' : 'GREY')
    .setTitle(`Gamble`)
  if (result !== 'draw')
    embed.setDescription(
      `You have ${result == 'win' ? 'won' : 'lost'} \`${amount}\` ${jackbuxEmoji}`
    )
  else embed.setDescription(`You have not lost or won anything`)
  embed
    .addField(user.username, `Rolled a \`${roll}\``, true)
    .addField('Dealer', `Rolled a \`${dealerRoll}\``, true)

  return embed
}

export default defCommand({
  name: 'gamble',
  aliases: [],
  cooldown: 5,
  description: 'Gamble your JACKBUX',
  usage: '<Amount>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let amount = args[0]
    let userBalance = getBalance(message.author.id)
    let dealerRoll = random(1, 12)
    let roll = random(1, 12)

    if (luckyUsers.includes(message.author.id)) {
      dealerRoll = random(1, 6)
    }

    if (!amount) {
      throw new Error('You must provide an amount!')
    }

    if (amount == 'all') {
      if (userBalance == 0) {
        throw new Error("You don't have any JACKBUX to gamble!")
      } else {
        let intAmount = userBalance
        if (dealerRoll > roll) {
          message.reply({
            embeds: [gambleEmbed(message.author, intAmount, 'lose', roll, dealerRoll)],
          })
          subtractBalance(message.author.id, intAmount)
        } else if (dealerRoll < roll) {
          message.reply({
            embeds: [gambleEmbed(message.author, intAmount * 2, 'win', roll, dealerRoll)],
          })
          addBalance(message.author.id, intAmount * 2)
        } else if (dealerRoll == roll) {
          message.reply({
            embeds: [gambleEmbed(message.author, intAmount, 'draw', roll, dealerRoll)],
          })
        }
      }
    } else {
      if (!amount.match(numberRegex)) {
        throw new Error('You must provide a number or use `all`!')
      }

      let intAmount = parseInt(amount)

      if (userBalance < intAmount) {
        throw new Error('You do not have enough JACKBUX!')
      }

      if (dealerRoll > roll) {
        message.reply({
          embeds: [gambleEmbed(message.author, intAmount, 'lose', roll, dealerRoll)],
        })
        subtractBalance(message.author.id, intAmount)
      } else if (dealerRoll < roll) {
        message.reply({
          embeds: [gambleEmbed(message.author, intAmount * 2, 'win', roll, dealerRoll)],
        })
        addBalance(message.author.id, intAmount * 2)
      } else if (dealerRoll == roll) {
        message.reply({
          embeds: [gambleEmbed(message.author, intAmount, 'draw', roll, dealerRoll)],
        })
      }
    }
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder().setName('coinflip').setDescription('cf'),
})
