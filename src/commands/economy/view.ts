import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { getInventory } from '../../util/economy'
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { existsSync } from 'fs'
import { getFileImagePath, getFileOwner } from '../../util/files'

export default defCommand({
  name: 'view',
  aliases: [],
  cooldown: 5,
  description: "DM you the real NFT in all it's glory!",
  usage: '<Name>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let name = args.join(' ')

    if (!name) {
      throw new Error('You must provide a name!')
    }

    let path = getFileImagePath(`./data/${name}`)

    if (!path) {
      throw new Error('That NFT does not exist!')
    }

    if (getFileOwner(name) !== message.author.id) {
      throw new Error('You do not own that NFT!')
    }

    let fileExtensions = path.split('.')
    const file = new MessageAttachment(path, `real.${fileExtensions[fileExtensions.length - 1]}`)

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`**${name}**`)
      .setImage(`attachment://real.${fileExtensions[fileExtensions.length - 1]}`)

    message.reply('You have been sent a DM containing the original NFT!')
    message.author.send({ embeds: [embed], files: [file] }).catch(() => {})
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('view')
    .setDescription("DM you the real NFT in all it's glory"),
})
