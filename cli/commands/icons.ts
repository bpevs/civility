import { Command } from '@cliffy/command'
import { ensureDir } from '@std/fs'
import { join } from '@std/path'
import { formatFileSize, logError, logInfo, logSuccess, theme } from '../ui.ts'
import { loadConfig, resolvePaths } from '../config.ts'

export const Icons = new Command()
  .description('Build icons files from source. Requires Imagemagick')
  .option('-s, --source <source>', 'Source icon file')
  .option('-o, --output <output>', 'Output directory')
  .action(async (options) => {
    // Load configuration with CLI option overrides
    let config = await loadConfig()

    // Apply CLI option overrides
    if (options.source) {
      config = { ...config, icon: { ...config.icon, source: options.source } }
    }
    if (options.output) {
      config = { ...config, icon: { ...config.icon, output: options.output } }
    }

    // Resolve paths
    const resolvedConfig = resolvePaths(config)
    const { source: sourceIcon, output: distDir } = resolvedConfig.icon
    try {
      const stat = await Deno.stat(sourceIcon)
      if (!stat.isFile) {
        logError(`Source is not a file: ${sourceIcon}`)
        Deno.exit(1)
      }
      logInfo(
        `Source: ${theme.bold(sourceIcon)} (${formatFileSize(stat.size)})`,
      )
    } catch (_error) {
      logError(`Source file not found: ${sourceIcon}`)
      logError(
        `Please ensure the source file exists or specify a different path with --source`,
      )
      Deno.exit(1)
    }

    try {
      const testCmd = new Deno.Command('magick', { args: ['-version'] })
      const { code } = await testCmd.output()
      if (code !== 0) throw new Error('ImageMagick not available')
    } catch (_error) {
      logError('ImageMagick is required but not found in PATH')
      logError(
        'Please install ImageMagick: https://imagemagick.org/script/download.php',
      )
      Deno.exit(1)
    }

    await ensureDir(distDir)
    logInfo(`Output directory: ${theme.bold(distDir)}`)

    const sizes = [
      { size: 128, output: '128x128.png', description: 'Small icon' },
      { size: 256, output: '256x256.png', description: 'Medium icon' },
      { size: 512, output: '512x512.png', description: 'Large icon' },
      { size: 1024, output: 'icon.png', description: 'High-res icon' },
    ]

    console.log()
    const createdFiles = []

    for (const { size, output, description } of sizes) {
      const outputPath = join(distDir, output)

      try {
        const cmd = new Deno.Command('magick', {
          args: [sourceIcon, '-resize', `${size}x${size}`, outputPath],
        })

        const { code, stderr } = await cmd.output()

        if (code !== 0) {
          logError(`Failed to create ${output}`)
          logError(new TextDecoder().decode(stderr))
          Deno.exit(1)
        }

        // Get file size for reporting
        const stat = await Deno.stat(outputPath)

        logSuccess(`${output} - ${description} (${formatFileSize(stat.size)})`)
        createdFiles.push({
          name: output,
          size: stat.size,
          dimensions: `${size}x${size}`,
        })
      } catch (error) {
        logError(
          `Failed to create ${output}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        )
        Deno.exit(1)
      }
    }

    const icoPath = join(distDir, 'icon.ico')

    try {
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
        logError('Failed to create icon.ico')
        logError(new TextDecoder().decode(icoStderr))
        Deno.exit(1)
      }

      // Get ICO file size
      const icoStat = await Deno.stat(icoPath)

      logSuccess(`icon.ico - Windows icon (${formatFileSize(icoStat.size)})`)
      createdFiles.push({
        name: 'icon.ico',
        size: icoStat.size,
        dimensions: 'Multi-size',
      })
    } catch (error) {
      logError(
        `Failed to create icon.ico: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      Deno.exit(1)
    }

    const totalSize = createdFiles.reduce((sum, file) => sum + file.size, 0)
    console.log()
    console.log(
      `${theme.muted('Total size:')} ${theme.bold(formatFileSize(totalSize))}`,
    )
  })
