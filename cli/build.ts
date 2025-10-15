import { colors } from '@cliffy/ansi/colors'
import { denoPlugins } from '@luca/esbuild-deno-loader'
import { resolve } from '@std/path'
import esbuild from 'esbuild'
import { logError, logInfo, logSuccess, logWarning } from './ui.ts'
import type { CivilityConfig } from './config.ts'

export interface BuildConfig {
  configPath: string
  config: Record<string, unknown>
  buildOptions: esbuild.BuildOptions
  civilityConfig: CivilityConfig & { entryPoints: string[] }
}

export async function createBuildConfig(
  civilityConfig: CivilityConfig & { entryPoints: string[] },
): Promise<BuildConfig> {
  const configPath = resolve('./deno.json')
  const config = JSON.parse(await Deno.readTextFile(configPath))

  const buildOptions: esbuild.BuildOptions = {
    entryPoints: civilityConfig.entryPoints,
    outdir: civilityConfig.outdir,
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

  return { configPath, config, buildOptions, civilityConfig }
}

export async function buildOnce(
  buildOptions: esbuild.BuildOptions,
): Promise<void> {
  try {
    const start = performance.now()
    await esbuild.build(buildOptions)
    const duration = Math.round(performance.now() - start)

    logSuccess(`Build completed in ${colors.bold(duration + 'ms')}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    logError(`Build failed:\n${message}`)
    throw error
  } finally {
    esbuild.stop()
  }
}

export async function buildWatch(
  buildOptions: esbuild.BuildOptions,
): Promise<esbuild.BuildContext> {
  try {
    const buildWithCallback: esbuild.BuildOptions = {
      ...buildOptions,
      plugins: [
        ...(buildOptions.plugins || []),
        {
          name: 'build-feedback',
          setup(build: esbuild.PluginBuild) {
            let isFirstBuild = true
            build.onStart(() => {
              if (!isFirstBuild) logInfo('Rebuilding...')
            })
            build.onEnd(({ errors, warnings }: esbuild.BuildResult) => {
              if (errors.length > 0) {
                logError(`Build failed with ${errors.length} error(s)`)
              } else if (warnings.length > 0) {
                logWarning(`Build completed with ${warnings.length} warning(s)`)
              } else {
                logSuccess(
                  isFirstBuild
                    ? 'Initial build completed'
                    : 'Rebuild completed',
                )
              }

              if (isFirstBuild) {
                isFirstBuild = false
                logInfo('Watching for changes...')
              }
            })
          },
        },
      ],
    }

    const ctx = await esbuild.context(buildWithCallback)
    await ctx.watch()
    return ctx
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    logError(`Watch setup failed:\n${msg}`)
    throw error
  }
}
