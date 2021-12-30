import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { getInventory } from '../../util/economy'
import { MessageEmbed } from 'discord.js'
import { download } from '../../util/network'
import mime from 'mime-types'
let allowedIds = ['470782419868319744', '460390245351817227', '796715626697588786']

export default defCommand({
  name: 'add-inv',
  aliases: ['inv-add', 'invAdd', 'addInv'],
  cooldown: 10,
  description: 'Adds an item to your NFT inventory',
  usage: '<Name>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let authorId = message.author.id
    let file = message.attachments.first()
    let name = args.join(' ').trim()

    if (!name) {
      throw new Error('No name provided!')
    }

    if (!file) {
      throw new Error('You must upload a file along with your message!')
    }

    if (name.length < 5) {
      throw new Error('The name must be at least 5 characters!')
    }

    let allowed = allowedIds.includes(authorId)

    if (!allowed) {
      throw new Error('You are not permitted to use this command!')
    }

    if (
      file.contentType !== 'image/png' &&
      file.contentType !== 'image/jpeg' &&
      file.contentType !== 'image/webp'
    ) {
      throw new Error('File must be of type PNG, JPEG or WEBP!')
    }

    download(file.url, `./data/${name}.${mime.extension(file.contentType)}`)
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('add-inv')
    .setDescription('Adds an item to your NFT inventory'),
})
