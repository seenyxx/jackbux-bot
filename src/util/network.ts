import { createWriteStream } from 'fs'
import { get } from 'https'

export function download(url: string, name: string) {
  const file = createWriteStream(name)

  get(url, (res) => {
    res.pipe(file)

    file.on('finish', () => file.close())
  }).on('error', console.error)
}
