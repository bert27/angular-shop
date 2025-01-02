// theme.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dataWeb } from '../data/data';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private cssVariablesSubject = new BehaviorSubject<Record<string, string>>({});
  cssVariables$ = this.cssVariablesSubject.asObservable();

  constructor() {}

  setCSSVariables() {
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