import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionModel, SAMPLE_MODEL } from './model.interface';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ModelDetailComponent implements OnInit {
  model = SAMPLE_MODEL;
  currentImageIndex = signal(0);
  showOrderDialog = signal(false);

  currentImage = computed(() => this.model.images[this.currentImageIndex()]);

  constructor() {}

  ngOnInit(): void {}

  setCurrentImageIndex(index: number): void {
    this.currentImageIndex.set(index);
  }

  openOrderDialog(): void {
    this.showOrderDialog.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeOrderDialog(): void {
    this.showOrderDialog.set(false);
    document.body.style.overflow = '';
  }

  addToFavorites(): void {
    // Implement favorites logic
    console.log('Added to favorites');
  }

  contactDesigner(): void {
    // Implement WhatsApp redirect
    window.open(`https://wa.me/${this.model.designer.whatsapp}`, '_blank');
  }
}
