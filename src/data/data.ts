import { ArticleInterface, ProductDataInterface } from './interfaces-moddel';

export const cardMultimediaData = {
  title: 'Card example',
  body: 'Contenido de la tarjeta.',
};

export const cardProduct1 = {
  title: 'Iphone 16 pro',
  description:
    'Smartphone 5G con Control de Cámara, grabación en 4K a 120 f/s con Dolby Vision.',
  stock: true,
  imageUrl: 'images-products/1.jpg',
  options: [
    {
      price: 1219,  // Ajustado
      tipo: "128Gb"
    },
    {
      price: 1540,  // Ajustado
      tipo: "256Gb"
    },
    {
      price: 1800,  // Ajustado
      tipo: "512Gb"
    }
  ]
};

export const cardProduct2 = {
  title: 'Iphone 16',
  description:
    'Smartphone 5G con Control de Cámara, Chip A18 y un subidón en autonomía.',
  stock: true,
  imageUrl: 'images-products/2.jpg',
  options: [
    {
      price: 959,
      tipo: "128Gb"
    },
    {
      price: 1099,
      tipo: "256Gb"
    },
    {
      price: 1299,
      tipo: "512Gb"
    }
  ]
};

export const macMini = {
  title: 'Mac Mini 2023',
  description:
    'Con Chip M2, 8 GB de RAM, 256 GB de Almacenamiento SSD y Gigabit Ethernet. Compatibilidad con el iPhone y el iPad.',
  stock: true,
  imageUrl: 'images-products/mac-mini.jpg',
  options: [
    {
      price: 959,
      tipo: "256Gb"
    },
    {
      price: 1199,
      tipo: "512Gb"
    },
    {
      price: 1499,
      tipo: "1Tb"
    }
  ]
};

export const cardProduct4 = {
  title: 'Mac Mini 2023',
  description:
    'Con Chip M2, 8 GB de RAM, 256 GB de Almacenamiento SSD y Gigabit Ethernet. Compatibilidad con el iPhone y el iPad.',
  stock: false,
  imageUrl: 'images-products/mac-mini.jpg',
  options: [
    {
      price: 959,
      tipo: "256Gb"
    },
    {
      price: 1199,
      tipo: "512Gb"
    },
    {
      price: 1499,
      tipo: "1Tb"
    }
  ]
};

export const cardProduct5 = {
  title: 'Mac Mini 2023',
  description:
    'Con Chip M2, 8 GB de RAM, 256 GB de Almacenamiento SSD y Gigabit Ethernet. Compatibilidad con el iPhone y el iPad.',
  stock: true,
  imageUrl: 'images-products/mac-mini.jpg',
  options: [
    {
      price: 959,
      tipo: "256Gb"
    },
    {
      price: 1199,
      tipo: "512Gb"
    },
    {
      price: 1499,
      tipo: "1Tb"
    }
  ]
};

export const productsData = [
  cardProduct1,
  cardProduct2,
  macMini,
  cardProduct4,
  cardProduct5
] as ProductDataInterface[];

export const articleBlog1 = {
  title: 'Explorando el Futuro: Tecnología que Transformará Nuestras Vidas',
  imageUrl: 'images-articles/article1.jpg',
  bodyTitle: 'Descubre las innovaciones que están moldeando nuestro futuro.',
  textContent:
    'En un mundo donde la tecnología avanza a pasos agigantados, exploramos las innovaciones que están marcando el camino hacia un futuro emocionante. Desde la inteligencia artificial que personaliza nuestras experiencias diarias hasta la realidad aumentada que redefine cómo interactuamos con nuestro entorno, el futuro está lleno de posibilidades. Acompáñanos en este viaje de descubrimiento y sé parte de la revolución tecnológica que está por venir.',
};

export const articleBlog2 = {
  title: 'Sabores del Mundo: Una Aventura Gastronómica en Cada Bocado',
  imageUrl: 'images-articles/article2.jpg',
  bodyTitle: 'Un viaje culinario que celebra la diversidad cultural.',
  textContent:
    'La comida es un lenguaje universal que une a las personas y celebra la diversidad cultural. En este artículo, te llevamos a un viaje culinario alrededor del mundo, explorando sabores únicos y recetas tradicionales que cuentan historias. Desde el picante y vibrante curry de la India hasta la suave y delicada pasta italiana, cada plato es una invitación a experimentar la riqueza de la gastronomía global. ¡Prepárate para descubrir nuevas delicias y tal vez inspirarte para tu próxima aventura en la cocina!',
};

export const articleBlog3 = {
  title: 'El Arte de la Minimalismo: Simplifica tu Vida',
  imageUrl: 'images-articles/article3.jpg',
  bodyTitle: 'Menos es más: vive con simplicidad y claridad.',
  textContent:
    'En un mundo saturado de información y distracciones, el minimalismo surge como un estilo de vida que promueve la simplicidad y la claridad mental. En este artículo, exploraremos los principios del minimalismo, cómo aplicar sus enseñanzas en tu vida diaria y los beneficios que conlleva deshacerse del exceso. Aprenderás a valorar lo esencial y a encontrar la paz en un entorno más ordenado y menos agitado. ¡Descubre cómo menos puede ser más y transforma tu vida!',
};

export const articleBlog4 = {
  title: 'Viajes Sostenibles: Descubriendo el Mundo Sin Dejar Huella',
  imageUrl: 'images-articles/article4.jpg',
  bodyTitle: 'Viaja de manera consciente y cuida nuestro planeta.',
  textContent:
    'Viajar es una de las experiencias más enriquecedoras de la vida, pero también conlleva responsabilidades hacia nuestro planeta. En este artículo, analizaremos cómo adoptar un enfoque sostenible en tus viajes, desde elegir destinos eco-amigables hasta minimizar tu impacto en las comunidades que visitas. Aprende a ser un viajero consciente y a disfrutar de aventuras que no solo enriquecen tu vida, sino que también cuidan de nuestro hogar compartido.',
};

export const articleBlog5 = {
  title: 'El Poder de la Lectura: Transformando Mentes y Corazones',
  imageUrl: 'images-articles/article5.jpg',
  bodyTitle: 'Descubre cómo la lectura puede enriquecer tu vida.',
  textContent:
    'Leer es una puerta a mundos desconocidos, ideas inspiradoras y perspectivas diversas. En este artículo, exploraremos cómo la lectura puede transformar nuestras vidas, enriquecer nuestro conocimiento y fomentar la empatía. Desde los clásicos que han resistido la prueba del tiempo hasta las obras contemporáneas que desafían las normas, descubre cómo sumergirte en el poder de las palabras puede abrirte a un universo de posibilidades.',
};

export const articlesBlog = [
  articleBlog1,
  articleBlog2,
  articleBlog3,
  articleBlog4,
  articleBlog5,
] as ArticleInterface[];
