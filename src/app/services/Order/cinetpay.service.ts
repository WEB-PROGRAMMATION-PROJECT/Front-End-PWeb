import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environment';
export interface CinetPayResponse {
  code: string;
  message: string;
  description: string;
  data: {
    payment_token: string;
    payment_url: string;
  };
  api_response_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CinetPayService {
  private readonly API_URL = 'https://api-checkout.cinetpay.com/v2/payment';

  constructor(private http: HttpClient) {}

  initializePayment(paymentData: {
    phoneNumber: string;
    amount: number;
    orderId: string;
  }): Observable<CinetPayResponse> {
    const data = {
      apikey: environment.cinetpay.apiKey,
      site_id: environment.cinetpay.siteId,
      transaction_id: paymentData.orderId,
      amount: paymentData.amount,
      currency: 'XAF',
      description: `Paiement commande ${paymentData.orderId}`,
      customer_phone_number: paymentData.phoneNumber,
      channels: 'MOBILE_MONEY',
      notify_url: `${environment.apiUrl}/api/payment/notify`,
      return_url: `${environment.frontendUrl}/payment/return`,
      metadata: paymentData.orderId,
      lang: 'fr'
    };

    return this.http.post<CinetPayResponse>(this.API_URL, data);
  }
}
