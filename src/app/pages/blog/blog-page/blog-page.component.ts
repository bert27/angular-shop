import { Component } from '@angular/core';
import { CardsComponent } from "../../../components/cards/cards.component";
import { articlesBlog } from '../../../../data/data';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './blog-page.component.html',
})
export class BlogPageComponent {
  articles = articlesBlog; 
}
