import { Component } from '@angular/core';
import { IconSvgComponent } from "../components/icon-svg/icon-svg.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconSvgComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.sass'
})
export class FooterComponent {

}
