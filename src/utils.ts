import { productsData } from './data/products-data';
import { articlesBlog } from './data/data';
import { ServerRoute } from '@angular/ssr';

/**
 * Normaliza cadenas para usarlas en URLs.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Genera rutas dinámicas para productos.
 */
export function generateProductRoutes(): Promise<Record<string, string>[]> {
  const routes = productsData.flatMap((product) =>
    product.options.map((option) => ({
      title: product.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''), // Normalizar título
      tipo: option.tipo.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''), // Normalizar tipo
    })),
  );

  // Asegúrate de que todas las propiedades sean cadenas
  return Promise.resolve(
    routes.map((route) => ({
      title: route.title,
      tipo: route.tipo,
    })),
  );
}

/**
 * Genera rutas dinámicas para artículos.
 */
export function generateArticleRoutes(): Promise<Record<string, string>[]> {
  const routes = articlesBlog.map((article) => ({
    title: article.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''), // Normalizar título
  }));

  return Promise.resolve(
    routes.map((route) => ({
      title: route.title,
    })),
  );
}

/**
 * Genera rutas estáticas desde `serverRoutes`.
 */
export function generateStaticRoutes(serverRoutes: Array<ServerRoute>): Array<{ url: string; changefreq: string; priority: number }> {
  return serverRoutes
    .filter((route) => !('getPrerenderParams' in route)) // Filtrar rutas estáticas
    .map((route) => ({
      url: `/${route.path}`,
      changefreq: 'weekly',
      priority: 0.7,
    }));
}
