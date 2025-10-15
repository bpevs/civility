#!/usr/bin/env -S deno run -A
import { Command } from '@cliffy/command'
import { ensureDir } from '@std/fs'
import { buildOnce, buildWatch, createBuildConfig } from './build.ts'
import { createDefaultConfig, loadConfig, resolvePaths } from './config.ts'
import { logError, logInfo, logSuccess, theme } from './ui.ts'
import { Icons } from './commands/icons.ts'
import { Start } from './commands/start.ts'
import { Init } from './commands/init.ts'

// Load configuration
const config = resolvePaths(await loadConfig())
await ensureDir(config.outdir)

const BuildCommand = new Command()
  .name('build')
  .description('Build the application')
  .option('-w, --watch', 'Rebuild on changes (watch mode)')
  .option('--outdir <outdir>', 'Output directory for build files')
  .action(async (options) => {
    try {
      // Load configuration with CLI option overrides
      let buildConfig = await loadConfig()

      // Apply CLI option overrides
      if (options.outdir) {
        buildConfig = { ...buildConfig, outdir: options.outdir }
      }

      const resolvedConfig = resolvePaths(buildConfig)
      await ensureDir(resolvedConfig.outdir)

      logInfo(
        `Entry points: ${theme.bold(resolvedConfig.entryPoints.join(', '))}`,
      )
      logInfo(`Output directory: ${theme.bold(resolvedConfig.outdir)}`)

      const { buildOptions } = await createBuildConfig(resolvedConfig)

      if (options.watch) {
        logInfo('Starting build in watch mode...')
        const ctx = await buildWatch(buildOptions)

        const cleanup = async () => {
          logInfo('Stopping build watch...')
          await ctx.dispose()
          logSuccess('Build watch stopped')
          Deno.exit(0)
        }

        Deno.addSignalListener('SIGINT', cleanup)
        Deno.addSignalListener('SIGTERM', cleanup)

        await new Promise(() => {})
      } else {
        logInfo('Building application...')
        await buildOnce(buildOptions)
        logSuccess('Build completed successfully')
      }
    } catch (error) {
      logError(
        `Build failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      Deno.exit(1)
    }
  })

const ConfigInitCommand = new Command()
  .name('init-config')
  .description('Create a default civility.json configuration file')
  .action(async () => {
    await createDefaultConfig()
  })

await new Command()
  .name('civility')
  .version('0.3.1')
  .description(theme.primary('CLI for building PWA'))
  .option('-w, --watch', 'Rebuild on changes (watch mode)')
  .option('--outdir <outdir>', 'Output directory for build files')
  .action(async (options) => {
    try {
      // Load configuration with CLI option overrides
      let buildConfig = await loadConfig()

      // Apply CLI option overrides
      if (options.outdir) {
        buildConfig = { ...buildConfig, outdir: options.outdir }
      }

      const resolvedConfig = resolvePaths(buildConfig)
      await ensureDir(resolvedConfig.outdir)

      logInfo(
        `Entry points: ${theme.bold(resolvedConfig.entryPoints.join(', '))}`,
      )
      logInfo(`Output directory: ${theme.bold(resolvedConfig.outdir)}`)

      const { buildOptions } = await createBuildConfig(resolvedConfig)

      if (options.watch) {
        logInfo('Starting build in watch mode...')
        const ctx = await buildWatch(buildOptions)

        const cleanup = async () => {
          logInfo('Stopping build watch...')
          await ctx.dispose()
          logSuccess('Build watch stopped')
          Deno.exit(0)
        }

        Deno.addSignalListener('SIGINT', cleanup)
        Deno.addSignalListener('SIGTERM', cleanup)

        await new Promise(() => {})
      } else {
        logInfo('Building application...')
        await buildOnce(buildOptions)
        logSuccess('Build completed successfully')
      }
    } catch (error) {
      logError(
        `Build failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      Deno.exit(1)
    }
  })
  .command('build', BuildCommand)
  .command('icons', Icons)
  .command('start', Start)
  .command('init', Init)
  .command('init-config', ConfigInitCommand)
  .parse(Deno.args)
