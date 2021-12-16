import { defEvent } from '../util/events'
import { handleSlashCommand } from '../util/handlers'

export default defEvent('interactionCreate', async (client, interaction) => {
  handleSlashCommand(client, interaction)
})
