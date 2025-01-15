// designers-page.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {DesignerCardComponent} from '../../widgets/designer-card/designer-card.component';
import {DesignerService} from '../../services/Designers/designer.service';

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

  ];

  locationsList: string[] = [
  ];

  sortOptions = [
    { value: 'rating', label: 'Meilleure Note' },
    { value: 'collections', label: 'Plus de Collections' },
    { value: 'experience', label: 'Plus d\'Expérience' },
    { value: 'awards', label: 'Plus de Prix' }
  ];
  constructor(private designerService: DesignerService) {
  }

  ngOnInit() {
    // Récupérer les stylistes, les localisations et les spécialités depuis JSON Server
    this.designerService.getDesigners().subscribe(data => {
      this.designers = data;
      this.applyFilters();
    });

    this.designerService.getLocations().subscribe(data => {
      this.locationsList = data;
    });

    this.designerService.getSpecialties().subscribe(data => {
      this.specialtiesList = data;
    });
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
