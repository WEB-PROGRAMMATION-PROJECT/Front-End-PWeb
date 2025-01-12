import {Component, OnInit, signal, computed, inject, DestroyRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionModel, SAMPLE_MODEL } from './model.interface';
import {CommandeStoreService} from '../store/commande.store.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ModelDetailComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  model = SAMPLE_MODEL;
  currentImageIndex = signal(0);
  showOrderDialog = signal(false);

  currentImage = computed(() => this.model.images[this.currentImageIndex()]);

  constructor(private store: CommandeStoreService) {}

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
    this.store.createCommande({})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        console.log('Commande créée avec succès :', response);
      })
    window.open(`https://wa.me/${this.model.designer.whatsapp}`, '_blank');
  }
}
