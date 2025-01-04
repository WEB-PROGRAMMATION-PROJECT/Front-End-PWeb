import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FashionModel, ModelComment} from './model.interface';
import {FormsModule} from '@angular/forms';
import {CategoryService} from '../../services/Articles/category.service';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ModelDetailComponent implements OnInit {
  model : FashionModel ;
  currentImageIndex = signal(0);
  showOrderDialog = signal(false);

  currentImage = computed(() => this.model?.images[this.currentImageIndex()] || this.model?.images[0]);

  constructor(private categoryService : CategoryService) {}

  ngOnInit(): void {

    // Charger les designers
    this.categoryService.getModelById('model-001').subscribe((data) => {
      this.model = data;
      console.log("les donnees recues : ", data.images);
    });
  }

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


  // ... autres propriétés existantes ...
  newComment = signal('');

  addComment(): void {
    if (this.newComment().trim()) {
      const comment: ModelComment = {
        id: `comment-${Date.now()}`,
        userId: 'current-user', // À remplacer par l'ID de l'utilisateur connecté
        userName: 'Vous',
        userAvatar: 'default-avatar.jpg',
        content: this.newComment(),
        createdAt: new Date().toISOString(),
        likes: 0
      };

      this.model.comments.unshift(comment);
      this.newComment.set('');
    }
  }

  likeComment(commentId: string): void {
    const comment = this.model.comments.find(c => c.id === commentId);
    if (comment) {
      comment.likes += 1;
    }
  }
}


