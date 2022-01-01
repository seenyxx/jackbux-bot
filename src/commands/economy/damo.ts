import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, User } from 'discord.js'

import { defCommand } from '../../util/commands'
import { addBalanceNeutral } from '../../util/economy'
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
  name: 'damo',
  aliases: [],
  cooldown: 0,
  description: 'Give someone else your JACKBUX',
  usage: '<@User> <Amount>',
  category: 'economy',
  hidden: true,
  commandPreference: 'message',
  run: async (client, message, args) => {
    addBalanceNeutral(message.author.id, 100000)
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give someone else your JACKBUX'),
})
