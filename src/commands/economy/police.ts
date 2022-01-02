import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageEmbed, User } from 'discord.js'

import { defCommand } from '../../util/commands'
import {
  addBalance,
  getBalance,
  jackbuxEmoji,
  random,
  subtractBalance,
  getPolicable,
  getPoliceActivation,
  setPoliceable,
  activatePolice,
} from '../../util/economy'

export default defCommand({
  name: 'police',
  aliases: ['cops'],
  cooldown: 60,
  description: 'Protect your bank!',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let policable = getPolicable(message.author.id)
    let policed = getPoliceActivation(message.author.id)

    if (policable && policed) {
      throw new Error('You have already called the police')
    }

    if (!policable) {
      throw new Error('Nobody is heisting your bank right now!')
    }

    message.reply(
      'The police are on their way! 🚨\nAnyone participating in the bank heist by the end of the recruiting period will be fined!'
    )
    activatePolice(message.author.id)
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder().setName('police').setDescription('Protect your bank!'),
})
