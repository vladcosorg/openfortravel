// eslint-disable-next-line import/no-unused-modules
import { promises as fs, rmdirSync } from 'node:fs'
import path from 'node:path'

import globby from 'globby'
import sharp from 'sharp'

const rootDirPath = path.resolve('./')
const sourceDirPath = path.dirname(
  require.resolve('svg-country-flags/package.json'),
)
const destinationDirPath = path.join(rootDirPath, 'public/flags')
function getSmallestBufferExt(
  bufferCollection: Record<'svg' | 'webp', Buffer>,
): 'svg' | 'webp' {
  return (
    Object.keys(bufferCollection) as Array<
      keyof typeof bufferCollection
      // eslint-disable-next-line unicorn/no-reduce
    >
  ).reduce((savedKey, currentKey) =>
    bufferCollection[savedKey].byteLength >
    bufferCollection[currentKey].byteLength
      ? currentKey
      : savedKey,
  )
}

async function build() {
  const sourceFilePaths = await globby('*.svg', {
    cwd: path.join(sourceDirPath, 'svg'),
    absolute: true,
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rmdirSync(destinationDirPath, { recursive: true })
  const destinationDir1xPath = path.join(destinationDirPath, '1x')
  const destinationDir2xPath = path.join(destinationDirPath, '2x')
  const destinationDirSvgPath = path.join(destinationDirPath, 'svg')
  const destinationDirBlurryPath = path.join(destinationDirPath, 'blurry')

  await fs.mkdir(destinationDir1xPath, { recursive: true })
  await fs.mkdir(destinationDir2xPath, { recursive: true })
  await fs.mkdir(destinationDirSvgPath, { recursive: true })
  await fs.mkdir(destinationDirBlurryPath, { recursive: true })

  for (const sourceFilePath of sourceFilePaths) {
    const fileBasename = path.basename(
      sourceFilePath,
      path.extname(sourceFilePath),
    )

    const svgBuffer = await fs.readFile(sourceFilePath)
    const bufferCollection1x = {
      svg: svgBuffer,
      webp: await sharp(
        path.join(sourceDirPath, 'png100px', `${fileBasename}.png`),
      )
        .resize(undefined, 40)
        .webp({ reductionEffort: 6 })
        .toBuffer(),
    }

    const bufferCollection2x = {
      svg: svgBuffer,
      webp: await sharp(
        path.join(sourceDirPath, 'png100px', `${fileBasename}.png`),
      )
        .resize(undefined, 80)
        .webp({ reductionEffort: 6 })
        .toBuffer(),
    }

    let ext = getSmallestBufferExt(bufferCollection1x)
    await fs.writeFile(
      path.join(destinationDir1xPath, `${fileBasename}.${ext}`),
      bufferCollection1x[ext],
    )
    ext = getSmallestBufferExt(bufferCollection2x)
    await fs.writeFile(
      path.join(destinationDir2xPath, `${fileBasename}.${ext}`),
      bufferCollection2x[ext],
    )

    await fs.writeFile(
      path.join(destinationDirBlurryPath, `${fileBasename}.webp`),
      await sharp(path.join(sourceDirPath, 'png100px', `${fileBasename}.png`))
        .resize({ width: 32, height: 32, fit: 'outside' })
        .blur(10)
        .webp({
          quality: 1,
          alphaQuality: 0,
          reductionEffort: 6,
        })
        .toBuffer(),
    )

    await fs.writeFile(
      path.join(destinationDirSvgPath, `${fileBasename}.svg`),
      svgBuffer,
    )

    // eslint-disable-next-line no-console
    console.log(`Wrote file ${sourceFilePath}`)
  }
}

build().catch((error) =>
  // eslint-disable-next-line no-console
  console.log(error),
)
