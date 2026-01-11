import { ResolveFn } from '@angular/router';
import { ArticleInterface } from '@data/interfaces-model';
import { articlesBlog } from '@data/data';
import { slugify } from '@utils';

export const articleResolver: ResolveFn<ArticleInterface | null> = (route) => {
  const titleSlug = route.paramMap.get('title');
  if (!titleSlug) return null;

  const found = articlesBlog.find((article) => {
    const slug = slugify(article.title);
    return slug === slugify(titleSlug);
  });
  
  return found || null;
};
