import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Designer {
  id: number;
  user_id?: number;  // Optionnel
  phone_number?: string;  // Optionnel
  specializations?:string | { display: string, value: string }[];  // Optionnel
  titre?: string | null;  // Optionnel
  description: string;
  profile_picture_url?: string | null;  // Optionnel
  cover_image_url?: string | null;  // Optionnel
  points: number;
  collections: number;
  awards: number;
  rating: string;
  response_time?: string | null;  // Optionnel
  completed_orders: number;
  social_links?: string | null;  // Optionnel
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    city: string;
    address: string;
    user_type: string;
    terms_accepted: number;
  };
}


@Component({
  selector: 'app-designer-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './designer-card.component.html',
  styleUrls: ['./designer-card.component.css']
})
export class DesignerCardComponent {
  @Input() designer?: Designer;
  isSelected = false;

  constructor(private router: Router) {}

  /**
   * Construire une URL complète pour la photo de profil.
   * @returns URL complète ou image par défaut
   */
  ngOnInit(): void {
    // Vérifier si la valeur de la photo de profil est bien reçue
    console.log('Photo de profil reçue:', this.designer?.profile_picture_url);
  }
  getProfilePhotoUrl(): string {
    
    const baseUrl = 'http://127.0.0.1:8000/storage/';
    
    return this.designer?.profile_picture_url
    ? `${baseUrl}${this.designer.profile_picture_url}`
    : 'default-profile.jpg';
      
  }

  /**
   * Obtenir les initiales du designer.
   * @param name Nom complet
   * @returns Initiales
   */
  getDesignerInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  getSpecializationsDisplay(): string[] {
    if (!this.designer?.specializations) {
      return [];
    }
  
    // Vérifie si specializations est une chaîne, et la parse si nécessaire
    try {
      const specializations = typeof this.designer.specializations === 'string' 
        ? JSON.parse(this.designer.specializations)
        : this.designer.specializations;
  
      // Retourne uniquement les valeurs "display"
      return specializations.map((specialty: { display: string }) => specialty.display);
    } catch (error) {
      console.error('Erreur lors du parsing des specializations :', error);
      return [];
    }
  }
  
  
/**
 * Gestion du clic sur le bouton "Découvrir".
 * @param designer - L'objet contenant les informations du styliste.
 */
onDiscoverClick(designer: any): void {
  // Vérification si le designer est défini et possède un ID
  if (!designer || !designer.user_id) {
    console.error('Erreur : Designer invalide ou ID manquant', designer);
    return;
  }

  // Affiche l'ID et d'autres informations utiles dans la console pour debug
  console.log('Découvrir : navigation vers le styliste avec ID =', designer.user_id);
  console.log('Nom du styliste :', designer?.user?.first_name || 'Nom non défini');

  // Redirection vers la page du styliste
  this.router.navigate(['/styliste-profile', designer.user_id]).then((success) => {
    if (success) {
      console.log('Navigation réussie vers /styliste-profile/', designer.user_id);
    } else {
      console.error('La navigation a échoué.');
    }
  }).catch((error) => {
    console.error('Erreur lors de la navigation :', error);
  });
}

}