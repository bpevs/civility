#!/usr/bin/env -S deno run -A
import { denoPlugins } from '@luca/esbuild-deno-loader'
import { ensureDir } from '@std/fs'
import { join, resolve } from '@std/path'
import * as esbuild from 'esbuild'

await ensureDir('./dist')

const configPath = resolve('./deno.json')
const config = JSON.parse(await Deno.readTextFile(configPath))

const options: esbuild.BuildOptions = {
  entryPoints: [
    './app/index.ts',
    './app/worker.ts',
  ],
  outdir: './dist',
  bundle: true,
  format: 'esm' as esbuild.Format,
  platform: 'browser',
  plugins: denoPlugins({ configPath }) as esbuild.Plugin[],
  sourcemap: true,
  treeShaking: true,
  banner: {
    js: `// Generated on ${new Date().toISOString()}
globalThis.__APP_VERSION__ = "${config.version}";`,
  },
}

if (Deno.args[0] === 'build') {
  await esbuild.build(options)
  esbuild.stop()
} else if (Deno.args[0] === 'dev') {
  const ctx = await esbuild.context(options)
  await ctx.watch()
  console.log('watching...')
} else if (Deno.args[0] === 'icons') {
  const sourceIcon = 'static/brand/icon.png'
  const distDir = 'dist/icons'

  await ensureDir(distDir)

  const sizes = [
    { size: 128, output: '128x128.png' },
    { size: 256, output: '256x256.png' },
    { size: 512, output: '512x512.png' },
    { size: 1024, output: 'icon.png' },
  ]

  console.log('Building icons from', sourceIcon)

  for (const { size, output } of sizes) {
    const outputPath = join(distDir, output)
    const cmd = new Deno.Command('magick', {
      args: [sourceIcon, '-resize', `${size}x${size}`, outputPath],
    })

    const { code, stderr } = await cmd.output()

    if (code !== 0) {
      console.error(
        `Failed to create ${output}:`,
        new TextDecoder().decode(stderr),
      )
      Deno.exit(1)
    }

    console.log(`✓ Created ${output}`)
  }

  const icoPath = join(distDir, 'icon.ico')
  const icoCmd = new Deno.Command('magick', {
    args: [
      sourceIcon,
      '-define',
      'icon:auto-resize=256,128,64,48,32,16',
      icoPath,
    ],
  })

  const { code: icoCode, stderr: icoStderr } = await icoCmd.output()

  if (icoCode !== 0) {
    console.error(
      'Failed to create icon.ico:',
      new TextDecoder().decode(icoStderr),
    )
    Deno.exit(1)
  }

  console.log('✓ Created icon.ico')
  console.log('\nAll icons built successfully!')
} else {
  console.log('Commands:')
  console.log('  civility build - builds app')
  console.log('  civility dev - builds and watches app')
  console.log('  civility icons - builds icon files')
}
