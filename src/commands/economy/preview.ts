import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { getInventory } from '../../util/economy'
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { existsSync } from 'fs'

export default defCommand({
  name: 'preview',
  aliases: [],
  cooldown: 5,
  description: 'Preview an NFT',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let name = args.join(' ')

    if (!name) {
      throw new Error('You must provide a name!')
    }

    let previewPath = `./data/_${name}.png`

    if (!existsSync(previewPath)) {
      throw new Error('That NFT does not exist!')
    }

    const file = new MessageAttachment(previewPath, `preview.png`)

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Preview for **${name}**`)
      .setImage(`attachment://preview.png`)

    message.channel.send({ embeds: [embed], files: [file] })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder().setName('preview').setDescription('Preview an NFT'),
})
