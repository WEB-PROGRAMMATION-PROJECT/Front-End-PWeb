// designers-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {DesignerCardComponent} from '../../widgets/designer-card/designer-card.component';

interface Designer {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  specialties: string[];
  collections: number;
  awards: number;
  rating: number;
  experience: number;
}

@Component({
  selector: 'app-designers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DesignerCardComponent, NgSelectModule, DesignerCardComponent],
  templateUrl: './designers-page.component.html',
  styleUrls: ['./designers-page.component.scss']
})
export class DesignersPageComponent implements OnInit {
  designers: Designer[] = [];
  filteredDesigners: Designer[] = [];
  searchTerm: string = '';
  selectedSpecialties: string[] = [];
  selectedLocation: string = '';
  sortOption: string = 'rating';

  specialtiesList: string[] = [
    'Haute Couture', 'Prêt-à-porter', 'Mode Traditionnelle',
    'Robes de Mariée', 'Costumes sur Mesure', 'Mode Éthique'
  ];

  locationsList: string[] = [
    'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille'
  ];

  sortOptions = [
    { value: 'rating', label: 'Meilleure Note' },
    { value: 'collections', label: 'Plus de Collections' },
    { value: 'experience', label: 'Plus d\'Expérience' },
    { value: 'awards', label: 'Plus de Prix' }
  ];

  ngOnInit() {
    // Simuler les données (à remplacer par un appel API)
    this.designers = this.getMockDesigners();
    this.applyFilters();
  }

  getMockDesigners(): Designer[] {
    return Array(12).fill(null).map((_, index) => ({
      id: index + 1,
      name: `Designer ${index + 1}`,
      role: 'Styliste Haute Couture',
      location: this.locationsList[Math.floor(Math.random() * this.locationsList.length)],
      image: `tail.jpg`,
      specialties: Array(3).fill(null).map(() =>
        this.specialtiesList[Math.floor(Math.random() * this.specialtiesList.length)]
      ),
      collections: Math.floor(Math.random() * 20) + 5,
      awards: Math.floor(Math.random() * 10),
      rating: Math.random() * 2 + 3,
      experience: Math.floor(Math.random() * 15) + 2
    }));
  }

  applyFilters() {
    this.filteredDesigners = this.designers.filter(designer => {
      const matchesSearch = designer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        designer.role.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesSpecialties = this.selectedSpecialties.length === 0 ||
        this.selectedSpecialties.some(s => designer.specialties.includes(s));

      const matchesLocation = !this.selectedLocation ||
        designer.location === this.selectedLocation;

      return matchesSearch && matchesSpecialties && matchesLocation;
    });

    // Tri
    this.filteredDesigners.sort((a, b) => {
      switch (this.sortOption) {
        case 'rating':
          return b.rating - a.rating;
        case 'collections':
          return b.collections - a.collections;
        case 'experience':
          return b.experience - a.experience;
        case 'awards':
          return b.awards - a.awards;
        default:
          return 0;
      }
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSpecialtiesChange() {
    this.applyFilters();
  }

  onLocationChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }
}
