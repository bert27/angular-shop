import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterModule } from '@angular/router';
import { ProductDataInterface } from '../../../../../data/interfaces-model';
import { productsData } from '../../../../../data/products-data';


@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterModule],
  templateUrl: './best-products.component.html',
  styleUrls: ['./best-products.component.css'],
})
export class BestProductsComponent {
  bestProducts = productsData;

  productImages = [
    { url: 'images-products/1.jpg', id: '1' },
    { url: 'images-products/2.jpg', id: '2' },
    { url: 'images-products/mac-mini.jpg', id: '3' },
    { url: 'images-products/mac-mini.jpg', id: '4' },
    { url: 'images-products/mac-mini.jpg', id: '5' },
    { url: 'images-products/1.jpg', id: '6' },
    { url: 'images-products/2.jpg', id: '7' },
    { url: 'images-products/mac-mini.jpg', id: '8' },
    { url: 'images-products/mac-mini.jpg', id: '9' },
    { url: 'images-products/mac-mini.jpg', id: '10' },
  ];

  selectedImage: string | undefined;
  imageSize = 200;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    autoWidth: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: false,
    margin: 60,
    navText: ['Atras', 'Siguiente'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  constructor(private router: Router) {
    // Inyección del Router
  }

  navigateToProduct(
    cardData: ProductDataInterface,
    selectedOption: { tipo: string; price: number } | undefined
  ) {
    const productName = cardData.title.toLowerCase().replace(/\s+/g, '-'); 

    let route = `/producto//${productName}`; 

    if (selectedOption) {
      route += `/${selectedOption.tipo}`; 
    }
    this.router.navigate([route]); 
  }

  changeImage(image: string) {
    this.selectedImage = image;
  }
}
