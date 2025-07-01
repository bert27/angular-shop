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
export function generateProductRoutes(mode: 'withCategory' | 'withoutCategory' | 'all' = 'all'): Promise<Record<string, string>[]> {
  const routesBase = productsData.map((product) => {
    const normalizedTitle = product.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const normalizedCategory = product.category
      ? product.category
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '')
      : '';

    return {
      title: normalizedTitle,
      category: normalizedCategory,
    };
  });

  const routesWithoutCategory = routesBase.map((r) => ({
    title: r.title,
  }));

  const routesWithCategory = routesBase.map((r) => ({
    title: r.title,
    category: r.category,
  }));

  let finalRoutes: Record<string, string>[] = [];
  switch (mode) {
    case 'withoutCategory':
      finalRoutes = routesWithoutCategory;
      break;
    case 'withCategory':
      finalRoutes = routesWithCategory;
      break;
    default: // 'all'
      finalRoutes = [...routesWithoutCategory, ...routesWithCategory];
      break;
  }

  return Promise.resolve(finalRoutes);
}

/**
 * Genera rutas dinámicas para artículos.
 */
export function generateArticleRoutes(): Promise<Record<string, string>[]> {
  const routes = articlesBlog.map((article) => ({
    title: article.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''),
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
