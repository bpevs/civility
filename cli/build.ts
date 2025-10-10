import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@^0.11.1'
import { resolve } from 'jsr:@std/path@^1.1.2'
import * as esbuild from 'npm:esbuild@^0.25.10'

export interface BuildConfig {
  configPath: string
  config: any
  buildOptions: esbuild.BuildOptions
}

export async function createBuildConfig(): Promise<BuildConfig> {
  const configPath = resolve('./deno.json')
  const config = JSON.parse(await Deno.readTextFile(configPath))

  const buildOptions: esbuild.BuildOptions = {
    entryPoints: ['./app/index.ts', './app/worker.ts'],
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

  return { configPath, config, buildOptions }
}

export async function buildOnce(
  buildOptions: esbuild.BuildOptions,
): Promise<void> {
  await esbuild.build(buildOptions)
  esbuild.stop()
}

export async function buildWatch(
  buildOptions: esbuild.BuildOptions,
): Promise<esbuild.BuildContext> {
  const ctx = await esbuild.context(buildOptions)
  await ctx.watch()
  console.log('esbuild watching for changes...')
  return ctx
}
