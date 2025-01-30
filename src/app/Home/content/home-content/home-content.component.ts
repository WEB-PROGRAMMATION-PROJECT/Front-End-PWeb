import {Component, OnInit} from '@angular/core';

// home-content.component.ts
import { CommonModule } from '@angular/common';
import {DesignerCardComponent} from '../../../widgets/designer-card/designer-card.component';
import {ModelCardComponent} from '../../../widgets/model-card/model-card.component';
import {HomeDataServiceService} from '../../../services/Home/home-data-service.service';
import {Category as CategoryService} from '../../../services/Articles/category.service';
import { DesignerService } from '../../../services/Designers/designer.service';


interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  href: string;
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
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule, ModelCardComponent],
  templateUrl: "./home-content.component.html",
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  models: Modele[] = []; // Array pour stocker les modèles récupérés
  selectedModel: Modele | null = null; // Modèle sélectionné

  // Dictionnaire pour stocker les informations des stylistes
  stylisteNames: Map<number, string> = new Map();
  // Dictionnaire pour stocker les informations des matériaux
  materiauxNames: Map<number, string> = new Map();
  constructor(private modeleService: DesignerService) {}

  featuredModels: Modele[] = [
  ];

  categories: Category[] = [

  ];
  availableCategories: Category[] = [];
  

  ngOnInit(): void {

   
    this.modeleService.getModeles().subscribe(
      (data) => {
        this.models = data; // Stocker les modèles dans la variable `models`
        // Pour chaque modèle, récupérer les détails du styliste et des matériaux
        this.loadAdditionalData(data);
      },
      (error) => {
        console.error('Erreur lors du chargement des modèles', error);
      }
    );

    
  }
  loadAdditionalData(models: Modele[]): void {
    // Récupérer les noms des stylistes
    models.forEach((model) => {
      if (!this.stylisteNames.has(model.styliste_id)) {
        this.modeleService.getStylistById(model.styliste_id).subscribe(
          (styliste) => {
            this.stylisteNames.set(model.styliste_id, styliste.name);
          },
          (error) => {
            console.error('Erreur lors du chargement du styliste', error);
          }
        );
      }

    });
    // Correction de la réception des images des catégories
    this.modeleService.getCategories().subscribe(
      (categories: Category[]) => {
        this.availableCategories = categories.map(category => ({
          ...category,
          image: `http://127.0.0.1:8000/storage/${category.image}`
        }));
      },
      error => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }

  onDiscoverClick(model: Modele): void {
    // Implémenter la gestion du clic sur "Voir les détails"
    console.log('Discover clicked for:', model.name);
  }

  selectDesigner(model: Modele): void {
    this.selectedModel = model;
  }

  getStylisteName(styliste_id: number): string {
    return this.stylisteNames.get(styliste_id) || 'Styliste inconnu';
  }

  getMateriauxNames(materiaux_ids: number[]): string[] {
    return materiaux_ids.map(id => this.materiauxNames.get(id) || 'Matériau inconnu');
  }
}
