import betterLogging from 'better-logging'
import { Client, Intents } from 'discord.js'
import { loadEvents } from './util/loaders'

betterLogging(console)

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

loadEvents(client)

client.login(process.env.TOKEN)
