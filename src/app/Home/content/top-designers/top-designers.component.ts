// top-designers.component.ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {NgForOf} from '@angular/common';
import {DesignerCardComponent} from '../../../widgets/designer-card/designer-card.component';

interface Designer {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  specialties: string[];
  collections: number;
  awards: number;
}

interface Promotion {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface Platform {
  title: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-top-designers',
  templateUrl: './top-designers.component.html',
  styleUrls: ['./top-designers.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    DesignerCardComponent
  ],

})
export class TopDesignersComponent implements OnInit {
  designers: Designer[] = [
    {
      id: 1,
      name: 'Claire Fontaine',
      role: 'Directrice Créative',
      location: 'Paris, France',
      image: 'tail.jpg',
      specialties: ['Haute Couture', 'Robes de Soirée', 'Sur Mesure'],
      collections: 24,
      awards: 7
    },
    {
      id: 2,
      name: 'Marco Bellini',
      role: 'Maître Tailleur',
      location: 'Milan, Italie',
      image: 'tail.jpg',
      specialties: ['Costumes', 'Tailleur Homme', 'Accessoires'],
      collections: 18,
      awards: 5
    },
    {
      id: 3,
      name: 'Sofia Chen',
      role: 'Designer Avant-garde',
      location: 'Shanghai, Chine',
      image: 'tail.jpg',
      specialties: ['Mode Contemporaine', 'Streetwear Luxe', 'Artisanat'],
      collections: 15,
      awards: 4
    },
    {
      id: 4,
      name: 'Elena Vasquez',
      role: 'Styliste Accessoires',
      location: 'Barcelone, Espagne',
      image: 'tail.jpg',
      specialties: ['Sacs à Main', 'Chaussures', 'Bijoux'],
      collections: 12,
      awards: 3
    }
  ];

  selectedDesigner: Designer | null = null;

  constructor() {}

  ngOnInit(): void {
    // Animation staggered delay
    this.designers.forEach((designer, index) => {
      setTimeout(() => {
        const element = document.getElementById(`designer-${designer.id}`);
        if (element) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      }, index * 200);
    });
  }

  selectDesigner(designer: Designer): void {
    this.selectedDesigner = designer;
  }
  getDesignerInitials(name: string): string {
    if (!name) return ''; // Vérifie si le nom est défini
    return name.split(' ').map(n => n[0]).join('').toUpperCase(); // Retourne les initiales en majuscules
  }

  promotions: Promotion[] = [
    {
      title: 'Gardez vos mensurations numériques',
      description: ' 100% Précis, 100% Fiable, 100% Sécurisé',
      image: 'expert2.jpg',
      link: '/expert'
    },
    {
      title: 'Notre Meilleur Modèle',
      description: 'Une Pièce Unique en Édition Limitée',
      image: 'model2.jpg',
      link: '/exclusive'
    }
  ];

  platformStats: Platform[] = [
    { title: 'Créateurs', value: '250+', icon: 'fas fa-users' },
    { title: 'Collections', value: '1.2k+', icon: 'fas fa-tshirt' },
    { title: 'Ventes', value: '45k+', icon: 'fas fa-shopping-bag' }
  ];

}
