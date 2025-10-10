import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7'
import { ensureDir } from 'jsr:@std/fs@^1.0.19'
import { join } from 'jsr:@std/path@^1.1.2'

export const Icons = new Command()
  .description('Build icons files from source. Requires Imagemagick')
  .action(async (_) => {
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
  })
