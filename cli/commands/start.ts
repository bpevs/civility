import { colors } from '@cliffy/ansi/colors'
import { Command } from '@cliffy/command'
import { exists } from '@std/fs'
import { serveDir } from '@std/http/file-server'
import esbuild from 'esbuild'
import { buildWatch, createBuildConfig } from '../build.ts'
import {
  formatDuration,
  logError,
  logInfo,
  logSuccess,
  logWarning,
  table,
  theme,
} from '../ui.ts'

const noCache = 'no-cache, no-store, must-revalidate'

export const Start = new Command()
  .name('start')
  .description('Start development server with esbuild watch')
  .option('-p, --port <port:number>', 'Port to serve on', { default: 8000 })
  .option('--prod', 'Enable production mode (caching enabled)')
  .action(async (options) => {
    const { port, prod } = options
    const startTime = Date.now()
    const requestCount = { value: 0 }

    try {
      const { buildOptions } = await createBuildConfig()
      const ctx = await buildWatch(buildOptions)

      const handler = async (request: Request): Promise<Response> => {
        const url = new URL(request.url)
        const method = request.method
        const path = url.pathname
        requestCount.value++

        if (!prod) {
          const timestamp = new Date().toLocaleTimeString()
          console.log(
            `${theme.muted(timestamp)} ${theme.bold(method)} ${
              theme.primary(path)
            }`,
          )
        }

        try {
          const response = await serveDir(request, { quiet: true })

          if (response.status === 200) {
            const headers = new Headers(response.headers)
            if (!prod) {
              headers.set(
                'Cache-Control',
                'no-cache, no-store, must-revalidate',
              )
              headers.set('Pragma', 'no-cache')
              headers.set('Expires', '0')
            }
            return new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers,
            })
          }

          const has404 = await exists('./404.html')
          const hasIndex = await exists('./index.html')

          if (has404) {
            const content = await Deno.readTextFile('./404.html')
            const headers = new Headers({ 'Content-Type': 'text/html' })
            if (!prod) {
              headers.set('Cache-Control', noCache)
              headers.set('Pragma', 'no-cache')
              headers.set('Expires', '0')
            }

            if (!prod) logWarning(`404 served for ${path}`)

            return new Response(content, { status: 404, headers })
          } else if (hasIndex) {
            const content = await Deno.readTextFile('./index.html')
            const headers = new Headers({ 'Content-Type': 'text/html' })
            if (!prod) {
              headers.set('Cache-Control', noCache)
              headers.set('Pragma', 'no-cache')
              headers.set('Expires', '0')
            }

            if (!prod) logInfo(`Fallback to index.html for ${path}`)

            return new Response(content, { status: 404, headers })
          }

          logError(`No fallback available for ${path}`)
          return new Response('Not Found', { status: 404 })
        } catch (error) {
          logError(
            `Server error for ${path}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          )
          return new Response('Internal Server Error', { status: 500 })
        }
      }

      const server = Deno.serve({ port, hostname: '127.0.0.1' }, handler)
      console.log()
      logInfo('Press Ctrl+C to stop the server')

      if (!prod) {
        logInfo('Request logging enabled (disable with --prod)')
      }

      const cleanup = async () => {
        console.log() // Add space before shutdown message
        logWarning(`${colors.yellow('🛑')} Shutting down server...`)

        try {
          await ctx.dispose()
          esbuild.stop()
          await server.shutdown()

          const uptime = Date.now() - startTime
          const uptimeFormatted = formatDuration(uptime)

          console.log('Summary:')
          table({
            'Uptime': uptimeFormatted,
            'Requests served': requestCount.value,
            'Average per minute': requestCount.value > 0
              ? Math.round((requestCount.value / uptime) * 60000)
              : 0,
          })

          logSuccess('Server stopped gracefully')
          Deno.exit(0)
        } catch (error) {
          logError(
            `Error during shutdown: ${
              error instanceof Error ? error.message : String(error)
            }`,
          )
          Deno.exit(1)
        }
      }

      Deno.addSignalListener('SIGINT', cleanup)
      Deno.addSignalListener('SIGTERM', cleanup)

      await server.finished
    } catch (error) {
      logError(
        `Failed to start server: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      Deno.exit(1)
    }
  })
