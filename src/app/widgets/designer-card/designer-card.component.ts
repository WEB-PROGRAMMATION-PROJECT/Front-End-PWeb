// designer-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  private selectedDesigner: any;

  getDesignerInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  onDiscoverClick(): void {
    // Implement click handling
    console.log('Discover clicked for:', this.designer?.name);
  }
  selectDesigner(designer: Designer): void {
    this.selectedDesigner = designer;
  }
}
