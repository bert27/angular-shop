// theme.service.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { dataWeb } from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private cssVariablesSubject = new BehaviorSubject<Record<string, string>>({});
  cssVariables$ = this.cssVariablesSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  setCSSVariables() {
    if (isPlatformBrowser(this.platformId)) {
      const root = document.documentElement;

      const primary = dataWeb.colorPrimary;
      const secondary = dataWeb.colorSecondary;

      const variables = {
        '--colorPrimary': primary,
        '--colorPrimaryHover': this.darkenColor(primary, 10),
        '--colorSecondary': secondary,
        '--colorSecondaryHover': this.darkenColor(secondary, 20),
        '--colorBackground': dataWeb.colorBackground,
        '--colorText': dataWeb.colorText,
      };

      Object.entries(variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      this.cssVariablesSubject.next(variables);
    }
  }

  private darkenColor(color: string, percent: number): string {
    let hex = color.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    const num = parseInt(hex, 16);
    let r = (num >> 16) - Math.round((255 * percent) / 100);
    let g = ((num >> 8) & 0x00ff) - Math.round((255 * percent) / 100);
    let b = (num & 0x0000ff) - Math.round((255 * percent) / 100);

    r = r < 0 ? 0 : r;
    g = g < 0 ? 0 : g;
    b = b < 0 ? 0 : b;

    const newColor =
      '#' +
      [r, g, b]
        .map((x) => {
          const hexPart = x.toString(16);
          return hexPart.length === 1 ? '0' + hexPart : hexPart;
        })
        .join('');

    return newColor;
  }
}
