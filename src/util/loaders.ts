import betterLogging from 'better-logging'
import { readdir, readdirSync } from 'fs';
import { CommandProps } from './commands'
import { BotEvent } from './events'

betterLogging(console)

const commands = './build/commands'
const events = './build/events'

export function loadCommands(subDir?: string) {
  
  readdirSync(`${commands}${subDir ? `/${subDir}` : ''}`).forEach(async file => {
    if (file.endsWith('.js')) {
      console.info(`⚙️ Loading command from ${file}`)
      let commandFile = await import(`${commands}${subDir ? `/${subDir}` : ''}/${file}`)
      let commandProps: CommandProps = commandFile.default
    }
    else if (!file.endsWith('.js') && file.indexOf('.') == -1) {
      loadCommands(file)
    }
  })
}

export function loadEvents(subDir?: string) {
  
  readdirSync(`${events}${subDir ? `/${subDir}` : ''}`).forEach(async file => {
    if (file.endsWith('.js')) {
      console.info(`🔔 Loading event from ${file}`)
      let eventFile = await import(`${events}${subDir ? `/${subDir}` : ''}/${file}`)
      let eventProps: = eventFile.default
    }
    else if (!file.endsWith('.js') && file.indexOf('.') == -1) {
      loadEvents(file)
    }
  })
}
