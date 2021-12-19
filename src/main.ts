import { Client, Intents } from 'discord.js'

import { loadCommands, loadEvents } from './util/handlers'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

loadEvents(client)
loadCommands()

client.login(process.env.TOKEN)
