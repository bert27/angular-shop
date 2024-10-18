import { Component } from '@angular/core';
import { CardsComponent } from "../../../components/cards/cards.component";
import { articlesBlog } from '../../../../data/data';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CardsComponent],
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.sass']
})
export class BlogPageComponent {
  articles = articlesBlog; 
}
