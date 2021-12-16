import { defEvent } from '../util/events'
import { handleMessageCommand } from '../util/handlers'

export default defEvent('messageCreate', async (client, message) => {
  handleMessageCommand(client, message)
})
