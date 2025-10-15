import { Command } from '@cliffy/command'
import { ensureDir, exists, walk } from '@std/fs'
import { dirname, join, relative, resolve } from '@std/path'
import { logError, logInfo, logSuccess, theme } from '../ui.ts'

export const Init = new Command()
  .description('Create a new Civility project from template')
  .arguments('<directory:string>')
  .option('-n, --name <name:string>', 'Project name', { required: true })
  .option('-u, --url <url:string>', 'Project URL', { required: true })
  .action(async (options, directory: string) => {
    try {
      try {
        new URL(options.url)
      } catch {
        logError(`Invalid URL format: ${options.url}`)
        logError('Please provide a valid URL (e.g., https://example.com)')
        Deno.exit(1)
      }

      const targetDir = resolve(Deno.cwd(), directory)

      if (await exists(targetDir)) {
        logError(`Directory "${directory}" already exists`)
        Deno.exit(1)
      }

      const stubDir = decodeURI(new URL('../stub/', import.meta.url).pathname)

      if (!await exists(stubDir)) {
        logError(`Stub template not found at: ${stubDir}`)
        logError('The civility CLI installation may be corrupted.')
        Deno.exit(1)
      }

      const requiredFiles = [
        'src/index.html',
        'src/manifest.json',
        'deno.json',
        'README.md',
      ]

      for (const file of requiredFiles) {
        const filePath = join(stubDir, file)
        if (!await exists(filePath)) {
          logError(`Required template file missing: ${file}`)
          logError('The civility CLI installation may be corrupted.')
          Deno.exit(1)
        }
      }

      logInfo(`Creating new Civility project: ${theme.bold(directory)}`)
      logInfo(`Name: ${theme.bold(options.name)}`)
      logInfo(`URL: ${theme.bold(options.url)}`)
      console.log()

      await ensureDir(targetDir)

      const filesToProcess: string[] = []

      for await (const entry of walk(stubDir, { includeDirs: false })) {
        const relativePath = relative(stubDir, entry.path)
        const targetPath = join(targetDir, relativePath)
        await ensureDir(dirname(targetPath))
        await Deno.copyFile(entry.path, targetPath)
        if (shouldProcess(entry.path)) filesToProcess.push(targetPath)
      }

      for (const filePath of filesToProcess) {
        try {
          let content = await Deno.readTextFile(filePath)
          content = content
            .replaceAll('{{name}}', options.name)
            .replaceAll('{{url}}', options.url)

          await Deno.writeTextFile(filePath, content)
        } catch (error) {
          logError(
            `Failed to process ${filePath}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          )
        }
      }

      console.log()
      logSuccess(`✨ Project "${options.name}" created successfully!`)
      console.log()
      console.log(`${theme.muted('Next steps:')}`)
      console.log(`  ${theme.bold('cd')} ${directory}`)
      console.log(
        `  ${theme.bold('deno task init')}    ${
          theme.muted('# Generate icons')
        }`,
      )
      console.log(
        `  ${theme.bold('deno task dev')}     ${
          theme.muted('# Start development server')
        }`,
      )
      console.log()
    } catch (error) {
      logError(
        `Failed to create project: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      Deno.exit(1)
    }
  })

function shouldProcess(filePath: string): boolean {
  const textExtensions = ['.ts', '.tsx', '.html', '.json', '.md']
  const fileName = filePath.toLowerCase()
  return Boolean(textExtensions.some((ext) => fileName.endsWith(ext)))
}
