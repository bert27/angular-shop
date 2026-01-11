
import { Component } from '@angular/core';
import { privacyPolicy } from '@data/data';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './privacidad-page.component.html',
})
export class PrivacidadPageComponent {
  policySections = privacyPolicy;
}
