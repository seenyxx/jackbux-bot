import { createCanvas, loadImage } from 'canvas'
import { writeFileSync } from 'fs'

export function watermarkImage(path: string, resultPath: string) {
  loadImage(path).then((image) => {
    const canvas = createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')

    // Paste the actual image
    ctx.drawImage(image, 0, 0, image.width, image.height)

    ctx.font = '32px sans-serif'
    ctx.fillStyle = '#FFFFFF'
    // let textMeasure = ctx.measureText('IMAGE PREVIEW')

    ctx.fillText('IMAGE PREVIEW', 10, 32)

    const buffer = canvas.toBuffer('image/png')

    writeFileSync(resultPath, buffer)
  })
}
