import {Component, OnInit} from '@angular/core';

// home-content.component.ts
import { CommonModule } from '@angular/common';
import {DesignerCardComponent} from '../../../widgets/designer-card/designer-card.component';
import {ModelCardComponent} from '../../../widgets/model-card/model-card.component';
import {HomeDataServiceService} from '../../../services/Home/home-data-service.service';
import {Category as CategoryService} from '../../../services/Articles/category.service';

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
export class HomeContentComponent implements OnInit {

  constructor(private homeDataService : HomeDataServiceService) {}

  featuredModels: Model[] = [
  ];

  categories: Category[] = [

  ];

  ngOnInit(): void {

    this.homeDataService.getTopModels().subscribe((data) => {
      this.featuredModels = data;
    });

    // Charger les promotions
    this.homeDataService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
