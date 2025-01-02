// clothing-models-page.component.ts
import { Component, OnInit } from '@angular/core';
import {ClothingModelCardComponent} from '../widgets/clothing-model-card/clothing-model-card.component';
import {FormsModule} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';
import {NgForOf, NgIf} from '@angular/common';

interface SortOption {
  label: string;
  value: string;
}

interface ClothingModel {
  id: number;
  name: string;
  designer: string;
  price: number;
  imageUrl: string;
  category: string;
  materials: string[];
  estimatedTime: number;
  availableSizes: string[];
}

@Component({
  selector: 'app-clothing-models-page',
  templateUrl: './clothing-models-page.component.html',
  standalone: true,
  imports: [
    ClothingModelCardComponent,
    FormsModule,
    NgSelectComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./clothing-models-page.component.css']
})
export class ClothingModelsPageComponent implements OnInit {
  // Données de filtrage
  searchTerm: string = '';
  selectedCategories: string[] = [];
  selectedDesigner: string | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortOption: string = 'newest';

  // Options de tri
  sortOptions: SortOption[] = [
    { label: 'Plus récent', value: 'newest' },
    { label: 'Prix croissant', value: 'price_asc' },
    { label: 'Prix décroissant', value: 'price_desc' },
    { label: 'Popularité', value: 'popularity' }
  ];

  // Données des filtres
  categories: string[] = [
    'Robes',
    'Costumes',
    'Tenues traditionnelles',
    'Tenues de soirée',
    'Casual',
    'Accessoires'
  ];

  designers: string[] = []; // À remplir depuis le service

  // Données des modèles
  allModels: ClothingModel[] = [];
  filteredModels: ClothingModel[] = [];

  constructor() {} // Injecter les services nécessaires

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // Simulons des données pour l'exemple
    this.allModels = [
      {
        id: 1,
        name: 'Robe de Soirée Élégante',
        designer: 'Marie Laurent',
        price: 599.99,
        imageUrl: 'cocktail.webp',
        category: 'Robes',
        materials: ['Soie', 'Dentelle'],
        estimatedTime: 15,
        availableSizes: ['36', '38', '40', '42']
      },
      {
        id: 1,
        name: 'Robe de Soirée Élégante',
        designer: 'Marie Laurent',
        price: 599.99,
        imageUrl: 'dress3.webp',
        category: 'Robes',
        materials: ['Soie', 'Dentelle'],
        estimatedTime: 15,
        availableSizes: ['36', '38', '40', '42']
      },
      {
        id: 1,
        name: 'Robe de Soirée Élégante',
        designer: 'Marie Laurent',
        price: 599.99,
        imageUrl: 'cocktail.webp',
        category: 'Robes',
        materials: ['Soie', 'Dentelle'],
        estimatedTime: 15,
        availableSizes: ['36', '38', '40', '42']
      },
      {
        id: 1,
        name: 'Robe de Soirée Élégante',
        designer: 'Marie Laurent',
        price: 599.99,
        imageUrl: 'cocktail.webp',
        category: 'Robes',
        materials: ['Soie', 'Dentelle'],
        estimatedTime: 15,
        availableSizes: ['36', '38', '40', '42']
      },
      // Ajouter plus de modèles ici
    ];

    this.applyFilters();
  }

  // Gestionnaires d'événements de filtrage
  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoriesChange(): void {
    this.applyFilters();
  }

  onDesignerChange(): void {
    this.applyFilters();
  }

  onPriceChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  // Logique de filtrage
  applyFilters(): void {
    let filtered = [...this.allModels];

    // Filtre par recherche
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(searchLower) ||
        model.designer.toLowerCase().includes(searchLower)
      );
    }

    // Filtre par catégories
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(model =>
        this.selectedCategories.includes(model.category)
      );
    }

    // Filtre par designer
    if (this.selectedDesigner) {
      filtered = filtered.filter(model =>
        model.designer === this.selectedDesigner
      );
    }

    // Filtre par prix
    if (this.minPrice !== null) {
      filtered = filtered.filter(model => model.price >= this.minPrice!);
    }
    if (this.maxPrice !== null) {
      filtered = filtered.filter(model => model.price <= this.maxPrice!);
    }

    // Appliquer le tri
    filtered = this.sortModels(filtered);

    this.filteredModels = filtered;
  }

  // Logique de tri
  sortModels(models: ClothingModel[]): ClothingModel[] {
    switch (this.sortOption) {
      case 'price_asc':
        return [...models].sort((a, b) => a.price - b.price);
      case 'price_desc':
        return [...models].sort((a, b) => b.price - a.price);
      case 'popularity':
        // Implémentez votre logique de tri par popularité
        return models;
      case 'newest':
      default:
        // Par défaut, gardez l'ordre existant (supposé être par date)
        return models;
    }
  }

  // Gestion des commandes
  onModelOrder(modelId: number): void {
    console.log(`Commande du modèle ${modelId}`);
    // Implémentez la logique de commande ici
  }
}
