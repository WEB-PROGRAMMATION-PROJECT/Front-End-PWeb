import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Order {
  id: string;
  date: String;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  total: number;
  styliste: string;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}
  // Récupérer tous les modèles
  getUserOrders(): Observable<Order[]> {
    console.log("appel de order", this.apiUrl+"userOrders");
    return this.http.get<Order[]>(this.apiUrl+"userOrders");
  }
}
