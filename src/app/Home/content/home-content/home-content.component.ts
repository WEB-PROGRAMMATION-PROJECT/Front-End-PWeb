import { Component } from '@angular/core';

// home-content.component.ts
import { CommonModule } from '@angular/common';
import {DesignerCardComponent} from '../../../widgets/designer-card/designer-card.component';
import {ModelCardComponent} from '../../../widgets/model-card/model-card.component';

interface Model {
  id: number;
  name: string;
  image: string;
  designer: string;
  price: number;
  category: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, ModelCardComponent],
  templateUrl: "./home-content.component.html",
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent {
  featuredModels: Model[] = [
    {
      id: 1,
      name: 'Robe Haute Couture Noir',
      designer: 'Claire Fontaine',
      price: 2500,
      image: 'dress1.jpg',
      category: 'Robes'
    },
    // Add more models...
    { id: 2, name: 'Robe Haute Couture Blanc',
      designer: 'Claire Fontaine',
      price: 2800,
      image: 'dress2.jpg',
      category: 'Robes' },
    { id: 3, name: 'Robe Haute Couture Rose',
      designer: 'Claire Fontaine',
      price: 3000,
      image: 'dress3.webp',
      category: 'Robes' },
    { id: 2, name: 'Robe Haute Couture Blanc',
      designer: 'Claire Fontaine',
      price: 2800,
      image: 'dress2.jpg',
      category: 'Robes' },


  ];

  categories: Category[] = [
    {
      id: 1,
      name: 'Robes de Soirée',
      image: 'robe.webp',
      count: 156
    },
    {
      id: 2,
      name: 'Costumes',
      image: 'costume.jpg',
      count: 89
    },
    {
      id: 3,
      name: 'Tenues Cocktail',
      image: 'cocktail.webp',
      count: 124
    },
    {
      id: 4,
      name: 'Tenue Africaine',
      image: 'africaine.webp',
      count: 78
    }
  ];
}
