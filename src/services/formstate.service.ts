import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { DirectionShippingInterface } from '../data/interfaces-model';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formDataSubject: BehaviorSubject<DirectionShippingInterface | null>;
  public formData$: Observable<DirectionShippingInterface | null>;
  private readonly STORAGE_KEY = 'step1FormData';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const savedData = this.loadFormDataFromStorage();
    this.formDataSubject = new BehaviorSubject<DirectionShippingInterface | null>(savedData);
    this.formData$ = this.formDataSubject.asObservable();
  }

  /**
   * Sets the form data and saves it to localStorage.
   * @param data Form data to save.
   */
  setFormData(data: DirectionShippingInterface): void {
    this.formDataSubject.next(data);
    this.saveFormDataToStorage(data);
  }

  /**
   * Retrieves the form data.
   * @returns Form data or null if none exists.
   */
  getFormData(): DirectionShippingInterface | null {
    return this.formDataSubject.getValue();
  }

  /**
   * Clears the form data and removes it from localStorage.
   */
  clearFormData(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.formDataSubject.next(null);
      localStorage.removeItem(this.STORAGE_KEY);
    } else {
      this.formDataSubject.next(null);
    }
  }

  /**
   * Saves the form data to localStorage if running in the browser.
   * @param data Form data to save.
   */
  private saveFormDataToStorage(data: DirectionShippingInterface): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(this.STORAGE_KEY, serializedData);
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }

  /**
   * Loads the form data from localStorage if running in the browser.
   * @returns Form data or null if none exists or if an error occurs.
   */
  private loadFormDataFromStorage(): DirectionShippingInterface | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const serializedData = localStorage.getItem(this.STORAGE_KEY);
        if (serializedData) {
          const data: DirectionShippingInterface = JSON.parse(serializedData);
          console.log('Form data loaded from localStorage.');
          return data;
        }
        return null;
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        return null;
      }
    }
    return null;
  }
}
