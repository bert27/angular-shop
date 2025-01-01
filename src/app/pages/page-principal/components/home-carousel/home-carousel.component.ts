import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { carouselConfig } from '../../../../../data/data';

@Component({
  selector: 'app-home-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, NgOptimizedImage],
  templateUrl: './home-carousel.component.html',
  styleUrl: './home-carousel.component.css',
})
export class HomeCarouselComponent {
  carouselList = carouselConfig
}
