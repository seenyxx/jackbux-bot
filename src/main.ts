import betterLogging from 'better-logging';
import { Client, Intents } from 'discord.js'

betterLogging(console)

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.on()

client.login(process.env.TOKEN)
