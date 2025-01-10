// stylist-models.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Model {
  id: number;
  name: string;
  categories: string[];
  price: {
    min: number;
    max: number;
  };
  images: string[];
  status: 'available' | 'in_progress' | 'completed';
  estimatedTime: {
    min: number;
    max: number;
  };
  description: string;
  materials: Array<{
    name: string;
    description: string;
  }>;
  ordersCount: number;
  lastUpdated: Date;
}

@Component({
  selector: 'app-stylist-models',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stylist-models.component.html',
  styleUrls: ['./stylist-models.component.scss']
})
export class StylistModelsComponent implements OnInit {
  models: Model[] = [];
  filterStatus: string = 'all';
  sortOption: string = 'newest';

  constructor() {
    // Mock data
    this.models = [
      {
        id: 1,
        name: "Robe Élégante Sirène",
        categories: ["Robes de Soirée", "Haute Couture"],
        price: { min: 300, max: 800 },
        images: ["https://via.placeholder.com/300x400"],
        status: "available",
        estimatedTime: { min: 2, max: 4 },
        description: "Une robe sirène élégante parfaite pour les occasions spéciales",
        materials: [
          { name: "Soie", description: "Soie naturelle de haute qualité" }
        ],
        ordersCount: 5,
        lastUpdated: new Date()
      },
      // Add more mock models as needed
    ];
  }

  ngOnInit() {
    // Initialization logic
  }

  filterModels(status: string) {
    this.filterStatus = status;
  }

  sortModels(option: string) {
    this.sortOption = option;
    // Implement sorting logic
  }

  getFilteredModels(): Model[] {
    let filtered = [...this.models];

    if (this.filterStatus !== 'all') {
      filtered = filtered.filter(model => model.status === this.filterStatus);
    }

    switch (this.sortOption) {
      case 'newest':
        filtered.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.ordersCount - a.ordersCount);
        break;
      // Add more sorting options
    }

    return filtered;
  }

  navigateToAddModel() {
    // Implement navigation to add-model page
  }

  formatPrice(price: { min: number; max: number }): string {
    return `${price.min}€ - ${price.max}€`;
  }

  deleteModel(id: number) {
    // Implement delete logic
    console.log('Delete model', id);
  }
}
