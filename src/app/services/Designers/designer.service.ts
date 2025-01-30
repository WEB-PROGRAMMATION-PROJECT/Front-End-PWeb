import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Designer {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  specialties: string[];
  collections: number;
  awards: number;
  rating: number;
  experience: number;
}
interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  href: string;
  description: string;
}
interface Materiaux {
  id: number;
  name: string;
  description: string;
}
interface Modele {
  id: number;
  name: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  description?: string;
  categorie_id: number;
  styliste_id: number;
  prix_min?: number;
  prix_max?: number;
  temps_min?: number;
  temps_max?: number;
  unite_temps?: string;
  materiaux_ids: number[];
}
@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  
  private apiUrl = 'http://localhost:8000/api/stylists'; // L'URL de votre API Laravel

  
  


  baseUrl = 'http://localhost:3000'; // URL de json-server
  private TopDesignersUrl = `${this.baseUrl}/TopDesigners`;
  private designersUrl = `${this.baseUrl}/designers`;

  private locationsUrl = `${this.baseUrl}/locations`;
  private specialtiesUrl = `${this.baseUrl}/specialties`;

  constructor(private http: HttpClient) {}

  getDesigners(): Observable<Designer[]> {
    return this.http.get<Designer[]>(this.designersUrl);
  }
  getStylists(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getStylistById(id: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/stylist-profile/${id}`);
  }

  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(this.locationsUrl);
  }

  getSpecialties(): Observable<string[]> {
    return this.http.get<string[]>(this.specialtiesUrl);
  }
  // Récupérer les designers
  getTopDesigners(): Observable<Designer[]> {
    return this.http.get<Designer[]>(this.TopDesignersUrl);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://127.0.0.1:8000/api/categories');  // Renvoie un tableau d'objets de type Category
  }

  getMateriaux(): Observable<Materiaux[]> {
    return this.http.get<Materiaux[]>('http://127.0.0.1:8000/api/materiaux');
  }
  addModel(modelData: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/addmodel`, modelData);
  }
  getModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(`http://127.0.0.1:8000/api/modeles`,);
  }
   // Récupérer les matériaux par IDs
   
  getMateriauxByIds(id: number): Observable<Materiaux>  {
    return this.http.get<Materiaux>(`http://127.0.0.1:8000/api/materiaux/${id}`);
  }
   // Récupérer un modèle par son ID
   getModeleById(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/modeles/${id}`);
  }
  
}
