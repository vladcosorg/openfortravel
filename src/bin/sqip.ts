// eslint-disable-next-line import/no-unused-modules
import fs from 'fs'
import path from 'path'
import { cwd, env } from 'process'

import filesize from 'filesize'
import globby from 'globby'
import sharp from 'sharp'

const root = env.PWD || cwd()
const inDirPath = path.resolve(root)
const outDirPath = path.resolve(root, 'src/assets/sqip-flags')

function report(inPath: string, outPath: string): void {
  const rawInSize = fs.statSync(inPath).size
  const inPathSize = filesize(rawInSize)
  const inShortPath = inPath.replace(cwd(), '')

  const rawOutSize = fs.statSync(outPath).size
  const outPathSize = filesize(rawOutSize)
  const outShortPath = outPath.replace(cwd(), '')
  const savings = 100 - Math.round((rawOutSize * 100) / rawInSize)

  // eslint-disable-next-line no-console
  console.info(`Copied file from ${inShortPath} to ${outShortPath}`)
  // eslint-disable-next-line no-console
  console.log(
    `Compressed from ${inPathSize} to ${outPathSize} with savings of ${savings}% \n`,
  )
}

async function compile(pattern: string) {
  const paths = await globby(pattern, { cwd: inDirPath })
  paths.forEach((file) => {
    const inFilePath = path.join(inDirPath, file)

    const baseName = path.basename(file, path.extname(inFilePath))
    const outFilePath = path.join(outDirPath, `${baseName}.webp`)

    fs.mkdirSync(outDirPath, { recursive: true })
    sharp(inFilePath)
      .resize({ width: 32, height: 32, fit: 'outside' })
      .blur(7)
      .webp({
        quality: 1,
        alphaQuality: 0,
        reductionEffort: 1,
      })
      .toFile(outFilePath)
      .then(() => report(inFilePath, outFilePath))
  })
}

compile('node_modules/svg-country-flags/png100px/*.png').catch((error) =>
  // eslint-disable-next-line no-console
  console.log(error),
)
