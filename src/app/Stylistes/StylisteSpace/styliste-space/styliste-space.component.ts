// styliste-space.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface StylisteInfo {
  id: number;
  nom: string;
  email: string;
  avatar: string;
  role: string;
  location: string;
  experience: number;
  collections: number;
  awards: number;
  rating: number;
  completedOrders: number;
}

@Component({
  selector: 'app-styliste-space',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './styliste-space.component.html',
  styleUrls: ['./styliste-space.component.css']
})
export class StylisteSpaceComponent implements OnInit {
  stylisteInfo: StylisteInfo = {
    id: 1,
    nom: 'Claire Fontaine',
    email: 'claire.fontaine@email.com',
    avatar: 'test.jpg',
    role: 'Directrice Créative',
    location: 'Paris, France',
    experience: 10,
    collections: 24,
    awards: 7,
    rating: 4.8,
    completedOrders: 156
  };

  constructor() {}

  ngOnInit() {
    // Plus tard, nous ajouterons ici la récupération des données depuis le service
  }

  onLogout() {
    console.log('Déconnexion');
    // Implémentation de la déconnexion
  }
}
