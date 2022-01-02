import { SlashCommandBuilder } from '@discordjs/builders'
import { APIUser } from 'discord-api-types'
import { CacheType, MessageComponentInteraction, User, Message } from 'discord.js'

import { defCommand } from '../../util/commands'
import { getBalance, getBankBalance, random, lockBank, subtractBankBalance, addBalance, subtractBalance, unlockBank, jackbuxEmoji } from '../../util/economy'


const requiredAmount = 2000


export default defCommand({
  name: 'heist',
  aliases: ['bankheist', 'bankrob'],
  cooldown: 60,
  description: 'Bank heist a person',
  usage: '<@User>',
  category: 'economy',
  commandPreference: 'message',
  run: async (client, message, args) => {
    let mentionedUser = message.mentions.users.first()

    if (!mentionedUser) {
      throw new Error('You need to mention a user!')
    }
    if (mentionedUser.bot) {
      throw new Error("You can't heist a bot.")
    }

    let targetUserId = mentionedUser.id
    let userBal = getBalance(message.author.id)
    let targetBankBal = getBankBalance(targetUserId)

    if (userBal < requiredAmount) {
      throw new Error(`You must at least have ${requiredAmount} JACKBUX!`)
    }

    if (targetBankBal < 5000) {
      throw new Error('Your target must at least have 5000 JACKBUX in their bank!')
    }

    let stolenAmount = random(Math.floor(targetBankBal / 6), Math.floor(targetBankBal / 1.5))

    let participantIds: string[] = [message.author.id]
    let participantUsers: User[] = [message.author]

    lockBank(targetUserId)

    mentionedUser.send(`**${message.author.tag}** are bank heisting you in **${message.guild?.name}**`).catch(() => {})

    const filter = (mc: MessageComponentInteraction<CacheType>) => {
      const m = mc.message
      return m.content.toLowerCase() == 'heist' && !participantIds.includes(m.author.id)
    }
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60 * 1000 })

    message.channel.send(`A heist has started for **${mentionedUser.tag}**`)
    message.channel.send('Type \`HEIST\` to join the heist!')

    collector.on('collect', mc => {
      const m = mc.message as Message<boolean>
      participantIds.push(m.author.id)
      participantUsers.push(m.author as User)

      m.react('💵')
    })

    collector.on('end', collected => {
      if (participantUsers.length < 3) {
        message.channel.send('There must be at least 3 users participating in the bank heist.')
        return
      }

      let success = random(1, 12 - participantUsers.length)

      message.channel.send('Times up! The heist begins.')

      let messages: string[] = []
      let rewardedUsers: User[] = []
      let finedUsers: User[] = []

      if (success == 1) {
        participantUsers.forEach(user => {
          let fineChance = random(1, 4)

          if (fineChance == 1) {
            finedUsers.push(user)
          } else {
            rewardedUsers.push(user)
          }
        })
      } else {
        participantUsers.forEach(u => finedUsers.push(u))
      }

      let rewardSplitAmount = Math.floor(stolenAmount / rewardedUsers.length)
      let totalStolen = rewardSplitAmount * rewardedUsers.length
      let fines = 0

      subtractBankBalance(targetUserId, totalStolen)

      rewardedUsers.forEach(user => {
        messages.push(`+ ${user.tag} stole ${rewardSplitAmount} JACKBUX`)
        addBalance(user.id, rewardSplitAmount)
      })

      finedUsers.forEach(user => {
        let bal = getBalance(user.id)

        if (bal > requiredAmount) {
          let fine = random(Math.floor(bal / 3), Math.floor(bal / 1.5))

          if (fine < requiredAmount) {
            fines += requiredAmount
            messages.push(`- ${user.tag} was caught and fined ${requiredAmount}`)
            subtractBalance(user.id, requiredAmount)
          } else {
            fines += fine
            messages.push(`- ${user.tag} was caught and fined ${fine}`)
            subtractBalance(user.id, fine)
          }
        } else {
          fines += bal
          messages.push(`- ${user.tag} was caught and fined ${bal}`)
          subtractBalance(user.id, bal)
        }
      })

      addBalance(targetUserId, fines)

      message.channel.send(messages.join('\n'))

      unlockBank(targetUserId)

      let targetUser = mentionedUser as User
      targetUser.send(`**${participantUsers.map(u => u.tag).join('**, **')}** are bank heisting you in **${message.guild?.name}**`).catch(() => {})
      targetUser.send(`**${rewardedUsers.map(u => u.tag).join('**, **')}** have stolen a combined total of \`${totalStolen}\` ${jackbuxEmoji}`).catch(() => {})
      targetUser.send(`**${finedUsers.map(u => u.tag).join('**, **')}** have paid fines with a combined total of \`${fines}\` ${jackbuxEmoji}`).catch(() => {})
    })
  },
  interaction: async (client, interaction) => {
    return
  },
  slashCommand: new SlashCommandBuilder()
    .setName('heist')
    .setDescription('Bank heist a person'),
})
