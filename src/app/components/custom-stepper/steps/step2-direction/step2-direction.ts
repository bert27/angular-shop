import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionShippingInterface } from '../../../../../data/interfaces-model';

@Component({
  selector: 'app-step2-direction',
  templateUrl: './step2-direction.html',
  styleUrls: ['./step2-direction.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class Step2DirectionComponent {
  @Input() directionShipping!: DirectionShippingInterface;
}
