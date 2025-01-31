import { Component, Input, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/Articles/category.service';
import { DesignerService } from '../../services/Designers/designer.service';
import { FashionModel, ModelComment } from './model.interface';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {CommandeStoreService} from '../store/commande.store.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'


interface Modele {
  id: number;
  name: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
 
  description?: string;
  categorie_id: number;
  styliste_id: number;
  prix_min?: number;
  prix_max?: number;
  temps_min?: number;
  temps_max?: number;
  unite_temps?: string;
  materiaux_ids: number[];
  comments: ModelComment[];  // Ajouté pour s'assurer que `comments` est bien défini
  designer: { whatsapp: string };  // Ajouté pour l'accès au numéro WhatsApp
}

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModelDetailComponent implements OnInit {
  @Input() model?: Modele;
  categorie: Map<number, string> = new Map();
  imageList:any = [];
  stylisteNames: Map<number, string> = new Map();
  materiauxNames: Map<number, string> = new Map();
  stylisteDetails: Map<number, any> = new Map();  // Pour stocker les informations détaillées sur le styliste
  materiauxDetails: Map<number, any> = new Map();  // Pour stocker les informations détaillées sur les matériaux


  currentImageIndex: number = 0;  // Utilisation d'une variable classique au lieu de signal
  showOrderDialog = signal(false);
  newComment = signal('');
  stylistProfilePictureUrl: string;
  whatsapp_styliste:string;
  constructor(private route: ActivatedRoute, private clothingModelService: DesignerService,private store: CommandeStoreService, private destroyRef: DestroyRef ) {}


  categoryService: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const modelId = +params['id'];
      console.log('ID du modèle sélectionné :', modelId);

      if (!isNaN(modelId)) {
        this.loadModelData(modelId);
        this.loadCategories();
        this.loadStylists();
        this.loadMaterials();
      } else {
        console.warn('⚠️ ID du modèle invalide.');
      }
    });
  }
   /** Charger les détails du modèle */
   loadModelData(modelId: number): void {
    this.clothingModelService.getModeleById(modelId).subscribe(
      (model) => {
        this.model = model;
        console.log('Modèle chargé :', this.model);

        // Charger les images après récupération
        this.imageList = [
          this.model.image1,
          this.model.image2,
          this.model.image3,
          this.model.image4,
          this.model.image5,
        ]
          .filter((img) => img)
          .map((img) => `http://127.0.0.1:8000/storage/${img.trim()}`);
          
      },
      (error) => {
        console.error('Erreur lors du chargement du modèle:', error);
      }
    );
  }

  /** Charger les stylistes */
  loadStylists(): void {
    this.clothingModelService.getStylists().subscribe((designers) => {
      this.stylisteNames = new Map(
        designers.map((designer: any) => [designer.id, designer.user.first_name])
      );

      designers.forEach((designer: any) => {
        const profileUrl = `http://127.0.0.1:8000/storage/${designer.profile_picture_url}`;
const phone = designer.phone_number;
        this.stylisteDetails.set(designer.id, {
          profile_picture_url: profileUrl,
          description: designer.description,
          rating: designer.rating,
          phone_number: designer.phone_number,
          completed_orders: designer.completed_orders,
          specializations: this.getSpecializationsDisplay(designer.specializations),
        });

        // Si c'est le styliste actuel, mettre à jour la variable
        if (designer.id === this.model?.styliste_id) {
          this.stylistProfilePictureUrl = profileUrl;
          this.whatsapp_styliste=phone;
        }
      });

    });
}


  /** Charger les catégories */
  loadCategories(): void {
    this.clothingModelService.getCategories().subscribe((categories) => {
      this.categorie = new Map(categories.map((category: any) => [category.id, category.name]));
      console.log('Categories loaded:', Array.from(this.categorie.entries()));
    });
  }

  /** Charger les matériaux */
  loadMaterials(): void {
    this.clothingModelService.getMateriaux().subscribe((materiaux) => {
      materiaux.forEach((materiau: any) => {
        this.materiauxDetails.set(materiau.id, {
          name: materiau.name,
          description: materiau.description,
        });
        this.materiauxNames.set(materiau.id, materiau.name);
      });
    });
  }

 
  getSpecializationsDisplay(specializations: string | any[]): string[] {
    if (!specializations) {
      
      return [];
    }

    try {
      const parsedSpecializations = typeof specializations === 'string'
        ? JSON.parse(specializations)
        : specializations;
        

      return parsedSpecializations.map((specialty: { display: string }) => specialty.display);
    } catch (error) {
      console.error('Erreur lors du parsing des specializations :', error);
      return [];
    }
  }

  getStylisteName(styliste_id: number): string {
    return this.stylisteNames.get(styliste_id) || 'Styliste inconnu';
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

  getStylisteDetails(styliste_id: number) {
    return this.stylisteDetails.get(styliste_id);
  }

  getMateriauxDetails(materiau_id: number) {
    return this.materiauxDetails.get(materiau_id);
  }

  // Méthode pour obtenir l'image actuelle en fonction de l'index
  get currentImage(): { url: string; alt: string } | null {
    if (!this.imageList || this.imageList.length === 0) {
      console.warn('Aucune image trouvée pour ce modèle.');
      return null;
    }
    console.log('Image actuelle :', this.imageList[this.currentImageIndex]);
    return { url: this.imageList[this.currentImageIndex], alt: `Image ${this.currentImageIndex + 1}` };
  }
  
  // Méthode pour définir l'index de l'image actuelle
  setCurrentImageIndex(index: number): void {
    this.currentImageIndex = index;
  }


 

  addToFavorites(): void {
    // Implémentez la logique d'ajout aux favoris
    console.log('Added to favorites');
  }

  contactDesigner(): void {
  
        if (this.model?.designer?.whatsapp) {
          window.open(`https://wa.me/${this.whatsapp_styliste}`, '_blank');
        }
 
        // Implement WhatsApp redirect
        this.store.createCommande({})
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(response => {
            console.log('Commande créée avec succès :', response);
          })
        window.open(`https://wa.me/${this.whatsapp_styliste}`, '_blank');

      }

  Commentaires
  
  openOrderDialog(): void {
    this.showOrderDialog.set(true);
    document.body.style.overflow = 'hidden';
  }
  
  closeOrderDialog(): void {
    this.showOrderDialog.set(false);
    document.body.style.overflow = '';
  }
  
  addComment(): void {
    if (this.newComment().trim()) {
      const comment: ModelComment = {
        id: `comment-${Date.now()}`,
        userId: 'current-user', // À remplacer par l'ID de l'utilisateur connecté
        userName: 'Vous',
        userAvatar: 'default-avatar.jpg',
        content: this.newComment(),
        createdAt: new Date().toISOString(),
        likes: 0
      };
  
      if (this.model) {
        this.model.comments.unshift(comment);
        this.newComment.set(''); // Réinitialiser le champ commentaire
      }
    }
  }
  

  likeComment(commentId: string): void {
    const comment = this.model?.comments.find(c => c.id === commentId);
    if (comment) {
      comment.likes += 1;
    }
  }
}
