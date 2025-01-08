// checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {OrderService} from '../../services/Order/order.service';
import {CinetPayService} from '../../services/Order/cinetpay.service';

interface PaymentDetails {
  phoneNumber: string;
  amount: number;
  orderId: string;
  paymentMethod: string;
}

interface OrderSummary {
  id: string;
  items: Array<{
    name: string;
    price: number;
    styliste: string;
  }>;
  subtotal: number;
  serviceFee: number;
  total: number;
  status: string;
}

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  standalone: true,
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  paymentForm: FormGroup;
  loading = false;
  currentStep = 1;
  paymentMethods = [
    { id: 'orange', name: 'Orange Money', icon: 'orange.png' },
    { id: 'mtn', name: 'MTN Mobile Money', icon: 'mtn.webp' },
    { id: 'moov', name: 'Moov Money', icon: 'moov.png' }
  ];

  orderSummary: OrderSummary = {
    id: 'ORD-' + Math.random().toString(36).substr(2, 9),
    items: [
      {
        name: 'Robe de Soirée Élégante',
        price: 45000,
        styliste: 'Marie Couture'
      }
    ],
    subtotal: 45000,
    serviceFee: 1000,
    total: 46000,
    status: 'pending'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cinetPayService: CinetPayService,
    private orderService: OrderService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // Simulate fetching order details
    this.simulateOrderFetch();
  }

  private initializeForm() {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{9}$/),
        Validators.minLength(9),
        Validators.maxLength(9)
      ]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  private async simulateOrderFetch() {
    this.loading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.loading = false;
  }

  async processPayment() {
    if (this.paymentForm.valid) {
      this.loading = true;

      try {
        const paymentDetails = {
          phoneNumber: this.paymentForm.get('phoneNumber')?.value,
          amount: this.orderSummary.total,
          orderId: this.orderSummary.id,
          customerName: 'Client', // À remplacer par le nom réel du client
        };

        // Initialiser le widget de paiement
        const result = await this.cinetPayService.initializePayment(paymentDetails);

        if (result.status === "ACCEPTED") {
          // Mettre à jour le statut de la commande
          await this.orderService.updateOrderPaymentStatus(this.orderSummary.id, {
            status: 'PAID',
            reference: result.transaction_id
          }).toPromise();

          // Afficher le message de succès
          this.currentStep = 2;

          // Redirection après 3 secondes
          setTimeout(() => {
            this.router.navigate(['/orders']);
          }, 3000);
        } else if (result.status === "REFUSED") {
          // Gérer l'échec du paiement
          console.error('Paiement refusé:', result);
          // Afficher un message d'erreur à l'utilisateur
        }
      } catch (error) {
        console.error('Erreur lors du paiement:', error);
        // Gérer l'erreur et afficher un message à l'utilisateur
      } finally {
        this.loading = false;
      }
    }
  }



  formatPhoneNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 9) {
      value = value.substr(0, 9);
    }
    this.paymentForm.get('phoneNumber')?.setValue(value, { emitEvent: false });
  }

  getPaymentMethodIcon(methodId: string): string {
    const method = this.paymentMethods.find(m => m.id === methodId);
    return method ? method.icon : '';
  }



}

