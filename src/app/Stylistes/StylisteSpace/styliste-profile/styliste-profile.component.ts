// styliste-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  specialites: string[];
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
    id: 1,
    nom: 'Dubois',
    prenom: 'Marie',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    whatsapp: '+33 6 12 34 56 78',
    role: 'Styliste Haute Couture',
    location: 'Paris, France',
    experience: 8,
    bio: 'Passionnée par la haute couture depuis plus de 8 ans, je crée des pièces uniques qui allient élégance et modernité. Spécialisée dans les robes de soirée et les tenues sur mesure.',
    photo_profil: 'test.jpg',
    cover_photo: 'coverStyliste.jpg',
    specialites: ['Robes de soirée', 'Haute couture', 'Tenues sur mesure'],
    collections: 12,
    awards: 3,
    rating: 4.8,
    completed_orders: 157,
    response_time: '< 24h',
    social_media: {
      instagram: 'marie_dubois_couture',
      pinterest: 'mariedubois_style',
      facebook: 'MarieDuboisCouture'
    }
  };

  constructor() {}

  ngOnInit() {
    // Plus tard, on chargera les données depuis un service
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    // Implémentation de la sauvegarde
    this.isEditing = false;
    console.log('Profil sauvegardé:', this.stylisteProfile);
  }

  updateProfilePhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Simuler le changement de photo
      const reader = new FileReader();
      reader.onload = (e) => {
        this.stylisteProfile.photo_profil = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateCoverPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Simuler le changement de photo de couverture
      const reader = new FileReader();
      reader.onload = (e) => {
        this.stylisteProfile.cover_photo = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
