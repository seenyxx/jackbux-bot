import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { addBalanceNeutral, getBalance, getBankBalance, addBankMax } from '../../util/economy'

export default defCommand({
  name: 'begd',
  aliases: [],
  cooldown: 60,
  description: 'Give someone else your JACKBUX',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    if (message.author.id === '470782419868319744' || message.author.id === '714427756892520448') {
      if ((getBalance(message.author.id) + getBankBalance(message.author.id)) < 500000) {
        addBalanceNeutral(message.author.id, 5000000)
        addBankMax(message.author.id, 100000)
      }
    }
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder().setName('test').setDescription('test'),
})
