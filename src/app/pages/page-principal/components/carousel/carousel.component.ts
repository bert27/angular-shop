
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { carouselConfig } from '../../../../../data/data';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, RouterModule],
  providers: [NgbCarouselConfig],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  carouselList = carouselConfig;
}
