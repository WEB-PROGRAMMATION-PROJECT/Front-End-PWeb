import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  id: string;
  date: String;
  status: 'pending' | 'processing_payment' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
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
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl + "userOrders");
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
}
