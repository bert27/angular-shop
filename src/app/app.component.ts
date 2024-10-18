import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadComponent } from './components/head/head.component'; // Importamos el HeadComponent
import { styles } from './styles';
import { FooterComponent } from "./footer/footer.component"; // Importa los estilos generales

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadComponent, FooterComponent], // Incluimos HeadComponent y RouterOutlet
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  // Cargar estilos dinámicamente en el head
  ngOnInit() {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }
  }
}
