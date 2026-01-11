
import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { carouselConfig } from '@data/data';
import { RouterModule } from '@angular/router';
import { productsData } from '@data/products-data';
import { slugify } from '@utils';

interface CarouselItem {
  bannerImg: string;
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgbCarouselModule, RouterModule],
  providers: [NgbCarouselConfig],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  carouselList: CarouselItem[] = [];

  ngOnInit() {
    this.carouselList = carouselConfig.map((carouselItem) => {
      const matchedProduct = productsData.find((product) => slugify(product.title) === slugify(carouselItem.title));

      if (matchedProduct && matchedProduct.options.length > 0) {
        const firstOption = matchedProduct.options[0];
        const productSlug = slugify(matchedProduct.title);
        const optionTipoSlug = slugify(firstOption.tipo);
        const withUrl = {
          ...carouselItem,
          url: `/producto/${productSlug}/${optionTipoSlug}`,
        };
        return withUrl;
      }

      return { ...carouselItem, url: '/' };
    });
  }
}
