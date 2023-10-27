const rawHtml = await Bun.file('./index.html').text();

const stylesheetString = '<link href="styles/style.css" rel="stylesheet">';
const scriptString = '<script type="module" src="./esp32/index.js"></script>';

await Bun.build({
  entrypoints: ['scripts/index.ts'],
  outdir: 'esp32',
  loader: {
    '.ts': 'ts',
  },
  minify: true,
});

const js = await Bun.file('./esp32/index.js').text();

const espHtml = `
${rawHtml.replace(stylesheetString, '').replace(scriptString, `<scrip>${js}</script>`)}
`;

const htmlBuffer = Buffer.from(espHtml);
const htmlGzipped = Bun.gzipSync(htmlBuffer);

const output = `
#include <Arduino.h>
#define mainPageLen ${htmlGzipped.length}
const uint8_t mainPage[] PROGMEM = {${htmlGzipped.toString()}};`;

Bun.write('esp32/index.h', output);
