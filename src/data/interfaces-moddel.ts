export interface ProductDataInterface {
  options: { tipo: string; price: number }[]; // Cambiar options a un array de objetos con tipo y price
  title: string;
  body?: string;
  description?: string;
  stock?: boolean;
  imageUrl: string;
}

export interface ArticleInterface {
  title: string;
  imageUrl: string;
  bodyTitle: string; // Nueva propiedad añadida
  textContent: string;
}
