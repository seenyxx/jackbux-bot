import betterLogging from 'better-logging'
import { Client, Intents } from 'discord.js'
import { loadEvents, loadCommands, registerSlashCommands } from './util/handlers'

betterLogging(console)

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

loadEvents(client)
loadCommands()

client.login(process.env.TOKEN)
