import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DesignerCardComponent } from '../../widgets/designer-card/designer-card.component';
import { DesignerService } from '../../services/Designers/designer.service';

interface Designer {
  id: number;
  user_id?: number;
  phone_number?: string;
  specializations?: { display: string, value: string }[];  // Optionnel
  titre?: string | null;
  description: string;
  profile_picture_url?: string | null;
  cover_image_url?: string | null;
  image?: string;  // Propriété image ajoutée
  points: number;
  collections: number;
  awards: number;
  rating: string;
  experience?: number;  // Ajout de la propriété expérience si vous souhaitez l'utiliser dans le tri
  response_time?: string | null;
  completed_orders: number;
  social_links?: string | null;
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
  selector: 'app-designers-page',
  standalone: true,
  imports: [CommonModule, FormsModule, DesignerCardComponent, NgSelectModule],
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

  specialtiesList: string[] = [];
  locationsList: string[] = [];

  sortOptions = [
    { value: 'rating', label: 'Meilleure Note' },
    { value: 'collections', label: 'Plus de Collections' },
    { value: 'experience', label: 'Plus d\'Expérience' },
    { value: 'awards', label: 'Plus de Prix' }
  ];

  constructor(private designerService: DesignerService) {}

  ngOnInit() {
    // Récupérer les stylistes, les localisations et les spécialités depuis le service
    this.designerService.getStylists().subscribe(data => {
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
      const matchesSearch = designer.user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        designer.titre?.toLowerCase().includes(this.searchTerm.toLowerCase());
  
      // Handle specializations comparison
      const matchesSpecialties = this.selectedSpecialties.length === 0 ||
        this.selectedSpecialties.some(selected => 
          designer.specializations?.some(specialty => specialty.display === selected)
        );
  
      const matchesLocation = !this.selectedLocation ||
        designer.user.address === this.selectedLocation;
  
      return matchesSearch && matchesSpecialties && matchesLocation;
    });
  
    this.sortDesigners();
  }
  

  sortDesigners() {
    this.filteredDesigners.sort((a, b) => {
      switch (this.sortOption) {
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating); // Assurez-vous que la valeur est bien un nombre
        case 'collections':
          return b.collections - a.collections;
        case 'experience':
          return (b.experience || 0) - (a.experience || 0); // Tri par expérience
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
