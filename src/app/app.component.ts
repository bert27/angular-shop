import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
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
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private titleService: Title,
    private renderer: Renderer2,
    private themeService: ThemeService
  ) {}

  iconWeb() {
    const favicon = document.querySelector('link[rel="icon"]');
    this.renderer.setAttribute(favicon, 'href', dataWeb.logo.icon);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.iconWeb();
      this.themeService.setCSSVariables();

      // reset scroll
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });

      this.setTitle(dataWeb.nameShop);
    }
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
