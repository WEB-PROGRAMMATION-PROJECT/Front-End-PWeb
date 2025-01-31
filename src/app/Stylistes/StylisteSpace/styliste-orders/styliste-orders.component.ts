// styliste-orders.component.ts
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Commande } from '../../../Data/Commande';
import { OrderService } from '../../../services/Order/order.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-styliste-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './styliste-orders.component.html',
  styleUrls: ['./styliste-orders.component.scss'],
})
export class StylisteOrdersComponent implements OnInit {
  selectedOrder: Commande | null = null;
  priceInput: number | null = null;
  deliveryDateInput: string = '';

  private destroy = inject(DestroyRef);
  orders: Commande[] = [];
  filteredOrders: Commande[] = [];
  currentFilter: string = 'all';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);
      const userId = userData.id;

      this.orderService
        .getStylistOrders(userId)
        .pipe(takeUntilDestroyed(this.destroy))
        .subscribe((data) => {
          this.orders = data;
          this.filteredOrders = this.orders;
          console.log('Commandes récupérées avec succès:', this.orders);
        });
    } else {
      console.error('Veuillez vous connecter pour accéder à vos commandes.');
    }
  }

  getStatusLabel(status: Commande['status']): string {
    const statusMap = {
      pending: 'En attente de validation et paiement',
      in_progress: 'En cours de confection',
      completed: 'Terminée',
      cancelled: 'Annulée',
    };
    return statusMap[status];
  }

  getStatusClass(status: Commande['status']): string {
    const statusClassMap = {
      pending: 'En attente de validation et paiement',
      in_progress: 'En cours de confection',
      completed: 'Terminée',
      cancelled: 'Annulée',
    };
    return statusClassMap[status];
  }

  openOrderDetails(order: Commande) {
    this.selectedOrder = order;
    this.priceInput = order.totalPrice || null;
    this.deliveryDateInput = order.expectedDeliveryDate || '';
  }

  validateOrder(order: Commande) {
    if (!this.priceInput || !this.deliveryDateInput) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }

    order.totalPrice = this.priceInput;
    order.expectedDeliveryDate = this.deliveryDateInput;
    order.status = 'pending';
    this.selectedOrder = null;
  }

  closeOrderDetails() {
    this.selectedOrder = null;
  }

  markAsCompleted(order: Commande) {
    order.status = 'completed';
  }

  contactClient(order: Commande) {
    // Implémentation de la fonction de contact (WhatsApp, etc.)
    console.log('Contacter le client:', order.client.first_name);
  }
}
