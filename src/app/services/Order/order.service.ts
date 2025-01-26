import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../../Data/Commande';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8000/api/commandes';
  private userOrders = '/client';
  private stylistOrders = '/styliste';

  constructor(private http: HttpClient) {}

  getUserOrders(userId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}${this.userOrders}/${userId}`);
  }

  getStylistOrders(stykistId: number): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}${this.stylistOrders}/${stykistId}`);
  }

  updateOrderPaymentStatus(orderId: string, paymentData: {
    status: string;
    reference: string;
  }): Observable<Commande> {
    return this.http.patch<Commande>(`${this.apiUrl}userOrders/${orderId}`, {
      payment_status: paymentData.status,
      payment_reference: paymentData.reference
    });
  }

  changeOrderStatus(orderId: number){

  }
}
