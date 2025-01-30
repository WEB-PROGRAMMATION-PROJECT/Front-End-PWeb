// clothing-models-page.component.ts
import { Component, OnInit } from '@angular/core';
import {ClothingModelCardComponent} from '../../widgets/clothing-model-card/clothing-model-card.component';
import {FormsModule} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';
import {NgForOf, NgIf} from '@angular/common';
import {Category, CategoryService} from '../../services/Articles/category.service';
import { DesignerService } from '../../services/Designers/designer.service';

interface SortOption {
  label: string;
  value: string;
}

interface Modele {
  id: number;
  name: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  description?: string;
  categorie_id: number;
  styliste_id: number;
  prix_min?: number;
  prix_max?: number;
  temps_min?: number;
  temps_max?: number;
  unite_temps?: string;
  materiaux_ids: number[]; 
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
  stylisteNames: Map<number, string> = new Map();
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
  categories: string[] = [];
  categorie: Map<number, string> = new Map();

  designers: string[] = []; // À remplir depuis le service
  designer: { id: number; name: string }[] = [];
  categoryNames: Map<number, string> = new Map();
  // Données des modèles
  allModels: Modele[] = [];
  filteredModels: Modele[] = [];

  constructor(private clothingModelService: DesignerService) {}
  getStylisteName(styliste_id: number): string {
   
    console.log('Contenu de stylisteNames:', Array.from(this.stylisteNames.entries()));
    const name = this.stylisteNames.get(styliste_id);
    
    return name || 'Styliste inconnu';
  }
  getCategoryName(category_id: number): string {
    return this.categoryNames.get(category_id) || 'Catégorie inconnue';
  }
  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // Charger les modèles, designers, et catégories depuis le service
    this.clothingModelService.getModeles().subscribe(models => {
      this.allModels = models;
      this.applyFilters();
    });
    this.clothingModelService.getStylists().subscribe(designers => {
      this.designer = designers.map((designer: any) => ({
        id: designer.id,
        name: designer.user.first_name
      }));

      this.stylisteNames = new Map(designers.map((designer: any) => [designer.id, designer.user.first_name]));
    });
    this.clothingModelService.getCategories().subscribe(categories => {
      this.categorie = new Map(categories.map(category => [category.id, category.name]));
    });
    this.clothingModelService.getStylists().subscribe(designers => {
      // @ts-ignore
      this.designers = designers.map(designer => designer.name);
    });

    this.clothingModelService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => category.name);
    });
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
        this.getStylisteName(model.styliste_id).toLowerCase().includes(searchLower)
      );
    }

    // Filtre par catégories (avec nom au lieu d'ID)
    if (this.selectedCategories.length > 0) {
      filtered = filtered.filter(model =>
        this.selectedCategories.includes(this.getCategoryName(model.categorie_id))
      );
    }

    // Filtre par styliste (avec nom au lieu d'ID)
    if (this.selectedDesigner) {
      filtered = filtered.filter(model =>
        this.getStylisteName(model.styliste_id) === this.selectedDesigner
      );
    }

    // Filtre par prix
    if (this.minPrice !== null) {
      filtered = filtered.filter(model => (model.prix_min ?? 0) >= this.minPrice!);
    }
    if (this.maxPrice !== null) {
      filtered = filtered.filter(model => (model.prix_max ?? Infinity) <= this.maxPrice!);
    }

    // Appliquer le tri
    this.filteredModels = this.sortModels(filtered);
  }

  // Logique de tri
  sortModels(models: Modele[]): Modele[] {
    switch (this.sortOption) {
      case 'price_asc':
        return [...models].sort((a, b) => (a.prix_max ?? 0) - (b.prix_max ?? 0));
      case 'price_desc':
        return [...models].sort((a, b) => (b.prix_max ?? 0) - (a.prix_max ?? 0));
      case 'popularity':
        // Implémentez votre logique de tri par popularité si applicable
        return models;
      case 'newest':
      default:
        return models;
    }
  }

  // Gestion des commandes
  onModelOrder(modelId: number): void {
    console.log(`Commande du modèle ${modelId}`);
  }
}
