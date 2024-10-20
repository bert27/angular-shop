import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadComponent } from './components/head/head.component'; // Importamos el HeadComponent
import { styles } from './styles';
import { fadeAnimation } from './animations/fadeIntRoute';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadComponent, FooterComponent], // Incluimos HeadComponent y RouterOutlet
  templateUrl: './app.component.html',
  animations: [fadeAnimation], // Activamos la animación
})
export class AppComponent implements OnInit {
  // Método para preparar la animación de las rutas


  // Cargar estilos dinámicamente en el head
  ngOnInit() {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);
    }
  }
}
