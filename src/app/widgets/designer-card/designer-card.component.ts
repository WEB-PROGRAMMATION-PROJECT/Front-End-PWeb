import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Designer {
  id: number;
  user_id?: number;  // Optionnel
  phone_number?: string;  // Optionnel
  specializations?: { display: string, value: string }[];  // Optionnel
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
    // Check if specializations exists and is an array
    if (Array.isArray(this.designer?.specializations)) {
      return this.designer.specializations.map(specialization => specialization.display);
    } else {
      return []; // Return an empty array if it's not an array or is undefined
    }
  }
  

  /**
   * Gestion du clic sur le bouton "Découvrir".
   */
  onDiscoverClick(): void {
    console.log('Discover clicked for:', this.designer?.user.first_name);
  }
}