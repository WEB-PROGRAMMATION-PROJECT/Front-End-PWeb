// top-designers.component.ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {NgForOf} from '@angular/common';
import {DesignerCardComponent} from '../../../widgets/designer-card/designer-card.component';
import {HomeDataServiceService} from '../../../services/Home/home-data-service.service';

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

  ];

  promotions: Promotion[] = [
  ];


  selectedDesigner: Designer | null = null;

  constructor(private homeDataService : HomeDataServiceService) {}

  ngOnInit(): void {
    // Charger les designers
    this.homeDataService.getTopDesigners().subscribe((data) => {
      this.designers = data;
    });

    // Charger les promotions
    this.homeDataService.getPromotions().subscribe((data) => {
      this.promotions = data;
    });
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


  platformStats: Platform[] = [
    { title: 'Créateurs', value: '250+', icon: 'fas fa-users' },
    { title: 'Collections', value: '1.2k+', icon: 'fas fa-tshirt' },
    { title: 'Ventes', value: '45k+', icon: 'fas fa-shopping-bag' }
  ];

}
