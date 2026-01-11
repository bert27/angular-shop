import { Component, Input } from '@angular/core';

import { DirectionShippingInterface } from '../../../../../data/interfaces-model';

@Component({
  selector: 'app-step2-direction',
  templateUrl: './step2-direction.html',
  styleUrls: ['./step2-direction.scss'],
  standalone: true,
  imports: [],
})
export class Step2DirectionComponent {
  @Input() directionShipping!: DirectionShippingInterface;
}
