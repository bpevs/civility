#!/usr/bin/env -S deno run -A
import { Command, ensureDir } from './deps.ts'
import { buildOnce, buildWatch, createBuildConfig } from './build.ts'
import { logError, logInfo, logSuccess, theme } from './ui.ts'
import { Icons } from './commands/icons.ts'
import { Start } from './commands/start.ts'

await ensureDir('./dist')

const { buildOptions } = await createBuildConfig()

await new Command()
  .name('civility')
  .version('0.3.1')
  .description(theme.primary('CLI for building PWA'))
  .option('-w, --watch', 'Rebuild on changes (watch mode)')
  .action(async (options) => {
    try {
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
  .command('icons', Icons)
  .command('start', Start)
  .parse(Deno.args)
