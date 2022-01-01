import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { addBalanceNeutral } from '../../util/economy'

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
    .setName('test')
    .setDescription('test'),
})
