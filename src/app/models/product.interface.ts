export interface IProductData {
  options: { tipo: string; price: number }[];
  title: string;
  subtitle: string;
  body?: string;
  description?: string;
  stock?: boolean;
  imageUrl: string;
  category: string;
}
