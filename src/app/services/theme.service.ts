import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { dataWeb } from '@data/data';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private cssVariablesSignal = signal<Record<string, string>>({});
  cssVariables = this.cssVariablesSignal.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  setCSSVariables() {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;

      const variables = {
        '--colorBackground': dataWeb.colorBackground,
        '--colorText': dataWeb.colorText,
      };

      Object.entries(variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      this.cssVariablesSignal.set(variables);
    }
  }
}
