
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterModule } from '@angular/router';
import { ProductDataInterface } from '../../../../../data/interfaces-model';
import { productsData } from '../../../../../data/products-data';
import { ImageComponent } from '../../../../components/image/image';

@Component({
  selector: 'app-best-products',
  standalone: true,
  imports: [CarouselModule, RouterModule, ImageComponent],
  templateUrl: './best-products.component.html',
  styleUrls: ['./best-products.component.scss'],
})
export class BestProductsComponent {
  bestProducts = productsData;
  isMoveActive = false;
  isMoveManual = true;

  selectedImage: string | undefined;
  imageSize = 200;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: this.isMoveActive,
    autoplayTimeout: 5000, // Aumenta el tiempo entre transiciones automáticas
    autoplayHoverPause: true,
    autoWidth: true,
    mouseDrag: this.isMoveManual,
    touchDrag: this.isMoveManual,
    pullDrag: this.isMoveManual,
    dots: false,
    navSpeed: 700,
    smartSpeed: 600, // Controla la velocidad de la transición
    autoplaySpeed: 600, // Controla la velocidad de reproducción automática
    nav: false,
    margin: 60,
    navText: ['Atrás', 'Siguiente'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  };

  // Variables para rastrear el desplazamiento
  isDragging = false;
  dragThreshold = 5; // Umbral en píxeles para considerar que es un desplazamiento
  startX = 0;
  startY = 0;

  constructor(private router: Router) {}

  // Métodos para manejar el desplazamiento y clics
  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = false;
    if (event instanceof MouseEvent) {
      this.startX = event.clientX;
      this.startY = event.clientY;
    } else if (event instanceof TouchEvent) {
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    }
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    let currentX = 0;
    let currentY = 0;
    if (event instanceof MouseEvent) {
      currentX = event.clientX;
      currentY = event.clientY;
    } else if (event instanceof TouchEvent) {
      currentX = event.touches[0].clientX;
      currentY = event.touches[0].clientY;
    }

    const deltaX = Math.abs(currentX - this.startX);
    const deltaY = Math.abs(currentY - this.startY);

    if (deltaX > this.dragThreshold || deltaY > this.dragThreshold) {
      this.isDragging = true;
    }
  }

  onDragEnd(event: MouseEvent | TouchEvent): void {
    // No se requiere acción adicional aquí
  }

  // Método para manejar el clic en la tarjeta
  onCardClick(cardData: ProductDataInterface, selectedOption: { tipo: string; price: number } | undefined): void {
    if (this.isDragging) {
      // Si se detectó un desplazamiento, no realizar la navegación
      this.isDragging = false; // Resetear el flag
      return;
    }
    this.navigateToProduct(cardData, selectedOption);
  }

  // Método para navegar al producto seleccionado
  navigateToProduct(cardData: ProductDataInterface, selectedOption: { tipo: string; price: number } | undefined) {
    const productName = cardData.title.toLowerCase().replace(/\s+/g, '-');

    let route = '';

    if (cardData.category) {
      const categoryLower = cardData.category.toLowerCase().replace(/\s+/g, '-');
      route = `/producto/${categoryLower}/${productName}`;
    } else {
      route = `/producto/${productName}`;
    }

    this.router.navigate([route], {
      state: { tipo: selectedOption?.tipo },
    });
  }

  // Método para cambiar la imagen seleccionada (si es necesario)
  changeImage(image: string) {
    this.selectedImage = image;
  }
}
