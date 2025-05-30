import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import atImport from 'postcss-import'
import { ensureDir } from '@std/fs'

console.log('Building CSS files...')

await transformCSS({
  inputPath: './src/civility.css',
  outputPath: './dist/civility.css',
  from: './src/index.css',
})
console.log('Built: civility.css')

await transformCSS({
  inputPath: './src/utilities.css',
  outputPath: './dist/utilities.css',
  from: './src/utilities.css',
})
console.log('Built: utilities.css')

for await (const dirEntry of Deno.readDir('./src/themes')) {
  if (dirEntry.isFile && dirEntry.name.endsWith('.css')) {
    await transformCSS({
      inputPath: `./src/themes/${dirEntry.name}`,
      outputPath: `./dist/themes/${dirEntry.name}`,
      from: `./src/themes/${dirEntry.name}`,
    })
    console.log(`Built theme: ${dirEntry.name.replace('.css', '')}`)
  }
}

console.log('Build complete!')

async function transformCSS(
  { inputPath, outputPath, from }: {
    inputPath: string
    outputPath: string
    from?: string
  },
): Promise<void> {
  const text = Deno.readTextFileSync(inputPath)
  await ensureDir(outputPath.substring(0, outputPath.lastIndexOf('/')))

  const { css, map } = await postcss([atImport(), autoprefixer])
    .process(text, { from: from || inputPath, to: outputPath })

  Deno.writeTextFileSync(outputPath, css)
  if (map) Deno.writeTextFileSync(`${outputPath}.map`, map.toString())
}
