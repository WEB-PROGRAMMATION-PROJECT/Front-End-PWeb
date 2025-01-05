import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Notification {
  id: number;
  message: string;
  date: Date;
  read: boolean;
}

interface Model {
  name: string;
  description: string;
  category: string;
  price: number;
  image: File | null;
  imagePreview?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notifications: Notification[] = [];
  newModel: Model = {
    name: '',
    description: '',
    category: '',
    price: 0,
    image: null
  };

  ngOnInit() {
    this.notifications = [
      {
        id: 1,
        message: 'Nouvelle commande reçue',
        date: new Date(),
        read: false
      },
      {
        id: 2,
        message: 'Rendez-vous client confirmé',
        date: new Date(),
        read: false
      }
    ];
  }

  markAsRead(notification: Notification) {
    notification.read = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newModel.image = file;
      // Créer une preview de l'image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newModel.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitModel() {
    console.log('Nouveau modèle ajouté:', this.newModel);
    // Réinitialiser le formulaire
    this.newModel = {
      name: '',
      description: '',
      category: '',
      price: 0,
      image: null,
      imagePreview: undefined
    };
  }
}