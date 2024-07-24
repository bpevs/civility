import { build, stop } from "https://deno.land/x/esbuild@v0.19.2/mod.js";
import { solidPlugin } from "npm:esbuild-plugin-solid";

import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.1/mod.ts";
import { resolve } from 'https://deno.land/std@0.198.0/path/mod.ts';

const importMapURL = new URL('file://' + resolve('./import_map.json'))

const [denoResolver, denoLoader] = [...denoPlugins({
  importMapURL,
  nodeModulesDir: true,
})];
const result = await build({
    entryPoints: ["./source/index.tsx"],
    outfile: "./public/index.js",
    bundle: true,
    format: "esm",
    treeShaking: true,
    minify: true,
    plugins: [
        denoResolver,
        solidPlugin({ solid: { moduleName: 'npm:solid-js/web' } }) as any,
        denoLoader
    ],
});

stop()


async function createOptions(srcPath) {
  const importMapURL = new URL('file://' + resolve('./import_map.json'))

  let inroConfig = {}
  try {
    const decoder = new TextDecoder('utf-8')
    const data = await Deno.readFile('./inro.json')
    inroConfig = JSON.parse(decoder.decode(data))
  } catch (e) {}

  return {
    plugins: [denoPlugin({ importMapURL })],
    entryPoints: [srcPath ? srcPath + "index.ts" : './src-www/index.tsx'],
    outfile: srcPath ? srcPath + "dist/main.js" : './src-www/dist/main.js',
    bundle: true,
    format: 'esm',
    target: ['chrome99', 'safari15'],
    treeShaking: true,
    jsx: 'automatic',
    jsxImportSource: 'preact',
    ...inroConfig,
  }
}
