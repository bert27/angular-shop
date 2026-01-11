import { ResolveFn } from '@angular/router';
import { ProductDataInterface } from '@data/interfaces-model';
import { productsData } from '@data/products-data';
import { slugify } from '@utils';

export const productResolver: ResolveFn<ProductDataInterface | null> = (route) => {
  const titleSlug = route.paramMap.get('title');
  if (!titleSlug) return null;

  return (
    productsData.find((product) => slugify(product.title) === slugify(titleSlug)) || null
  );
};
