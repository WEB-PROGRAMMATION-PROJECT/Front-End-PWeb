// clothing-model-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CurrencyPipe, NgForOf} from '@angular/common';

interface ClothingModel {
  id: number;
  name: string;
  designer: string;
  price: number;
  imageUrl: string;
  category: string;
  materials: string[];
  estimatedTime: number;
  availableSizes: string[];
}

@Component({
  selector: 'app-clothing-model-card',
  templateUrl: './clothing-model-card.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  styleUrls: ['./clothing-model-card.component.css']
})
export class ClothingModelCardComponent {
  @Input() model?: ClothingModel;
  @Output() order = new EventEmitter<number>();

  isHovered = false;

  onOrderClick(): void {
    if (this.model) {
      this.order.emit(this.model.id);
    }
  }
}
