import { build, context } from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const watch = process.argv.includes('--watch');
const opts = {
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  loader: { '.json': 'json' },
  minify: !watch,
  sourcemap: watch,
  target: 'es2020',
  logLevel: 'info',
};
const copyPublic = () => cpSync('public', 'dist', { recursive: true });

if (watch) {
  mkdirSync('dist', { recursive: true });
  copyPublic();
  const ctx = await context({ ...opts, plugins: [{ name: 'copy', setup: (b) => b.onEnd(copyPublic) }] });
  await ctx.watch();
} else {
  rmSync('dist', { recursive: true, force: true });
  mkdirSync('dist', { recursive: true });
  copyPublic();
  await build(opts);
}
