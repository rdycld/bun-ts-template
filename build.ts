export async function build() {
  return await Bun.build({
    entrypoints: ['scripts/index.ts'],
    outdir: 'dist',
    loader: {
      '.ts': 'ts',
    },
  });
}
