export interface directionShippingInterface {
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

interface Option {
  tipo: string;
  price: number;
}

export interface ProductCarritoInterface {
  id: number;
  title: string;
  description?: string;
  cantidad: number;
  tipoSeleccionado: Option;
}

export interface PaymentRequestInterface {
  directionShipping: directionShippingInterface;
  productos: ProductCarritoInterface[];
  modeHtml?: boolean;
  shippingCost: number;
}
