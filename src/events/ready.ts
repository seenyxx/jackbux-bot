import { defEvent } from '../util/events'

export default defEvent('ready', () => {
  console.log('Shard Ready!')
})
