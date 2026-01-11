import { Component } from '@angular/core';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { RouterModule } from '@angular/router';
import { dataWeb, footerText } from '../../../data/data';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconSvgComponent, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  email = dataWeb.email;
  year = new Date().getFullYear();
  titleShop = dataWeb.nameShop;
  footerTextC = footerText;
  contactText = `Contacto: `;
  navLinks = [
    { path: '/avisoLegal', label: 'Aviso Legal' },
    {
      path: '/devolucionesyReembolso',
      label: 'Política de Devoluciones y Reembolso',
    },
    { path: '/privacidad', label: 'Política de Privacidad' },
    { path: '/terminosyCondiciones', label: 'Términos y condiciones' },
  ];

  socialMedia = [
    {
      href: dataWeb.instagram,
      src: 'icons/instagram.png',
      color: '#ffffff',
    },
    {
      href: dataWeb.youtube,
      src: 'icons/youtube2.png',
      color: '#ffffff',
    },
  ];
}
