import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { dataWeb } from '@data/data';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private cssVariablesSignal = signal<Record<string, string>>({});
  cssVariables = this.cssVariablesSignal.asReadonly();
  isDarkMode = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.isDarkMode.set(true);
      } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Optional: auto-detect system preference if no saved preference
        this.isDarkMode.set(true);
      }
    }
  }

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
    this.setCSSVariables();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
    }
  }

  setCSSVariables() {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;
      const dark = this.isDarkMode();

      const variables = {
        '--colorBackground': dark ? (dataWeb as any).colorBackgroundDark : dataWeb.colorBackground,
        '--colorText': dark ? (dataWeb as any).colorTextDark : dataWeb.colorText,
        '--colorCard': dark ? (dataWeb as any).colorCardDark : '#f4f6f7',
      };

      Object.entries(variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      this.cssVariablesSignal.set(variables);
    }
  }
}
