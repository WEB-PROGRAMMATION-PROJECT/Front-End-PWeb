import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Designer {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  specialties: string[];
  collections: number;
  awards: number;
}

export interface Promotion {
  title: string;
  description: string;
  image: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeDataServiceService  {
  private baseUrl = 'http://localhost:3000'; // URL de json-server

  constructor(private http: HttpClient) {}

  // Récupérer les designers
  getTopDesigners(): Observable<Designer[]> {
    return this.http.get<Designer[]>(`${this.baseUrl}/TopDesigners`);
  }

  // Récupérer les promotions
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.baseUrl}/promotions`);
  }

  // Récupérer les catégories (si nécessaire)
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  // Récupérer les models populaire (si nécessaire)
  getTopModels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/topModels`);
  }
}
