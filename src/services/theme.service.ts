import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dataWeb } from '../data/data';
import { isPlatformBrowser } from '@angular/common';

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

      const variables = {
        '--colorBackground': dataWeb.colorBackground,
        '--colorText': dataWeb.colorText,
      };

      Object.entries(variables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });

      this.cssVariablesSubject.next(variables);
    }
  }
}
