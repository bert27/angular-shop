import { Component } from '@angular/core';
import { dataWeb, legalNotice } from '../../../../data/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aviso-legal-page.component.html',
})
export class AvisoLegalPageComponent {
  email = dataWeb.email;
  paragraphs = legalNotice;
}
