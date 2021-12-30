import { SlashCommandBuilder } from '@discordjs/builders'

import { defCommand } from '../../util/commands'
import { getInventory } from '../../util/economy'
import { MessageAttachment, MessageEmbed } from 'discord.js'
import { download } from '../../util/network'
import mime from 'mime-types'
import { fileExist, setFileOwner, setFilePath } from '../../util/files'
import { watermarkImage } from '../../util/image'
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

    if (fileExist(name)) {
      console.log(fileExist(name))
      throw new Error('A NFT already exists with the same name!')
    }

    if (!file) {
      throw new Error('You must upload a file along with your message!')
    }

    if (name.length < 4) {
      throw new Error('The name must be at least 4 characters!')
    }

    let allowed = allowedIds.includes(authorId)

    if (!allowed) {
      throw new Error('You are not permitted to use this command!')
    }

    if (name.startsWith('_')) {
      throw new Error('Name cannot start with `_`!')
    }

    if (
      file.contentType !== 'image/png' &&
      file.contentType !== 'image/jpeg' &&
      file.contentType !== 'image/webp'
    ) {
      throw new Error('File must be of type PNG, JPEG or WEBP!')
    }

    let filePath = `./data/${name}.${mime.extension(file.contentType)}`
    let watermarkPath = `./data/_${name}.${mime.extension(file.contentType as string)}`
    let fileName = `${name}.${mime.extension(file.contentType as string)}`

    download(file.url, filePath, () => {
      setFilePath(name, filePath)
      setFileOwner(name, message.author.id)
      watermarkImage(filePath, watermarkPath)
      message.channel.send(`Added as \`${fileName}\` ✅`)
    })

    await message.delete()
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('add-inv')
    .setDescription('Adds an item to your NFT inventory'),
})
