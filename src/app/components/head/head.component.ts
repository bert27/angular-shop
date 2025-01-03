import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { IconSvgComponent } from '../icon-svg/icon-svg.component';
import { Router, RouterModule } from '@angular/router';
import { ShoppingCartPopupComponent } from '../shopping-cart-popup/shopping-cart-popup.component';
import { CarritoService } from '../../../services/carrito.service';
import { Subscription } from 'rxjs';
import { dataWeb } from '../../../data/data';

@Component({
  selector: 'app-head',
  standalone: true,
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  imports: [IconSvgComponent, RouterModule, ShoppingCartPopupComponent],
})
export class HeadComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(ShoppingCartPopupComponent)
  shoppingCartPopup!: ShoppingCartPopupComponent;
  cantidadProductos = 0;
  private subscription: Subscription | undefined;
  logoSrc: string = dataWeb.logo.pc;
  private resizeTimer: any;
  constructor(private carritoService: CarritoService, public router: Router) {}

  ngOnInit() {
    this.subscription = this.carritoService
      .getProductCount()
      .subscribe((count) => {
        this.cantidadProductos = count;
      });

    this.subscription = this.carritoService.getCartOpen().subscribe((open) => {
      const isMobile = window.innerWidth <= 768;
      if (open && !isMobile) {
        this.openCarritoView();
      }
    });

    this.updateLogo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const isMobile = window.innerWidth <= 768;

    clearTimeout(this.resizeTimer);

    if (isMobile) {
      this.resizeTimer = setTimeout(() => {
        this.updateLogo();
        this.adjustMainMargin();
      }, 200);
    } else {
      this.updateLogo();
      this.adjustMainMargin();
    }
  }

  ngAfterViewInit() {
    this.adjustMainMargin();
  }

  private updateLogo() {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768;
      this.logoSrc = isMobile ? dataWeb.logo.mobile : dataWeb.logo.pc;
    }
  }

  private adjustMainMargin() {
    if (typeof window !== 'undefined') {
      const header = document.querySelector('header') as HTMLElement;
      const main = document.querySelector('main') as HTMLElement;

      if (header && main) {
        const headerHeight = header.offsetHeight;
        main.style.marginTop = `${headerHeight}px`;
      }
    }
  }

  navigateToInicio() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      this.navigateToCarrito();
    } else {
      this.openCarritoView();
    }
  }
}
