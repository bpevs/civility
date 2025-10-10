import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7'
import { serveDir } from 'jsr:@std/http@^1.0.13/file-server'
import { exists } from 'jsr:@std/fs@^1.0.19'
import * as esbuild from 'npm:esbuild@^0.25.10'

import { buildWatch, createBuildConfig } from '../build.ts'

export const Start = new Command()
  .name('start')
  .description('Start development server with esbuild watch')
  .option('-p, --port <port:number>', 'Port to serve on', { default: 8000 })
  .option('--prod', 'Enable production mode (caching enabled)')
  .action(async (options) => {
    const { port, prod } = options

    console.log(`Starting development server on port ${port}...`)

    const { buildOptions } = await createBuildConfig()
    const ctx = await buildWatch(buildOptions)
    const handler = async (request: Request): Promise<Response> => {
      try {
        const response = await serveDir(request, { fsRoot: './', quiet: true })

        if (response.status === 200) {
          const headers = new Headers(response.headers)
          if (!prod) {
            headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
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
            headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
            headers.set('Pragma', 'no-cache')
            headers.set('Expires', '0')
          }
          return new Response(content, { status: 404, headers })
        } else if (hasIndex) {
          const content = await Deno.readTextFile('./index.html')
          const headers = new Headers({ 'Content-Type': 'text/html' })
          if (!prod) {
            headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
            headers.set('Pragma', 'no-cache')
            headers.set('Expires', '0')
          }
          return new Response(content, { status: 404, headers })
        }

        return new Response('Not Found', { status: 404 })
      } catch (error) {
        console.error('Server error:', error)
        return new Response('Internal Server Error', { status: 500 })
      }
    }

    const server = Deno.serve({ port, hostname: '127.0.0.1' }, handler)

    console.log(`Server running at http://localhost:${port}`)
    console.log('Press Ctrl+C to stop')

    const cleanup = async () => {
      console.log('\nShutting down...')
      await ctx.dispose()
      esbuild.stop()
      await server.shutdown()
      Deno.exit(0)
    }

    Deno.addSignalListener('SIGINT', cleanup)
    Deno.addSignalListener('SIGTERM', cleanup)

    await server.finished
  })
