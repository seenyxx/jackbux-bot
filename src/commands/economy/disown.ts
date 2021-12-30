import { SlashCommandBuilder } from '@discordjs/builders'
import { MessageAttachment, MessageEmbed, MessageReaction, User } from 'discord.js'
import { existsSync, unlinkSync } from 'fs'

import { defCommand } from '../../util/commands'
import { getFileImagePath, getFileOwner, deleteFile } from '../../util/files'

export default defCommand({
  name: 'disown',
  aliases: ['inv-rem', 'inv-remove', 'inventory-remove', 'destroy', 'remove'],
  cooldown: 5,
  description: 'Disown an NFT that you own',
  usage: '',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let name = args.join(' ')

    if (!name) {
      throw new Error('You must provide a name!')
    }

    let previewPath = `./data/_${name}.png`
    let originalPath = getFileImagePath(`./data/${name}`)

    if (!existsSync(previewPath)) {
      throw new Error('That NFT does not exist!')
    }

    if (!originalPath) {
      throw new Error('That NFT does not exist!')
    }

    let owner = getFileOwner(name)

    if (message.author.id !== owner) {
      throw new Error('You do not own this NFT.')
    }

    const file = new MessageAttachment(previewPath, `preview.png`)

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`Are you sure you want to disown **${name}**`)
      .setDescription(
        'Are you sure you want to disown your NFT. It will be lost forever!\nReact with ✅ If you really want to destory it'
      )
      .setImage(`attachment://preview.png`)

    let msg = await message.channel.send({ embeds: [embed], files: [file] })

    const filter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name == '✅' && user.id === message.author.id
    }

    await msg.react('✅')
    msg
      .awaitReactions({
        filter,
        max: 1,
        time: 30 * 1000,
      })
      .then((collected) => {
        console.log(collected)
        console.log('doanfadf')
        const reaction = collected.first()

        if (reaction) {
          message.reply('You have disowned your NFT!')
          deleteFile(name)
          unlinkSync(originalPath as string)
          unlinkSync(previewPath)
        }
      })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('disown')
    .setDescription('Disown an NFT that you own'),
})
