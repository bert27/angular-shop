import {
  Component,
  Inject,
  PLATFORM_ID,
  Renderer2,
  afterNextRender,
} from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeadComponent } from './components/head/head.component';
import { fadeAnimation } from './animations/fadeIntRoute';
import { FooterComponent } from './components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { dataWeb } from '../data/data';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadComponent, FooterComponent],
  templateUrl: './app.component.html',
  animations: [fadeAnimation],
})
export class AppComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private titleService: Title,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {
    afterNextRender(() => {
      this.iconWeb();
      this.themeService.setCSSVariables();

      //Reset scroll
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event instanceof NavigationEnd) {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'instant',
            });
          }
        }
      });

      this.setTitle(dataWeb.nameShop);
    });
  }

  iconWeb() {
    const favicon = document.querySelector('link[rel="icon"]');
    this.renderer.setAttribute(favicon, 'href', dataWeb.logo.icon);
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
