import { Component } from '@angular/core';
import { dataWeb, legalNotice } from '../../../../data/data';


@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [],
  templateUrl: './aviso-legal-page.component.html',
})
export class AvisoLegalPageComponent {
  email = dataWeb.email;
  paragraphs = legalNotice;
}
