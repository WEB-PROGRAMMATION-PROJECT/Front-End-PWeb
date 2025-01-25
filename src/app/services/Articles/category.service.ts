import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FashionModel, ModelComment} from '../../Products/model-detail/model.interface';

export interface Category {
  id: number;
  name: string;
  href: string;
}

interface ClothingModel {
  id: number;
  name: string;
  designer: any;
  price: number;
  imageUrl: string;
  category: string;
  materials: string[];
  estimatedTime: number;
  availableSizes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl+"/categories");
  }



  // Récupérer tous les modèles
  getModels(): Observable<FashionModel[]> {
    return this.http.get<FashionModel[]>(this.apiUrl+"fashionModel");
  }

  // Récupérer un modèle spécifique
  getModelById(id: string): Observable<FashionModel> {
    let url = `${this.apiUrl + "fashionModel"}/${id}`
    console.log('appel de l\'url : ', url);
    return this.http.get<FashionModel>(url);
  }
  // Récupérer les modèles de vêtements
  getClothingModels(): Observable<ClothingModel[]> {
    return this.http.get<ClothingModel[]>(`${this.apiUrl}clothingModels`);
  }

  // Ajouter un nouveau modèle (si nécessaire)
  addModel(model: FashionModel): Observable<FashionModel> {
    return this.http.post<FashionModel>(this.apiUrl+"fashionModel", model);
  }

  // Ajouter un commentaire à un modèle
  addComment(modelId: string, comment: ModelComment): Observable<ModelComment> {
    return this.http.post<ModelComment>(`${this.apiUrl}/${modelId}/comments`, comment);
  }





  // Récupérer les designers
  getDesigners(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}designers`);
  }



}



