import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { IconSvgComponent } from '@components/icon-svg/icon-svg.component';
import { Router, RouterModule } from '@angular/router';
import { ShoppingCartPopupComponent } from '@components/shopping-cart-popup/shopping-cart-popup.component';
import { CarritoService } from '@services/carrito.service';
import { Subscription } from 'rxjs';
import { dataWeb } from '@data/data';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-head',
  standalone: true,
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss', 'burger-menu.scss'],
  imports: [IconSvgComponent, RouterModule, ShoppingCartPopupComponent, MatIconModule, MatMenuModule, MatButtonModule],
})
export class HeadComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ShoppingCartPopupComponent)
  shoppingCartPopup!: ShoppingCartPopupComponent;

  cantidadProductos = 0;
  private subscriptions = new Subscription();
  logoSrc = dataWeb.logo.pc;
  private resizeTimer: any;

  isMobile = false;
  menuOpen = false;

  constructor(
    private carritoService: CarritoService,
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
  ) {}

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getWindow(): Window | null {
    return this.isBrowser ? window : null;
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit() {
    if (this.isBrowser) {
      this.subscriptions.add(
        this.carritoService.getProductCount().subscribe((count) => {
          this.cantidadProductos = count;
        }),
      );

      this.subscriptions.add(
        this.carritoService.getCartOpen().subscribe((open) => {
          const isMobile = this.getWindow()?.innerWidth! <= 768;
          if (open && !isMobile) {
            this.openCarritoView();
          }
        }),
      );

      this.updateLogo();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    if (this.isBrowser) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.updateLogo();
        this.adjustMainMargin();
      }, 200);
    }
  }

  ngAfterViewInit() {
    this.adjustMainMargin();
  }

  private updateLogo() {
    if (this.isBrowser) {
      const width = this.getWindow()?.innerWidth!;
      this.isMobile = width <= 768;
      this.logoSrc = this.isMobile ? dataWeb.logo.mobile : dataWeb.logo.pc;
    }
  }

  private adjustMainMargin() {
    if (this.isBrowser) {
      const header = this.renderer.selectRootElement('header', true);
      const main = this.renderer.selectRootElement('main', true);

      if (header && main) {
        const headerHeight = header.offsetHeight;
        this.renderer.setStyle(main, 'marginTop', `${headerHeight}px`);
      }
    }
  }

  navigateToInicio() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openCarritoView() {
    if (this.shoppingCartPopup) {
      this.shoppingCartPopup.openCarrito();
    }
  }

  startAutoClose() {
    if (this.shoppingCartPopup) {
      this.shoppingCartPopup.startAutoClose();
    }
  }

  navigateToCarrito() {
    this.router.navigate(['/carrito']);
  }

  handleCarritoClick() {
    if (this.isBrowser) {
      const isMobile = this.getWindow()?.innerWidth! <= 768;
      if (isMobile) {
        this.navigateToCarrito();
      } else {
        this.openCarritoView();
      }
    }
  }
}
