import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'component-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.html',
  styleUrls: ['./image.scss'],
})
export class ImageComponent {
  @Input() cardData!: { imageUrl?: string; title?: string };

  get hasImage(): boolean {
    return !!this.cardData?.imageUrl;
  }
}