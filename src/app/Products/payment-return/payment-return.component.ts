// payment-return.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {OrderService} from '../../services/Order/order.service';
import {DecimalPipe, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-payment-return',
  standalone: true,
  templateUrl: './payment-return.component.html',
  imports: [
    NgClass,
    DecimalPipe,
    NgIf
  ],
  styleUrl: 'payment-return.component.css'
})
export class PaymentReturnComponent implements OnInit {
  paymentStatus: 'ACCEPTED' | 'REFUSED' = 'ACCEPTED';
  orderId: string = '';
  amount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    // Récupérer les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.paymentStatus = params['status'];
      this.orderId = params['cpm_trans_id'];
      this.amount = params['cpm_amount'];

      if (this.paymentStatus === 'ACCEPTED') {
        this.updateOrderStatus();
      }
    });
  }

  updateOrderStatus() {
    this.orderService.updateOrderPaymentStatus(this.orderId, {
      status: 'PAID',
      reference: this.orderId
    }).subscribe({
      error: (error) => console.error('Erreur lors de la mise à jour du statut:', error)
    });
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  retryPayment() {
    this.router.navigate(['/checkout']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
