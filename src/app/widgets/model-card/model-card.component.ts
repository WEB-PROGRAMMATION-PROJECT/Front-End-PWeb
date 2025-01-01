import {Component, Input} from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
interface Model {
  id: number;
  name: string;
  image: string;
  designer: string;
  price: number;
  category: string;
}
@Component({
  selector: 'app-model-card',
  imports: [
    CommonModule,
  ],
  templateUrl: './model-card.component.html',
  standalone: true,
  styleUrl: './model-card.component.css'
})
export class ModelCardComponent {
  @Input() model?: Model;
  isSelected = false;
  private selectedModel: any;

  onDiscoverClick(): void {
    // Implement click handling
    console.log('Discover clicked for:', this.model?.name);
  }
  selectDesigner(model: Model): void {
    this.selectedModel = model;
  }

}
