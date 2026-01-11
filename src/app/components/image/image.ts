import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'component-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image.html',
  styleUrls: ['./image.css'],
})
export class ImageComponent {
  @Input() cardData!: { imageUrl?: string; title?: string };
  @Input() size: 'small' | 'normal' = 'normal';
  @Input() objectFit: 'contain' | 'cover' = 'contain';
  get hasImage(): boolean {
    return !!this.cardData?.imageUrl;
  }
}
