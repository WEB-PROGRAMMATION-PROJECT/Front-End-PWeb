import { Injectable } from '@angular/core';
import {environment} from '../../../../environment';

declare var CinetPay: any;

@Injectable({
  providedIn: 'root'
})
export class CinetPayService {
  constructor() {
    // Initialiser la configuration CinetPay
    CinetPay.setConfig({
      apikey: environment.cinetpay.apiKey,
      site_id: environment.cinetpay.siteId,
      mode: 'PRODUCTION',
      notify_url: `${environment.apiUrl}/api/payment/notify`
    });
  }

  initializePayment(paymentData: {
    phoneNumber: string;
    amount: number;
    orderId: string;
    customerName: string;
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      CinetPay.getCheckout({
        transaction_id: paymentData.orderId,
        amount: paymentData.amount,
        currency: 'XAF',
        channels: 'MOBILE_MONEY',
        description: `Paiement commande ${paymentData.orderId}`,
        customer_name: paymentData.customerName,
        customer_phone_number: paymentData.phoneNumber,
        customer_email: '', // Optionnel
        customer_address: '', // Optionnel
        customer_city: 'yaounde', // Optionnel
        customer_country: 'CM', // Cameroun
        customer_state: 'CM',
        customer_zip_code: ''
      });

      // Écouter la réponse du paiement
      CinetPay.waitResponse((result: any) => {
        resolve(result);
      });

      // Gérer les erreurs
      CinetPay.onError((error: any) => {
        reject(error);
      });
    });
  }
}
