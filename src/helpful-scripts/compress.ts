import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { resolve, basename, extname } from 'node:path'

const sourceFiles = [
  'src/assets/green.jpg',
  'src/assets/green2.jpg',
  'src/assets/iot.jpg',
  'src/assets/citizenscience.jpg',
]

const outputDirectory = resolve('src/assets/optimised')

const optimiseImage = async (sourceFile: string): Promise<void> => {
  const fileName = basename(sourceFile, extname(sourceFile))
  const outputFile = resolve(outputDirectory, `${fileName}.webp`)

  await sharp(sourceFile)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(outputFile)
}

const run = async (): Promise<void> => {
  await mkdir(outputDirectory, { recursive: true })
  await Promise.all(sourceFiles.map(optimiseImage))
}

run().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})