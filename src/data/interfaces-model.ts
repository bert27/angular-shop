export interface ProductDataInterface {
  options: { tipo: string; price: number }[];
  title: string;
  subtitle: string;
  body?: string;
  description?: string;
  stock?: boolean;
  imageUrl: string;
  category: string;
}
export interface DirectionShippingInterface {
  name: string;
  surname: string;
  address: string;
  postalCode: string;
  country: string;
  province: string;
  city: string;
  phone: string;
  email: string;
}

export interface ArticleInterface {
  title: string;
  imageUrl: string;
  bodyTitle: string;
  textContent: string;
}
