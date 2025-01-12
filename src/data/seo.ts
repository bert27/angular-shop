interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface SeoMetadata {
  path: string;
  title: string;
  metaTags: MetaTag[];
}
interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

interface SeoMetadata {
  path: string;
  title: string;
  metaTags: MetaTag[];
}
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

export const seoMetadata: SeoMetadata[] = [
  {
    path: '',
    title: 'Tienda Angular | Compra los Mejores Productos al Mejor Precio',
    metaTags: [
      {
        name: 'description',
        content:
          'Compra en nuestra tienda online los mejores productos con ofertas exclusivas. ¡Descubre calidad, precio y variedad en un solo lugar!',
      },
      { property: 'og:title', content: 'Tienda Angular | Productos de Alta Calidad y Grandes Ofertas' },
      {
        property: 'og:description',
        content:
          'Encuentra ofertas increíbles y productos de calidad. Explora nuestra tienda online y disfruta de una experiencia de compra excepcional.',
      },
      { name: 'keywords', content: 'tienda online, productos, ofertas, compras, calidad, descuentos, Angular' },
      { name: 'author', content: 'Tienda Angular' },
      { name: 'robots', content: 'index, follow' },
      { name: 'og:image', content: 'https://www.ejemplo.com/images/homepage-preview.jpg' },
      { property: 'og:url', content: 'https://www.ejemplo.com/' },
      { property: 'og:type', content: 'website' },
    ],
  },
  {
    path: 'productos',
    title: 'Productos Destacados | Variedad y Calidad a un Clic',
    metaTags: [
      {
        name: 'description',
        content:
          'Explora nuestra amplia gama de productos seleccionados para ofrecerte la mejor calidad y precio. Compra fácil y rápido en Tienda Angular.',
      },
      { name: 'keywords', content: 'productos online, calidad, ofertas, comprar, Tienda Angular' },
      { name: 'author', content: 'Tienda Angular' },
      { property: 'og:title', content: 'Productos Destacados | Encuentra lo que Necesitas' },
      {
        property: 'og:description',
        content: 'Navega por nuestra colección de productos destacados. Desde tecnología hasta artículos del hogar, todo en un solo lugar.',
      },
      { property: 'og:url', content: 'https://www.ejemplo.com/productos' },
      { property: 'og:type', content: 'website' },
    ],
  },
  {
    path: 'blog',
    title: 'Blog de Tienda Angular | Noticias, Consejos y Novedades',
    metaTags: [
      {
        name: 'description',
        content: 'Lee nuestros artículos más recientes sobre tendencias, consejos de compra y las últimas novedades en Tienda Angular.',
      },
      { name: 'keywords', content: 'blog, consejos de compra, noticias, tendencias, Tienda Angular' },
      { name: 'author', content: 'Tienda Angular' },
      { property: 'og:title', content: 'Blog de Tienda Angular | Artículos y Consejos' },
      {
        property: 'og:description',
        content:
          'Mantente informado con nuestros artículos exclusivos. Aprende sobre las mejores prácticas de compra y novedades en productos.',
      },
      { property: 'og:url', content: 'https://www.ejemplo.com/blog' },
      { property: 'og:type', content: 'website' },
    ],
  },
];
export function setMetaTags(path: string, titleService: Title, metaService: Meta): void {
  const seoData = seoMetadata.find((meta) => meta.path === path);

  if (seoData) {
    titleService.setTitle(seoData.title);

    const metaDefinitions: MetaDefinition[] = seoData.metaTags.map((meta) => {
      const transformedMeta: MetaDefinition = { content: meta.content };
      if (meta.name) transformedMeta.name = meta.name;
      if (meta.property) transformedMeta.property = meta.property;
      return transformedMeta;
    });

    metaService.addTags(metaDefinitions);
  } else {
    console.warn(`No se encontraron metadatos para la ruta: ${path}`);
  }
}
