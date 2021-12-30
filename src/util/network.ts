import { createWriteStream } from 'fs'
import { get } from 'https'

export function download(url: string, name: string, cb: () => any) {
  const file = createWriteStream(name)

  get(url, (res) => {
    res.pipe(file)

    file.on('finish', () => file.close(cb))
  }).on('error', console.error)
}
