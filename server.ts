import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { SitemapStream, streamToPromise } from 'sitemap';
import * as fs from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get(
    '**',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: 'index.html',
    })
  );

  // Generate and serve sitemap.xml
  server.get('/sitemap.xml', (req, res, next) => {
    try {
      const hostname = req.protocol + '://' + req.get('host');
      const sitemapRoutes = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/productos', changefreq: 'weekly', priority: 0.8 },
        { url: '/blog', changefreq: 'weekly', priority: 0.8 },
        { url: '/terminosyCondiciones', changefreq: 'monthly', priority: 0.5 },
      ];

      const sitemap = new SitemapStream({ hostname });
      sitemapRoutes.forEach((route) => sitemap.write(route));
      sitemap.end();

      streamToPromise(sitemap)
        .then((data) => {
          fs.writeFileSync(join(browserDistFolder, 'sitemap.xml'), data);
          res.setHeader('Content-Type', 'application/xml');
          res.send(data.toString());
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
    console.log(`Sitemap available at http://localhost:${port}/sitemap.xml`);
  });
}

run();

