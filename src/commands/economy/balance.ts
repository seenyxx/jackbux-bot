import { MessageEmbed, Client } from 'discord.js'
import { defCommand } from '../../util/commands'
import { SlashCommandBuilder } from '@discordjs/builders'
import { getBalance, jackbuxEmoji } from '../../util/economy'

export default defCommand({
  name: 'balance',
  aliases: ['bal'],
  cooldown: 3,
  description: 'Tells you the amount of JACKBUX you have in your wallet',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message) => {
    let balance = getBalance(message.author.id)

    const balanceEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Your Balance`)
      .setDescription(`Wallet: \`${balance}\` ${jackbuxEmoji}`)

    if (balance < 10) {
      balanceEmbed.setFooter('Kinda poor')
    } else if (balance >= 10 && balance < 500) {
      balanceEmbed.setFooter("You're stepping it up in life")
    } else if (balance >= 500 && balance < 2000) {
      balanceEmbed.setFooter('You`re getting there!')
    } else {
      balanceEmbed.setFooter('🤑')
    }

    message.reply({ embeds: [balanceEmbed] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Tells you the amount of JACKBUX you have in your wallet.'),
})
