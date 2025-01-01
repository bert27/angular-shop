import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-icon-svg',
  templateUrl: './icon-svg.component.html',
  styleUrls: ['./icon-svg.component.sass'],
  standalone: true,
})
export class IconSvgComponent {
  @Input() src = '';
  @Input() color = '#f93527';
  @Input() size = 24;
}
