import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../../Data/Commande';

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
  payment_status?: string;
  payment_reference?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/commandes';
  private userOrders = '/client';
  private stylistOrders = '/styliste';

  constructor(private http: HttpClient) {}

  getUserOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}${this.userOrders}/${userId}`);
  }

  getStylistOrders(stykistId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}${this.stylistOrders}/${stykistId}`);
  }

  updateOrderPaymentStatus(orderId: string, paymentData: {
    status: string;
    reference: string;
  }): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}userOrders/${orderId}`, {
      payment_status: paymentData.status,
      payment_reference: paymentData.reference
    });
  }

  changeOrderStatus(orderId: number){

  }
}
