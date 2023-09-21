import { build } from 'build';

Bun.serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/styles/style.css') {
      return new Response(
        Bun.file('./styles/styles.css', {
          type: 'text/css',
        }),
      );
    }
    if (url.pathname === '/dist/index.js') {
      return new Response(
        Bun.file('./dist/index.js', {
          type: 'text/javascript',
        }),
      );
    }

    await build();

    return new Response(Bun.file('./index.html'));
  },
});
