import {Component, Input} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import { DesignerService } from '../../services/Designers/designer.service';

interface Materiau {
  id: number;
  name: string;
  description: string;
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
  selector: 'app-model-card',
  imports: [
    CommonModule,
  ],
  templateUrl: './model-card.component.html',
  standalone: true,
  styleUrl: './model-card.component.css'
})
export class ModelCardComponent {
  @Input() model: Modele | null = null;
  models: Modele[] = []; // Array pour stocker les modèles récupérés
  selectedModel: Modele | null = null; // Modèle sélectionné

  // Dictionnaire pour stocker les informations des stylistes
  stylisteNames: Map<number, string> = new Map();
  // Dictionnaire pour stocker les informations des matériaux
  materiauxNames: Map<number, string> = new Map();

  constructor(private modeleService: DesignerService) {}

  ngOnInit(): void {
    // Récupérer les modèles depuis le service
    this.modeleService.getModeles().subscribe(
      (data) => {
        this.models = data.map(model => {
          // Construire l'URL complète pour image1
          model.image1 = `http://127.0.0.1:8000/storage/${model.image1}`;
          console.log(model.image1)
          return model;
        });
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
            this.stylisteNames.set(model.styliste_id, styliste.user.first_name);
          },
          (error) => {
            console.error('Erreur lors du chargement du styliste', error);
          }
        );
      }

      // Récupérer les noms des matériaux
      model.materiaux_ids.forEach((id) => {
        if (!this.materiauxNames.has(id)) {
          this.modeleService.getMateriauxByIds(id).subscribe(
            (materiau) => {
              this.materiauxNames.set(materiau.id, materiau.name);
            },
            (error) => {
              console.error(`Erreur lors du chargement du matériau avec ID ${id}`, error);
            }
          );
        }
      });
    });
  }

  onDiscoverClick(model: Modele): void {
    // Implémenter la gestion du clic sur "Voir les détails"
    console.log('Discover clicked for:', model.name);
  }

  selectDesigner(model: Modele): void {
    this.selectedModel = model;
  }

  getStylisteName(styliste_id: number): string {
   
    console.log('Contenu de stylisteNames:', Array.from(this.stylisteNames.entries()));
    const name = this.stylisteNames.get(styliste_id);
    
    return name || 'Styliste inconnu';
  }

  getMateriauxNames(materiaux_ids: number[]): string[] {

    return materiaux_ids.map(id => this.materiauxNames.get(id) || 'Matériau inconnu');
  }
}
