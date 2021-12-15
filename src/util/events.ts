import { Awaitable, ClientEvents } from 'discord.js';

export interface BotEvent<K extends keyof ClientEvents> {
  event: K
  run: (...args: ClientEvents[K]) => Awaitable<void>
}

export function defEvent<K extends keyof ClientEvents>(event: K, run: (...args: ClientEvents[K]) => Awaitable<void>): BotEvent<K> {
  return {
    event: event,
    run: run
  }
}