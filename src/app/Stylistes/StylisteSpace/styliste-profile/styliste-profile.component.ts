// styliste-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../../../services/backend.service';

interface Specialization {
  display: string;
  value: string;
}

interface StylisteProfile {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  phone: string;
  whatsapp: string;
  role: string;
  location: string;
  experience: number;
  bio: string;
  photo_profil: string;
  cover_photo: string;
  specialites: Specialization[];
  collections: number;
  awards: number;
  rating: number;
  completed_orders: number;
  response_time: string;
  social_media: {
    instagram?: string;
    pinterest?: string;
    facebook?: string;
  };
}
@Component({
  selector: 'app-styliste-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './styliste-profile.component.html',
  styleUrls: ['./styliste-profile.component.scss']
})
export class StylisteProfileComponent implements OnInit {
  isEditing: boolean = false;
  stylisteProfile: StylisteProfile = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    whatsapp: '',
    role: '',
    location: '',
    experience: 0,
    bio: '',
    photo_profil: '',
    cover_photo: '',
    specialites: [],
    collections: 0,
    awards: 0,
    rating: 0,
    completed_orders: 0,
    response_time: '',
    social_media: {}
  };

  constructor(private backendService: BackendService) {}
  user: any;
  private getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id;
  }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    
    const stylistId = this.getUserId();
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = userData;
    // Appel au backend pour récupérer les données du profil
    this.backendService.getStylistProfile(stylistId).subscribe(
      (data) => {
        let specializations: Specialization[] = [];

        // Vérifier si 'specializations' est bien une chaîne JSON
        if (data.specializations) {
          try {
            const parsed = JSON.parse(data.specializations);
            if (Array.isArray(parsed)) {
              specializations = parsed;
            }
          } catch (error) {
            console.error('Erreur de parsing des spécialités:', error);
          }
        }
        let socialLinks = {};
      if (data.social_links) {
        try {
          socialLinks = JSON.parse(data.social_links);
        } catch (error) {
          socialLinks = {};
        }
      }
        // Assigner les données reçues au modèle
        this.stylisteProfile = {
          id: data.id,  // Id du styliste
          nom: `${this.user.first_name} ${this.user.last_name}`,  // Nom du styliste
          prenom: this.user.first_name,  // Prénom
          email: this.user.email || 'Email non disponible',  // Email
          phone: data.phone_number || 'Non renseigné',  // Numéro de téléphone
          whatsapp: data.whatsapp || 'Non renseigné',  // WhatsApp (si disponible)
          role: data.titre || 'Styliste',  // Titre
          location: this.user.address || 'Adresse non renseignée',  // Adresse
          experience: data.experience || 0,  // Expérience (si elle existe)
          bio: data.description || 'Aucune description disponible',  // Description
          photo_profil: data.profile_picture_url 
            ? `http://127.0.0.1:8000/storage/${data.profile_picture_url}` 
            : 'default-profile.jpg',  // Photo de profil
          cover_photo: data.cover_image_url || `http://127.0.0.1:8000/storage/${data.profile_picture_url}`,  // Photo de couverture
          specialites: specializations,  // Spécialités
          collections: data.collections || 0,  // Nombre de collections
          awards: data.awards || 0,  // Nombre de récompenses
          rating: data.rating || 0,  // Note
          completed_orders: data.completed_orders || 0,  // Commandes complétées
          response_time: data.response_time || 'Non renseigné',  // Temps de réponse
          social_media: socialLinks,  // Réseaux sociaux
        };
        
        // Si vous avez d'autres champs à traiter (par exemple les avis, créations), ajoutez-les ici.
      },
      (error) => {
        console.error('Erreur lors de la récupération des données du styliste :', error);
      }
    );
  }
  

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
// Sauvegarder les modifications du profil
saveProfile() {
  const stylistId = this.getUserId();
  const updatedProfile = {
    id: this.stylisteProfile.id,
    user_id: stylistId,
    phone_number: this.stylisteProfile.phone,
    whatsapp: this.stylisteProfile.whatsapp,
    description: this.stylisteProfile.bio,
    titre: this.stylisteProfile.role,
    specializations: JSON.stringify(this.stylisteProfile.specialites),
    social_links: JSON.stringify(this.stylisteProfile.social_media), 
    // Ajouter d'autres champs que vous voulez sauvegarder
  };

  // Appel à la méthode du backend pour enregistrer les modifications
  this.backendService.updateStylistProfile(stylistId, updatedProfile).subscribe(
    (response) => {
      console.log('Profil mis à jour avec succès:', response);
      // Vous pouvez afficher un message de succès ou rediriger vers une autre page
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  );
}

// Mise à jour de la photo de profil
updateProfilePhoto(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append('profile_picture', file);

    const stylistId = this.getUserId();
    this.backendService.updateProfilePhoto(stylistId, formData).subscribe(
      (response) => {
        // Mettre à jour l'URL de la photo de profil après succès
        this.stylisteProfile.photo_profil = response.profile_picture_url;
        console.log('Photo de profil mise à jour:', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la photo de profil:', error);
      }
    );
  }
}

updateCoverPhoto(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const formData = new FormData();
    formData.append('cover_photo', file);

    const stylistId = this.getUserId();
    this.backendService.updateCoverPhoto(stylistId, formData).subscribe(
      (response) => {
        // Mettre à jour l'URL de la photo de couverture après succès
        this.stylisteProfile.cover_photo = response.cover_image_url;
        console.log('Photo de couverture mise à jour:', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la photo de couverture:', error);
      }
    );
  }
}
}