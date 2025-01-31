import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { DesignerService } from '../../services/Designers/designer.service';
import { Router } from '@angular/router';
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
  selector: 'app-clothing-model-card',
  templateUrl: './clothing-model-card.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
  ],
  styleUrls: ['./clothing-model-card.component.css']
})
export class ClothingModelCardComponent implements OnInit {
  @Input() model?: Modele;
  @Output() order = new EventEmitter<number>();
  
  // Map pour stocker les noms des stylistes et des catégories
  categorie: Map<number, string> = new Map();
  stylisteNames: Map<number, string> = new Map();
  materiauxNames: Map<number, string> = new Map();
  
  constructor(private router: Router,private clothingModelService: DesignerService) {}

  ngOnInit(): void {

    if (this.model) {
      // Formater l'URL de l'image1
      this.model.image1 = `http://127.0.0.1:8000/storage/${this.model.image1}`;
      // Vous pouvez ajouter des formattages similaires pour image2, image3, etc. si nécessaire
      this.model.image2 = `http://127.0.0.1:8000/storage/${this.model.image2}`;
      this.model.image3 = `http://127.0.0.1:8000/storage/${this.model.image3}`;
      this.model.image4 = `http://127.0.0.1:8000/storage/${this.model.image4}`;
      this.model.image5 = `http://127.0.0.1:8000/storage/${this.model.image5}`;
    }
    // Charger les stylistes
    this.clothingModelService.getStylists().subscribe(designers => {
      // Peupler le Map avec les IDs des stylistes et leurs noms
      this.stylisteNames = new Map(designers.map((designer: any) => [designer.id, designer.user.first_name]));
    });

    // Charger les catégories
    this.clothingModelService.getCategories().subscribe(categories => {
      // Peupler le Map avec les IDs des catégories et leurs noms
      this.categorie = new Map(categories.map((category: any) => [category.id, category.name]));
      console.log('Categories loaded:', Array.from(this.categorie.entries()));  // Pour vérifier le mappage
    });
    // Charger les matériaux
    this.clothingModelService.getMateriaux().subscribe(materiaux => {
      // Peupler la Map avec les IDs des matériaux et leurs noms
      this.materiauxNames = new Map(materiaux.map((materiau: any) => [materiau.id, materiau.name]));
      console.log('Categories loaded:', Array.from(this.materiauxNames.entries())); 
    });
  }

  getStylisteName(styliste_id: number): string {
    const name = this.stylisteNames.get(styliste_id);
    return name || 'Styliste inconnu';
  }

  getCategoryName(categorie_id: number): string {
    return this.categorie.get(categorie_id) || 'Catégorie inconnue';
  }

  getMateriauxNames(materiaux_ids: string | number[]): string[] {
    // Vérifier si materiaux_ids est une chaîne et la convertir en tableau
    if (typeof materiaux_ids === 'string') {
      materiaux_ids = JSON.parse(materiaux_ids);
    }
  
    return (Array.isArray(materiaux_ids) ? materiaux_ids : []).map(id => this.materiauxNames.get(id) || 'Matériau inconnu');
  }
  isHovered = false;

  onOrderClick(): void {
    if (this.model) {
      this.order.emit(this.model.id);
      this.router.navigate(['/detail', this.model.id]).then((success) => {
        if (success) {
          console.log('Navigation réussie vers /detail/', this.model.id);
        } else {
          console.error('La navigation a échoué.');
        }
      }).catch((error) => {
        console.error('Erreur lors de la navigation :', error);
      });
    }
    // Redirection vers la page du styliste
    
  }
}
