import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'custom-dropdown',
  standalone: true,
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.sass'],
  imports: [CommonModule]
})
export class DropdownComponent {
  isOpen = false
  selectedOption: string | null = null

  options = ['Opción 1', 'Opción 2', 'Opción 3']

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  selectOption(option: string, event: MouseEvent) {
    event.stopPropagation() // Evita que el clic se propague al contenedor
    this.selectedOption = option
    this.isOpen = false // Cierra el menú al seleccionar una opción
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const dropdown = document.querySelector('.dropdown') as HTMLElement

    // Cierra el dropdown si se hace clic fuera de él
    if (dropdown && !dropdown.contains(target)) {
      this.isOpen = false
    }
  }
}
