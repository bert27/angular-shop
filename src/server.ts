import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexShop } from '../server/shop/index-shop';
import * as dotenv from 'dotenv';
import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';

// Importa utilidades para generar rutas dinámicas y estáticas
import { serverRoutes } from './app.routes.server';
import { generateStaticRoutes, generateProductRoutes, generateArticleRoutes } from './utils';

dotenv.config();

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware JSON
app.use(express.json());

// Middleware personalizado
app.use('/', indexShop());
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

const generateSitemapRoutes = async (): Promise<Array<{ url: string; changefreq: string; priority: number }>> => {
  const staticRoutes = generateStaticRoutes(serverRoutes).map((route) => {
    const isHome = route.url === '/';
    return {
      ...route,
      changefreq: 'weekly',
      priority: isHome ? 1.0 : 0.7,
    };
  });

  const productRoutes = (await generateProductRoutes()).map((route) => ({
    url: `/producto/${route['title']}/${route['tipo']}`,
    changefreq: 'weekly',
    priority: 0.9,
  }));

  const articleRoutes = (await generateArticleRoutes()).map((route) => ({
    url: `/articulo/${route['title']}`,
    changefreq: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
};
app.get('/sitemap.xml', async (req, res, next) => {
  try {
    const hostname = req.protocol + '://' + req.get('host');
    const sitemapRoutes = await generateSitemapRoutes();

    const sitemap = new SitemapStream({ hostname });
    sitemapRoutes.forEach((route) => sitemap.write(route));
    sitemap.end();

    const sitemapData = await streamToPromise(sitemap);
    const sitemapPath = join(browserDistFolder, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapData);

    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemapData.toString());
  } catch (err) {
    next(err);
  }
});

// Ruta de prueba
app.get('/test', (req, res) => {
  res.send('hola3');
});

// Manejador de rutas para Angular
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Iniciar el servidor si este módulo es el punto de entrada principal.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Exportar el manejador de solicitudes utilizado por Angular CLI.
 */
export const reqHandler = createNodeRequestHandler(app);
