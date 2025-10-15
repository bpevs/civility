import { resolve } from '@std/path'
import { exists } from '@std/fs'

export interface CivilityIcon {
  /** Source icon file path */
  source: string
  /** Output directory for generated icons */
  output: string
}

export interface CivilityConfig {
  /** Root directory for the app */
  root: string
  /** Output directory for build files */
  outdir: string
  /** Icon configuration */
  icon: CivilityIcon
  /** Static files directory (for serving) */
  static?: string
}

const DEFAULT_CONFIG: CivilityConfig = {
  root: './src',
  outdir: './src/dist',
  icon: {
    source: './src/static/icon.png',
    output: './src/dist/icons',
  },
}

/**
 * Load configuration from civility.json if it exists, otherwise return defaults
 */
export async function loadConfig(): Promise<CivilityConfig> {
  const configPath = resolve('./civility.json')

  if (await exists(configPath)) {
    try {
      const configText = await Deno.readTextFile(configPath)
      const userConfig = JSON.parse(configText)

      // Merge user config with defaults
      const config: CivilityConfig = {
        root: userConfig.root || DEFAULT_CONFIG.root,
        outdir: userConfig.outdir || DEFAULT_CONFIG.outdir,
        icon: {
          source: userConfig.icon?.source || DEFAULT_CONFIG.icon.source,
          output: userConfig.icon?.output || DEFAULT_CONFIG.icon.output,
        },
        static: userConfig.static,
      }

      return config
    } catch (error) {
      console.warn(
        `Failed to parse civility.json: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      console.warn('Using default configuration')
      return DEFAULT_CONFIG
    }
  }

  return DEFAULT_CONFIG
}

/**
 * Resolve paths relative to current working directory and generate entry points
 */
export function resolvePaths(
  config: CivilityConfig,
): CivilityConfig & { entryPoints: string[] } {
  const resolvedRoot = resolve(config.root)

  return {
    ...config,
    root: resolvedRoot,
    entryPoints: [
      resolve(resolvedRoot, 'index.ts'),
      resolve(resolvedRoot, 'worker.ts'),
    ],
    outdir: resolve(config.outdir),
    icon: {
      source: resolve(config.icon.source),
      output: resolve(config.icon.output),
    },
    static: config.static ? resolve(config.static) : undefined,
  }
}

/**
 * Create a default civility.json file
 */
export async function createDefaultConfig(): Promise<void> {
  const configPath = resolve('./civility.json')

  if (await exists(configPath)) {
    console.warn('civility.json already exists')
    return
  }

  const defaultConfigForFile = {
    root: './src',
    outdir: './src/dist',
    icon: {
      source: './src/static/icon.png',
      output: './src/dist/icons',
    },
  }

  await Deno.writeTextFile(
    configPath,
    JSON.stringify(defaultConfigForFile, null, 2),
  )

  console.log('Created civility.json with default configuration')
}
