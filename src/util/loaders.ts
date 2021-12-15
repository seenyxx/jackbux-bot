import betterLogging from 'better-logging'
import { Client } from 'discord.js'
import { readdirSync } from 'fs'

import { CommandProps } from './commands'
import { BotEvent } from './events'

betterLogging(console)

const commands = './build/commands'
const events = './build/events'

export function loadCommands(subDir?: string) {
  readdirSync(`${commands}${subDir ? `/${subDir}` : ''}`).forEach(async (file) => {
    if (file.endsWith('.js')) {
      console.info(`⚙️ Loading command from ${file}`)
      let commandFile = await import(`../commands${subDir ? `/${subDir}` : ''}/${file}`)
      let commandProps: CommandProps = commandFile.default
    } else if (!file.endsWith('.js') && file.indexOf('.') == -1) {
      loadCommands(file)
    }
  })
}

export function loadEvents(client: Client, subDir?: string) {
  readdirSync(`${events}${subDir ? `/${subDir}` : ''}`).forEach(async (file) => {
    if (file.endsWith('.js')) {
      console.info(`🔔 Loading event from ${file}`)
      let eventFile = await import(`../events${subDir ? `/${subDir}` : ''}/${file}`)
      let eventProps: BotEvent<any> = eventFile.default

      console.info(`🔔 Loaded event -> ${eventProps.event}`)
      client.on(eventProps.event, eventProps.run)
    } else if (!file.endsWith('.js') && file.indexOf('.') == -1) {
      loadEvents(client, file)
    }
  })
}
