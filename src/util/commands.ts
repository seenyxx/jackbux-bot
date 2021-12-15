import { Client, Interaction, Message, PermissionString } from 'discord.js'

export interface CommandProps {
  name: string
  description: string
  usage: string
  cooldown: number
  permissions: {
    channel: PermissionString[]
    member: PermissionString[]
    bot: PermissionString[]
  }
  aliases?: string[]
  category?: string[]

  run: CommandFunction
  interaction: CommandInteraction
}

export type CommandFunction = (client: Client, message: Message, args?: string[]) => Promise<any>
export type CommandInteraction = (
  client: Client,
  interaction: Interaction,
  args?: string[]
) => Promise<any>

export function defCommand(props: CommandProps): CommandProps {
  return props
}
