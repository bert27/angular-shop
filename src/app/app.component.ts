import { Component, Inject, PLATFORM_ID, Renderer2, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HeadComponent } from './components/head/head.component';
import { fadeAnimation } from './animations/fadeIntRoute';
import { FooterComponent } from './components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { dataWeb } from '../data/data';
import { ThemeService } from '../services/theme.service';

const POKEMON_STATE_KEY = 'dd';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadComponent, FooterComponent],
  templateUrl: './app.component.html',
  animations: [fadeAnimation],
})
export class AppComponent implements AfterViewInit {
  pokemon: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private titleService: Title,
    private renderer: Renderer2,
    private themeService: ThemeService,
    // private transferState: TransferState,
  ) {
    /*if (isPlatformServer(this.platformId)) {
      // Solo se ejecuta en el servidor
      this.dataSvc.getPokemon().subscribe((data) => {
        this.pokemon = data;
        this.transferState.set(POKEMON_STATE_KEY, data); // Transfiere los datos al cliente
      });
    } else {
      // Recupera los datos transferidos si están disponibles
      this.pokemon = this.transferState.get(POKEMON_STATE_KEY, null);
    }*/
  }

  ngAfterViewInit(): void {
    this.iconWeb();
    this.themeService.setCSSVariables();
    if (isPlatformBrowser(this.platformId)) {
      // Reset scroll
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
          });
        }
      });
    }

    this.setTitle(dataWeb.nameShop);
  }

  iconWeb() {
    if (isPlatformBrowser(this.platformId)) {
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        this.renderer.setAttribute(favicon, 'href', dataWeb.logo.icon);
      }
    }
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
