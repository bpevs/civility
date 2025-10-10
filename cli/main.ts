#!/usr/bin/env -S deno run -A
import { Command } from 'jsr:@cliffy/command@1.0.0-rc.7'
import { ensureDir } from 'jsr:@std/fs@^1.0.19'

import { buildOnce, buildWatch, createBuildConfig } from './build.ts'

import { Icons } from './commands/icons.ts'
import { Start } from './commands/start.ts'

await ensureDir('./dist')

const { buildOptions } = await createBuildConfig()

await new Command()
  .name('civility')
  .version('0.3.1')
  .description('Command line versions of Simple Tools')
  .option('-w, --watch', 'Rebuild on changes')
  .action(async (options) => {
    if (options.watch) {
      await buildWatch(buildOptions)
    } else {
      await buildOnce(buildOptions)
    }
  })
  .command('icons', Icons)
  .command('start', Start)
  .parse(Deno.args)
