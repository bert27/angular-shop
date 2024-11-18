import { CommonModule,NgOptimizedImage  } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule,NgOptimizedImage ],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.css'
})
export class HomeCarouselComponent {

  carouselList = [
    {
      bannerImg: "images-carousel/1a.jpg",
      title: "iPhone 16",
      description: "Control de Cámara. Haz la foto perfecta. Sin apenas mover un dedo.",
    },
    {
      bannerImg: "images-carousel/2a.jpg",
      title: "iPhone 16 PRO",
      description:
        "Resistente. Imponente. Titánico.",
    },
    {
      bannerImg: "images-carousel/3a.jpg",
      title: "Mac Mini",
      description: "Con el chip M2, el Mac mini sube la velocidad para que seas más eficaz.",
    },
  ];

}
